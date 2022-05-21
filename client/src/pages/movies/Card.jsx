import React from "react";
import { Link } from "react-router-dom";
import "./card.css";

const Card = ({ val }) => {
  return (
    <div>
      <div className="container">
        <div className="grid">
          <div className="article">
            <img
              src={`https://drive.google.com/uc?export=view&id=${val.img}`}
              // src={val.img}
              alt="Thumbnail"
            />
            <div className="text">
              <h4>Name: {val.title} </h4>
              <h4>Genre: {val.genre}</h4>
              <h4>Type: {val.isSeries ? "Series" : "Movie"}</h4>
              <h4>Year: {val.year}</h4>
              <h4>Limit: {val.limit}+</h4>
              <Link to="/watch" state={{ movie: val }}>
                <button className="btn">Watch Now</button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;
