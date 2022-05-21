import List from "../../components/list/List";
import Featured from "../../components/featured/Featured";
import Navbar from "../../components/navbar/Navbar";
import "./home.scss";
import { useEffect, useState } from "react";
import axios from "axios";

const Home = ({ type }) => {
  const [lists, setLists] = useState([]);
  const [genre, setGenre] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
const axiosInstance = axios.create({ baseURL: process.env.REACT_APP_API_URL });

  useEffect(() => {
    const getRandomLists = async () => {
      try {
        const res = await axiosInstance.get(
          `lists/homeList${type ? "?type=" + type : ""}${
            genre ? "&genre=" + genre : ""
          }`,
          {
            headers: {
              token:
                "Bearer " + JSON.parse(localStorage.getItem("user")).accessToken,
            },
          }
        );
        setLists(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getRandomLists();
  }, [type, genre, axiosInstance]);

  return (
    <div className="home">
      <Navbar />
      <Featured type={type} setGenre={setGenre}/>
      <div className="searchContainer">
      <input
                  className="input"
                  type="text"
                  placeholder="Serach list(s) of  Movies, Series or Genre"
                  onChange={(event) => {
                    setSearchTerm(event.target.value);
                  }}
                />
      </div>
      {lists.filter((val) => {
                      if (searchTerm === "") {
                        return val;
                      } else if (
                        val.title
                          .toLowerCase()
                          .includes(searchTerm.toLowerCase())
                      ) {
                        return val;
                      }
                    }).slice(0, 20)
                    .map((val) => {
                      return (
                        <List list={val} />
                      )})
                      };
       {/* {lists.map((list) => (
         <List list={list} />
       ))} */}
    </div>
)};

export default Home;
