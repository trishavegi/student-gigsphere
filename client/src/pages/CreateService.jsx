import { useState } from "react";
import api from "../services/api";

function CreateService() {

const [title, setTitle] = useState("");
const [description, setDescription] = useState("");
const [price, setPrice] = useState("");
const [category, setCategory] = useState("");
const [location, setLocation] = useState("");
const [skills, setSkills] = useState("");
const [duration, setDuration] = useState("");

const handleSubmit = async () => {

try {

  await api.post(
    "/services",
    {
      title,
      description,
      price,
      category,
      location,
      skills,
      duration
    },
    {
      headers: {
        Authorization:
          `Bearer ${localStorage.getItem("token")}`
      }
    }
  );

  alert("Service Posted Successfully");

  setTitle("");
  setDescription("");
  setPrice("");
  setCategory("");
  setLocation("");
  setSkills("");
  setDuration("");

} catch (error) {

  console.log(error);

}

};

return (

<div className="min-h-screen bg-slate-50 flex justify-center px-4 py-6 sm:py-10">
<div className="bg-white border border-slate-200 shadow-xl rounded-2xl p-5 sm:p-8 w-full max-w-2xl">
    <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 text-center mb-2">
  Create Service
</h1>

<p className="text-center text-slate-500 text-sm sm:text-base mb-6">
  Post a service and connect with students who need your skills.
</p>

    <input
     className="w-full border border-slate-300 p-3.5 rounded-xl mb-4 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition"
      placeholder="Service Title"
      value={title}
      onChange={(e)=>setTitle(e.target.value)}
    />

    <textarea
     className="w-full border border-slate-300 p-3.5 rounded-xl mb-4 min-h-32 resize-none focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition"
      placeholder="Description"
      value={description}
      onChange={(e)=>setDescription(e.target.value)}
    />

    <input
      className="w-full border border-slate-300 p-3.5 rounded-xl mb-4 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition"
      placeholder="Price"
      value={price}
      onChange={(e)=>setPrice(e.target.value)}
    />

    <input
      className="w-full border border-slate-300 p-3.5 rounded-xl mb-4 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition"
      placeholder="Category"
      value={category}
      onChange={(e)=>setCategory(e.target.value)}
    />

    <input
      className="w-full border border-slate-300 p-3.5 rounded-xl mb-4 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition"
      value={location}
      onChange={(e)=>setLocation(e.target.value)}
    />

    <input
      className="w-full border border-slate-300 p-3.5 rounded-xl mb-4 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition"
      value={skills}
      onChange={(e)=>setSkills(e.target.value)}
    />

    <input
      className="w-full border border-slate-300 p-3.5 rounded-xl mb-4 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition"
      placeholder="Duration"
      value={duration}
      onChange={(e)=>setDuration(e.target.value)}
    />

    <button
      onClick={handleSubmit}
      className="w-full bg-teal-600 text-white py-3.5 rounded-xl font-semibold hover:bg-teal-700 transition shadow-sm">
      Post Service
    </button>

  </div>

</div>


);

}

export default CreateService;
