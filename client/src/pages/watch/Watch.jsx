import { ArrowBackOutlined } from "@material-ui/icons";
import "./watch.scss";
import Navbar from "../../components/navbar/Navbar";
import { Link, useLocation } from "react-router-dom";

const Watch = () => {
  const location = useLocation();
  const movie = location.state.movie;
  // console.log(movie)

  return (
    <div className="containerWatch">
      <Navbar />
      <div className="watch">
        <Link to="/">
          <div className="back">
            <ArrowBackOutlined />
            Home
          </div>
        </Link>
        <iframe src={movie.video} frameborder="0" allowFullScreen="true" webkitallowfullscreen="true" mozallowfullscreen="true" title="dcndjnc" className="iframe"></iframe>
      </div>
    </div>
  );
};

export default Watch;
