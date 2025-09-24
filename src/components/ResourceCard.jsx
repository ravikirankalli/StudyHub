import { Link } from "react-router-dom";

function ResourceCard({ resource }) {
  return (
    <div className="p-4 shadow-lg rounded bg-white">
      <h2 className="text-xl font-semibold">{resource.title}</h2>
      <p className="text-gray-600">{resource.description}</p>
      <p className="text-sm mt-2">⭐ {resource.averageRating || "No ratings"}</p>
      <Link to={`/resource/${resource._id}`} className="text-blue-600 mt-2 inline-block">
        View Details
      </Link>
    </div>
  );
}

export default ResourceCard;
