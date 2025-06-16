import { supabase } from "../components/supabaseClient";
import "./Navbar.css"; // caso uses estilos personalizados

function Navbar() {
  const handleLogout = async () => {
    await supabase.auth.signOut();
  };

  return (
    <nav className="navbar">
      <h1 className="navbar-title">Histórico de Transações</h1>
      <ul className="navbar-menu">
      <li>
        <a
          href={import.meta.env.VITE_ADD_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="navbar-link"
        >
           Ver Transaçõess
        </a>
      </li>
      <li>
        <button className="logout-button" onClick={handleLogout}>
          🚪 Sair
        </button>
      </li>
    </ul>

    </nav>
  );
}

export default Navbar;

