import { useEffect, useState } from "react";
import { getContract } from "./hooks/useContract";
import CreateOffer from "./components/CreateOffer";
import OfferList from "./components/OfferList";
import Navbar from "./components/Navbar";
import Auth from "./components/Auth";
import { supabase } from "./components/supabaseClient";
import "./App.css";

function App() {
  const [session, setSession] = useState(null);

  useEffect(() => {
    document.title = "⚡ P2P Energy - Grupo 6";

    // Obter sessão atual
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    // Escutar mudanças na sessão (login, logout, expiração)
    const { data: listener } = supabase.auth.onAuthStateChange((event, session) => {
      console.log("Evento de autenticação:", event);
      setSession(session);
    });

    return () => {
      listener.subscription.unsubscribe();
    };
  }, []);

  useEffect(() => {
    const connect = async () => {
      try {
        if (window.ethereum) {
          await window.ethereum.request({ method: "eth_requestAccounts" });
          const contract = await getContract();
          const count = await contract.getOffersCount();
          console.log("Número de ofertas:", count.toString());
        } else {
          console.error("MetaMask não detectada!");
        }
      } catch (error) {
        console.error("Erro ao conectar:", error);
      }
    };

    if (session) connect();
  }, [session]);

  // Se a sessão for nula, mostra a página de login
  if (!session) {
    return <Auth onAuth={() => {
      supabase.auth.getSession().then(({ data: { session } }) => {
        setSession(session);
      });
    }} />;
  }

  return (
    <div className="app-container">
      <Navbar />
      <h1 className="app-title">⚡ P2P Energy DApp</h1>
      <CreateOffer />
      <OfferList />
    </div>
  );
}

export default App;
