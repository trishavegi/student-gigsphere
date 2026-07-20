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

<div className="min-h-screen bg-gray-100 flex justify-center items-center">

  <div className="bg-white shadow-lg rounded-xl p-8 w-full max-w-2xl">

    <h1 className="text-3xl font-bold text-center mb-6">
      Create Service
    </h1>

    <input
      className="w-full border p-3 rounded mb-4"
      placeholder="Service Title"
      value={title}
      onChange={(e)=>setTitle(e.target.value)}
    />

    <textarea
      className="w-full border p-3 rounded mb-4"
      placeholder="Description"
      value={description}
      onChange={(e)=>setDescription(e.target.value)}
    />

    <input
      className="w-full border p-3 rounded mb-4"
      placeholder="Price"
      value={price}
      onChange={(e)=>setPrice(e.target.value)}
    />

    <input
      className="w-full border p-3 rounded mb-4"
      placeholder="Category"
      value={category}
      onChange={(e)=>setCategory(e.target.value)}
    />

    <input
      className="w-full border p-3 rounded mb-4"
      placeholder="Location"
      value={location}
      onChange={(e)=>setLocation(e.target.value)}
    />

    <input
      className="w-full border p-3 rounded mb-4"
      placeholder="Skills Required"
      value={skills}
      onChange={(e)=>setSkills(e.target.value)}
    />

    <input
      className="w-full border p-3 rounded mb-4"
      placeholder="Duration"
      value={duration}
      onChange={(e)=>setDuration(e.target.value)}
    />

    <button
      onClick={handleSubmit}
      className="w-full bg-green-600 text-white py-3 rounded-lg hover:bg-green-700"
    >
      Post Service
    </button>

  </div>

</div>


);

}

export default CreateService;
