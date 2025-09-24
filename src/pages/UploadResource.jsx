import { useState } from "react";
import API from "../services/api";
import { useNavigate } from "react-router-dom";

function UploadResource() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [subject, setSubject] = useState("");
  const [semester, setSemester] = useState("");
  const [tags, setTags] = useState("");
  const [file, setFile] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) return alert("Please upload a file");

    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("subject", subject);
    formData.append("semester", semester);
    formData.append("tags", tags);
    formData.append("file", file);

    try {
      await API.post("/resources/upload", formData, {
        headers: { "Content-Type": "multipart/form-data" }
      });
      alert("Resource uploaded successfully!");
      navigate("/dashboard");
    } catch (err) {
      console.error(err);
      alert("Error uploading resource");
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white shadow rounded">
      <h1 className="text-2xl font-bold mb-4">Upload Resource</h1>
      <form className="flex flex-col gap-3" onSubmit={handleSubmit}>
        <input type="text" placeholder="Title" value={title} onChange={e => setTitle(e.target.value)} className="border p-2" />
        <input type="text" placeholder="Description" value={description} onChange={e => setDescription(e.target.value)} className="border p-2" />
        <input type="text" placeholder="Subject" value={subject} onChange={e => setSubject(e.target.value)} className="border p-2" />
        <input type="text" placeholder="Semester" value={semester} onChange={e => setSemester(e.target.value)} className="border p-2" />
        <input type="text" placeholder="Tags (comma-separated)" value={tags} onChange={e => setTags(e.target.value)} className="border p-2" />
        <input type="file" onChange={e => setFile(e.target.files[0])} />
        <button type="submit" className="bg-green-600 text-white p-2 rounded">Upload</button>
      </form>
    </div>
  );
}

export default UploadResource;
