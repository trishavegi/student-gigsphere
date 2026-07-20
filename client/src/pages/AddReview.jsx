import { useState } from "react";
import api from "../services/api";

function AddReview() {

  const [rating, setRating] = useState("");
  const [comment, setComment] = useState("");

  const providerId = "PASTE_PROVIDER_ID";

  const handleSubmit = async () => {

    const token = localStorage.getItem("token");

    await api.post(
      "/reviews",
      {
        providerId,
        rating,
        comment
      },
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    );

    alert("Review Added");

  };

  return (

    <div>

      <h1>Add Review</h1>

      <input
        type="number"
        placeholder="Rating 1-5"
        value={rating}
        onChange={(e)=>setRating(e.target.value)}
      />

      <br /><br />

      <textarea
        placeholder="Comment"
        value={comment}
        onChange={(e)=>setComment(e.target.value)}
      />

      <br /><br />

      <button onClick={handleSubmit}>
        Submit
      </button>

    </div>
  );
}

export default AddReview;