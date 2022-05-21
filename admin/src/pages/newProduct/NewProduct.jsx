import { useContext, useState } from "react";
import "./newProduct.css";
import { createMovie } from "../../context/movieContext/apiCalls";
import { MovieContext } from "../../context/movieContext/MovieContext";

export default function NewMovie() {
  const [movie, setMovie] = useState(null);

  const { dispatch } = useContext(MovieContext);

  const handleChange = (e) => {
    const value = e.target.value;
    setMovie({ ...movie, [e.target.name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    createMovie(movie, dispatch);
    console.log(movie);
    alert("New Movie Created!!");
  };

  return (
    <div className="newProduct">
      <h1 className="addProductTitle">New Movie</h1>
      <form className="addProductForm">
        <div className="addProductItem">
          <label>Image</label>
          <input
            type="text"
            placeholder="Enter Image Link"
            name="img"
            onChange={handleChange}
            required
          />
        </div>

        <div className="addProductItem">
          <label>Title</label>
          <input
            type="text"
            placeholder="John Wick"
            name="title"
            onChange={handleChange}
            required
          />
        </div>
        <div className="addProductItem">
          <label>Description</label>
          <input
            type="text"
            placeholder="Description"
            name="desc"
            onChange={handleChange}
            required
          />
        </div>
        <div className="addProductItem">
          <label>Year</label>
          <input
            type="text"
            placeholder="Year"
            name="year"
            onChange={handleChange}
            required
          />
        </div>
        <div className="addProductItem">
          <label>Genre</label>
          <select name="genre" id="genre" onChange={handleChange} required>
            <option>Genre</option>
            <option value="adventure">Action</option>
            <option value="adventure">Adventure</option>
            <option value="animation">Animation</option>
            <option value="comedy">Comedy</option>
            <option value="crime">Crime</option>
            <option value="drama">Drama</option>
            <option value="documentary">Documentary</option>
            <option value="fantasy">Fantasy</option>
            <option value="historical">Historical</option>
            <option value="horror">Horror</option>
            <option value="romance">Romance</option>
            <option value="sci-fi">Sci-fi</option>
            <option value="thriller">Thriller</option>
            <option value="western">Western</option>
          </select>
        </div>
        <div className="addProductItem">
          <label>Duration</label>
          <input
            type="text"
            placeholder="Duration"
            name="duration"
            onChange={handleChange}
            required
          />
        </div>
        <div className="addProductItem">
          <label>Limit</label>
          <input
            type="text"
            placeholder="limit"
            name="limit"
            onChange={handleChange}
            required
          />
        </div>
        <div className="addProductItem">
          <label>Is Series?</label>
          <select
            name="isSeries"
            id="isSeries"
            onChange={handleChange}
            required
          >
            <option value="">Select</option>
            <option value="false">No</option>
            <option value="true">Yes</option>
          </select>
        </div>
        <div className="addProductItem">
          <label>Trailer</label>
          <input
            type="text"
            placeholder="Enter Trailer Link"
            name="trailer"
            onChange={handleChange}
            required
          />
        </div>
        <div className="addProductItem">
          <label>Video</label>
          <input
            type="text"
            placeholder="Enter Video Link"
            name="video"
            onChange={handleChange}
            required
          />
        </div>
        <button className="addProductButton" onClick={handleSubmit}>
          Create
        </button>
      </form>
    </div>
  );
}
