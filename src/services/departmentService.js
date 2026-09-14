const API_BASE_URL = "http://localhost:5000/api/departments";

async function handleResponse(res) {
  const json = await res.json().catch(() => null);

  if (!res.ok || !json || json.success === false) {
    const message = json?.message || `Request failed with status ${res.status}`;
    const error = new Error(message);
    error.statusCode = res.status;
    throw error;
  }

  return json;
}

export async function fetchAllDepartments() {
  const res = await fetch(`${API_BASE_URL}/all`);
  const json = await handleResponse(res);
  return json.data;
}

export async function fetchDepartmentBySlug(slug) {
  const res = await fetch(`${API_BASE_URL}/${encodeURIComponent(slug)}`);
  const json = await handleResponse(res);
  return json.data;
}

export async function createDepartment(payload) {
  const res = await fetch(`${API_BASE_URL}/create`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload)
  });
  const json = await handleResponse(res);
  return json.data;
}

export async function updateDepartment(id, payload) {
  const res = await fetch(`${API_BASE_URL}/update/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload)
  });
  const json = await handleResponse(res);
  return json.data;
}

export async function deleteDepartment(id) {
  const res = await fetch(`${API_BASE_URL}/delete/${id}`, {
    method: "DELETE"
  });
  return handleResponse(res);
}
