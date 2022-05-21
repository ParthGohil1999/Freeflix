import "./navbar.scss";
import logo from "../../Assets/freeflix.png";
import { Search, ArrowDropDown } from "@material-ui/icons";
import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../authContext/AuthContext";
import { logout } from "../../authContext/AuthActions";
import axios from "axios";

const Navbar = () => {
  const [content, setContent] = useState({});
  const [searchTerm, setSearchTerm] = useState("");
  const [isScrolled, setIsScrolled] = useState(false);
  const { dispatch } = useContext(AuthContext);
  const [toggle, setToggle] = useState(false);
  window.onscroll = () => {
    setIsScrolled(window.pageYOffset === 0 ? false : true);
    return () => (window.onscroll = null);
  };
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

  console.log("Content from search", content);

  const toggleSearch = () => {
    console.log("serach clicked");
    setToggle(!toggle);
    console.log(toggle);
    setIsScrolled(!isScrolled);
  };

  return (
    <div className={isScrolled ? "navbar scrolled" : "navbar"}>
      <div className="container">
        <div className="left">
          <Link to="/">
            <img
              src={logo}
              className={toggle ? "toggle" : ""}
              width="105px"
              alt=""
            />
          </Link>
          {window.innerWidth < 525 ? (
            <div
              className={
                toggle && window.innerWidth < 1400 ? "toggle" : "profile"
              }
            >
              <div className="more">
                More <ArrowDropDown />
              </div>
              <div className="options">
                <Link to="/series" className="link">
                  <span style={{ padding: "10px" }} className="navbarmainLinks">
                    Series
                  </span>
                </Link>
                <Link to="/movies" className="link">
                  <span style={{ padding: "10px" }} className="navbarmainLinks">
                    Movies
                  </span>
                </Link>
                <Link to="/newRelease" className="link">
                  <span style={{ padding: "10px" }} className="navbarmainLinks">
                    New Release
                  </span>
                </Link>
              </div>
            </div>
          ) : (
            <>
              <Link
                to="/"
                className={
                  toggle && window.innerWidth < 1400 ? "toggle" : "link"
                }
              >
                <span>Homepage</span>
              </Link>
              <Link
                to="/series"
                className={
                  toggle && window.innerWidth < 1400 ? "toggle" : "link"
                }
              >
                <span className="navbarmainLinks">Series</span>
              </Link>
              <Link
                to="/movies"
                className={
                  toggle && window.innerWidth < 1400 ? "toggle" : "link"
                }
              >
                <span className="navbarmainLinks">Movies</span>
              </Link>
              <Link
                to="/newRelease"
                className={
                  toggle && window.innerWidth < 1400 ? "toggle" : "link"
                }
              >
                <span className="navbarmainLinks">New Release</span>
              </Link>
            </>
          )}
        </div>
        <div className="right">
          <div
            className={
              toggle && window.innerWidth < 870 ? "searchCenter" : "search"
            }
          >
            {toggle ? (
              <div className="profile">
                <input
                  className="input"
                  type="text"
                  placeholder="Serach for Movies and Series"
                  onChange={(event) => {
                    setSearchTerm(event.target.value);
                  }}
                />
                <div
                  className="options"
                  style={{
                    height: "50vh",
                    overflow: "hidden",
                    overflowY: "scroll",
                  }}
                >
                  {content
                    .filter((val) => {
                      if (searchTerm === "") {
                        return "";
                      } else if (
                        val.title
                          .toLowerCase()
                          .includes(searchTerm.toLowerCase())
                      ) {
                        return val;
                      }
                    })
                    .map((val, key) => {
                      return (
                        <Link
                          // className="input"
                          style={{
                            margin: "5px",
                            height: "100%",
                            width: "70vw",
                            maxWidth: "600px",
                          }}
                          to="/watch"
                          state={{ movie: val }}
                        >
                          <div style={{ display: "flex" }} key={key}>
                            <img
                              style={{
                                margin: "10px",
                                width: "40%",
                                height: "30%",
                              }}
                              src={`https://drive.google.com/uc?export=view&id=${val.img}`}
                              alt=""
                            />
                            <div
                              style={{
                                display: "flex",
                                float: "left",
                                justifyContent: "center",
                                flexDirection: "column",
                              }}
                            >
                              <span
                                style={{
                                  fontSize: "90%",
                                  fontWeight: "300",
                                }}
                              >
                                <strong>Movie Name :</strong> {val.title}
                              </span>
                              <span
                                style={{
                                  fontSize: "90%",
                                  fontWeight: "300",
                                }}
                              >
                                <strong>Release Date :</strong> {val.year}
                              </span>
                              <span
                                style={{
                                  fontSize: "90%",
                                  fontWeight: "300",
                                }}
                              >
                                <strong>Genre :</strong> {val.genre}
                              </span>
                            </div>
                          </div>
                        </Link>
                      );
                    })}
                </div>
              </div>
            ) : null}
            <Search className="icon" onClick={toggleSearch} />
          </div>
          <div
            className={
              toggle && window.innerWidth < 1400 ? "toggle" : "profile"
            }
          >
            <img
              src="https://ih0.redbubble.net/image.618363037.0853/flat,1000x1000,075,f.u2.jpg"
              alt=""
              className="icon"
            />
            <div className="options">
              <span
                style={{ padding: "10px" }}
                onClick={() => dispatch(logout())}
              >
                Logout
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
