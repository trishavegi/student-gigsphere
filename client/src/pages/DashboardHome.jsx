import { useEffect, useState } from "react";
import api from "../services/api";

function DashboardHome() {

const [stats,setStats]=useState({
users:0,
services:0,
bookings:0,
reviews:0
});

useEffect(()=>{

fetchDashboard();

},[]);

const fetchDashboard=async()=>{

try{

const token=localStorage.getItem("token");

const response=await api.get("/admin/dashboard",{

headers:{
Authorization:`Bearer ${token}`
}

});

setStats(response.data);

}
catch(err){

console.log(err);

}

}

return(

<div className="space-y-8">

<div className="bg-white rounded-xl shadow p-6">

<h1 className="text-4xl font-bold">

Admin Dashboard

</h1>

<p className="text-gray-500">

Welcome Back Admin 👋

</p>

</div>

<div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">

<div className="bg-blue-600 text-white rounded-xl p-6">

<h2 className="font-bold text-xl">

Users

</h2>

<p className="text-5xl mt-4">

{stats.users}

</p>

</div>

<div className="bg-green-600 text-white rounded-xl p-6">

<h2 className="font-bold text-xl">

Services

</h2>

<p className="text-5xl mt-4">

{stats.services}

</p>

</div>

<div className="bg-orange-600 text-white rounded-xl p-6">

<h2 className="font-bold text-xl">

Bookings

</h2>

<p className="text-5xl mt-4">

{stats.bookings}

</p>

</div>

<div className="bg-purple-600 text-white rounded-xl p-6">

<h2 className="font-bold text-xl">

Reviews

</h2>

<p className="text-5xl mt-4">

{stats.reviews}

</p>

</div>

</div>

</div>

)

}

export default DashboardHome;