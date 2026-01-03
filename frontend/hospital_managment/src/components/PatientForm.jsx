import { useEffect, useState } from "react";
import axios from "axios";


const API = "/patients";

export default function PatientForm() {
  const [patients, setPatients] = useState([]);
  const [form, setForm] = useState({
    name: "",
    mobile: "",
    address: "",
    email: "",
  });
  const [editId, setEditId] = useState(null);
  const [loading, setLoading] = useState(false);

 
  const fetchPatients = async () => {
    try {
      const res = await axios.get(API);
      setPatients(res.data);
    } catch (error) {
      console.error("Fetch error:", error);
    }
  };

  useEffect(() => {
    fetchPatients();
  }, []);

 
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.name || !form.mobile || !form.email || !form.address) {
      alert("All fields are required");
      return;
    }

    try {
      setLoading(true);

      if (editId) {
        await axios.put(`${API}/${editId}`, form);
        setEditId(null);
      } else {
        await axios.post(API, form);
      }

      setForm({ name: "", mobile: "", address: "", email: "" });
      fetchPatients();
    } catch (error) {
      console.error("Submit error:", error);
    } finally {
      setLoading(false);
    }
  };

 
  const handleEdit = (patient) => {
    setForm({
      name: patient.name,
      mobile: patient.mobile,
      address: patient.address,
      email: patient.email,
    });
    setEditId(patient._id);
  };


  const handleDelete = async (id) => {
    if (!confirm("Are you sure?")) return;

    try {
      await axios.delete(`${API}/${id}`);
      fetchPatients();
    } catch (error) {
      console.error("Delete error:", error);
    }
  };

  return (
    <div className="max-w-3xl mx-auto bg-white p-6 rounded shadow">
      <h2 className="text-2xl font-bold mb-4 text-center">
        Hospital Patient Management
      </h2>

     
      <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4">
        <input
          className="border p-2 rounded"
          placeholder="Patient Name"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
        />

        <input
          className="border p-2 rounded"
          placeholder="Mobile Number"
          value={form.mobile}
          onChange={(e) => setForm({ ...form, mobile: e.target.value })}
        />

        <input
          className="border p-2 rounded"
          placeholder="Email"
          type="email"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
        />

        <input
          className="border p-2 rounded"
          placeholder="Address"
          value={form.address}
          onChange={(e) => setForm({ ...form, address: e.target.value })}
        />

        <button
          type="submit"
          disabled={loading}
          className="col-span-2 bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
        >
          {loading
            ? "Processing..."
            : editId
            ? "Update Patient"
            : "Add Patient"}
        </button>
      </form>

      <hr className="my-6" />

    
      {patients.length === 0 ? (
        <p className="text-center text-gray-500">No patients found</p>
      ) : (
        patients.map((p) => (
          <div
            key={p._id}
            className="flex justify-between items-start border p-3 mb-2 rounded"
          >
            <div>
              <p className="font-bold">{p.name}</p>
              <p className="text-sm">{p.mobile} | {p.email}</p>
              <p className="text-sm">{p.address}</p>
            </div>

            <div className="space-x-2">
              <button
                onClick={() => handleEdit(p)}
                className="bg-yellow-500 px-3 py-1 text-white rounded"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(p._id)}
                className="bg-red-600 px-3 py-1 text-white rounded"
              >
                Delete
              </button>
            </div>
          </div>
        ))
      )}
    </div>
  );
}
