import { Link } from "react-router-dom";
import "./Navbar.scss";

export const Navbar = () => {
  return (
    <nav>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/current-weather">Current weather</Link>
        </li>
        <li>
          <Link to="/search-city">Find city</Link>
        </li>
      </ul>
    </nav>
  );
};
