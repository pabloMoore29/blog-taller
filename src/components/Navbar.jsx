import { Link } from "react-router-dom";
import "./Navbar.css";

function Navbar({ user, handleLogout }) {
  return (
    <nav>
      <Link to="/">Inicio</Link>
      <Link to="/posts">Publicaciones</Link>
      <Link to="/authors">Autores</Link>
      <Link to="/add">Añadir texto</Link>

      {user && (
        <button onClick={handleLogout} className="logout-button">
          Cerrar sesión
        </button>
      )}
    </nav>
  );
}

export default Navbar;