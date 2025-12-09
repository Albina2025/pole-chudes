import { Link } from "react-router-dom";
import { useAppSelector } from "../../hooks/useAppSelector";
import "./Header.css";

export const Header = () => {
  const isAdmin = useAppSelector((state) => state.auth.isAdmin);

  return (
    <header className="header">
      <div className="logo">Поле Чудес</div>

      <nav className="nav">
        <Link to="/game" className="nav-link">Game</Link>
        {!isAdmin && <Link to="/login" className="nav-link">Login</Link>}
        {isAdmin && <Link to="/admin" className="nav-link">Admin</Link>}
      </nav>
    </header>
  );
};
