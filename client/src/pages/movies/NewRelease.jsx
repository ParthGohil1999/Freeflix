import React from "react";
import "./newRelease.css";
import { useEffect, useState } from "react";
import axios from "axios";
import Card from "./Card";

const NewRelease = () => {
  const [content, setContent] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  axios = axios.create({ baseURL: process.env.REACT_APP_API_URL });

  useEffect(() => {
    const getContent = async () => {
      try {
        const res = await axios.get("movies/searchedContent", {
          headers: {
            token:
              "Bearer " + JSON.parse(localStorage.getItem("user")).accessToken,
          },
        });
        setContent(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getContent();
  }, []);

  return (
    <div className="newReleaseContainer">
      <div className="searchContainer">
        <input
          className="input"
          type="text"
          placeholder="Serach for Movies and Series"
          onChange={(event) => {
            setSearchTerm(event.target.value);
          }}
        />
      </div>
      <div className="card">
        {content
          .filter((val) => {
            if (searchTerm === "") {
              return val;
            } else if (
              val.title.toLowerCase().includes(searchTerm.toLowerCase())
            ) {
              return val;
            }
          })
          .slice(0, 20)
          .map((val) => {
              return <Card val={val}/>
          })}
      </div>
      
    </div>
  );
};

export default NewRelease;
