import { Link } from "react-router-dom";
import "./Header.css";

export const Header = () => {
  return (
     <header className="header">
      <div className="logo">Поле Чудес</div>

      <nav className="nav">
        <Link to="/game" className="nav-link">Game</Link>
        <Link to="/login" className="nav-link">Login</Link>
        <Link to="/admin" className="nav-link">Admin</Link>
      </nav>
    </header>
  );
}

