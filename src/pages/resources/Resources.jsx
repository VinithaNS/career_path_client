import { useEffect, useMemo, useState } from "react";

import { Search, FolderOpen } from "lucide-react";

import { getActiveResourceCategories } from "../../services/ResourcecategoryService";
import { getActiveResources } from "../../services/resourceService";
import ResourceCard from "../../pages/resources/ResourceCard";

import "./resources.css";

const Resources = () => {
  const [resources, setResources] = useState([]);
  const [categories, setCategories] = useState([]);
  const [activeCategory, setActiveCategory] = useState("all");
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        setError(null);

        const [resourcesRes, categoriesRes] = await Promise.all([
          getActiveResources(),
          getActiveResourceCategories()
        ]);

        setResources(resourcesRes.data);
        setCategories(categoriesRes.data);
      } catch (err) {
        setError(
          err?.response?.data?.message ||
            "Failed to load resources. Please try again."
        );
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  const filteredResources = useMemo(() => {
    return resources.filter((resource) => {
      const matchesCategory =
        activeCategory === "all" || resource.category?._id === activeCategory;

      const matchesSearch =
        search.trim() === "" ||
        resource.title.toLowerCase().includes(search.toLowerCase()) ||
        resource.description.toLowerCase().includes(search.toLowerCase());

      return matchesCategory && matchesSearch;
    });
  }, [resources, activeCategory, search]);

  return (
    <div className="page-wrap">
      <div className="page-head">
        <h1>Learning Resources</h1>
        <p>
          Curated articles, videos, guides and tools to help you plan your next
          step.
        </p>
      </div>

      <div className="search-row">
        <Search size={16} />
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search resources..."
        />
      </div>

      <div className="filter-pills">
        <button
          onClick={() => setActiveCategory("all")}
          className={`pill ${activeCategory === "all" ? "active" : ""}`}
        >
          All Resources
        </button>
        {categories.map((cat) => (
          <button
            key={cat._id}
            onClick={() => setActiveCategory(cat._id)}
            className={`pill ${activeCategory === cat._id ? "active" : ""}`}
          >
            {cat.categoryName}
          </button>
        ))}
      </div>

      {loading && (
        <div className="resource-grid">
          {Array.from({ length: 8 }).map((_, i) => (
            <div key={i} className="resource-skeleton" />
          ))}
        </div>
      )}

      {!loading && error && (
        <div className="state-box error">
          <p>{error}</p>
        </div>
      )}

      {!loading && !error && filteredResources.length === 0 && (
        <div className="state-box empty">
          <FolderOpen size={40} />
          <p className="title">No resources found</p>
          <p className="hint">Try a different category or search term.</p>
        </div>
      )}

      {!loading && !error && filteredResources.length > 0 && (
        <div className="resource-grid">
          {filteredResources.map((resource) => (
            <ResourceCard key={resource._id} resource={resource} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Resources;
