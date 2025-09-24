import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import API from "../services/api";

function ResourceDetails() {
  const { id } = useParams();
  const [resource, setResource] = useState(null);
  const [score, setScore] = useState(5);
  const [feedback, setFeedback] = useState("");

  const fetchResource = async () => {
    const res = await API.get("/resources");
    const found = res.data.find(r => r._id === id);
    setResource(found);
  };

  useEffect(() => { fetchResource(); }, [id]);

  const handleDownload = () => {
    window.open(`http://localhost:5000/${resource.filePath}`, "_blank");
  };

  const handleRate = async () => {
    try {
      await API.post(`/resources/rate/${id}`, { score, feedback });
      alert("Rating submitted!");
      fetchResource();
    } catch (err) {
      console.error(err);
      alert("Error submitting rating");
    }
  };

  if (!resource) return <p>Loading...</p>;

  return (
    <div className="max-w-lg mx-auto p-6 bg-white shadow rounded">
      <h1 className="text-2xl font-bold mb-2">{resource.title}</h1>
      <p className="text-gray-600 mb-2">{resource.description}</p>
      <p className="mb-2">Subject: {resource.subject} | Semester: {resource.semester}</p>
      <p className="mb-2">Tags: {resource.tags.join(", ")}</p>
      <p className="mb-2">Average Rating: {resource.averageRating || "No ratings"}</p>
      <button onClick={handleDownload} className="bg-blue-600 text-white p-2 rounded mb-4">Download</button>

      <div>
        <h2 className="text-xl font-bold mb-2">Rate this resource</h2>
        <select value={score} onChange={e => setScore(Number(e.target.value))} className="border p-1 mb-2">
          {[1,2,3,4,5].map(n => <option key={n} value={n}>{n}</option>)}
        </select>
        <textarea value={feedback} onChange={e => setFeedback(e.target.value)} placeholder="Feedback" className="border p-2 w-full mb-2" />
        <button onClick={handleRate} className="bg-green-600 text-white p-2 rounded">Submit Rating</button>
      </div>
    </div>
  );
}

export default ResourceDetails;
