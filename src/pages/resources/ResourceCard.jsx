import {
  FileText,
  PlayCircle,
  Newspaper,
  Globe,
  File,
  BookOpen,
  Link2,
  ExternalLink
} from "lucide-react";

const TYPE_CONFIG = {
  PDF: { icon: FileText, className: "pdf", label: "PDF" },
  VIDEO: { icon: PlayCircle, className: "video", label: "Video" },
  ARTICLE: { icon: Newspaper, className: "article", label: "Article" },
  WEBSITE: { icon: Globe, className: "website", label: "Website" },
  DOCUMENT: { icon: File, className: "document", label: "Document" },
  BOOK: { icon: BookOpen, className: "book", label: "Book" },
  OTHER: { icon: Link2, className: "other", label: "Resource" }
};

const ResourceCard = ({ resource }) => {
  const {
    title,
    description,
    resourceType,
    resourceUrl,
    author,
    category,
    isFeatured
  } = resource;

  const config = TYPE_CONFIG[resourceType] || TYPE_CONFIG.OTHER;
  const Icon = config.icon;

  return (
    <div className="resource-card">
      {isFeatured && <span className="featured-badge">Featured</span>}

      <div className={`resource-icon ${config.className}`}>
        <Icon size={20} strokeWidth={2} />
      </div>

      <h3>{title}</h3>
      <p className="description">{description}</p>

      <div className="tag-row">
        <span className={`tag ${config.className}`}>{config.label}</span>
        {category?.categoryName && (
          <span className="tag category">{category.categoryName}</span>
        )}
      </div>

      <div className="card-footer">
        <span className="byline">{author ? `By ${author}` : ""}</span>
        <a href={resourceUrl} target="_blank" rel="noopener noreferrer">
          View <ExternalLink size={13} />
        </a>
      </div>
    </div>
  );
};

export default ResourceCard;
