import { useState, useEffect } from "react";
import API from "../services/api";
import ResourceCard from "../components/ResourceCard";

function Dashboard() {
  const [resources, setResources] = useState([]);
  const [search, setSearch] = useState("");

  const fetchResources = async () => {
    const res = await API.get("/resources", { params: { q: search } });
    setResources(res.data);
  };

  useEffect(() => { fetchResources(); }, []);

  const handleSearch = async (e) => {
    e.preventDefault();
    fetchResources();
  };

  return (
    <div>
      <h1 className="text-3xl font-bold mb-4">Dashboard</h1>
      <form onSubmit={handleSearch} className="mb-4 flex gap-2">
        <input type="text" value={search} onChange={e => setSearch(e.target.value)} placeholder="Search resources..." className="border p-2 flex-1" />
        <button className="bg-blue-600 text-white p-2 rounded">Search</button>
      </form>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {resources.map(r => <ResourceCard key={r._id} resource={r} />)}
      </div>
    </div>
  );
}

export default Dashboard;
