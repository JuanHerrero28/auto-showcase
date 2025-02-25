import { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useAutoContext } from "../context/AutoContext";
import styled from "styled-components";
import { motion } from "framer-motion";
import logo from "../../public/Logo.svg";
import Menu from "./Menu";


const NavbarContainer = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px 20px;
  border-bottom: 1px solid #cccccc;
  position: relative;

  @media (max-width: 768px) {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    background-color: white;
    z-index: 1000;
  }
`;

const LeftSection = styled.div`
  display: flex;
  align-items: center;
  gap: 60px;
`;

const Logo = styled.img`
  height: 40px;
  cursor: pointer;
`;

const NavItem = styled(motion.div)`
  color: ${({ active }) => (active ? "#D0021B" : "#191919")};
  font-weight: 600;
  cursor: ${({ clickable }) => (clickable ? "pointer" : "default")};
  padding: 8px 15px;
  position: relative;
  font-size: 14px;

  @media (max-width: 768px) {
    display: none;
  }
`;

const ActiveBar = styled(motion.div)`
  position: absolute;
  bottom: -19px;
  left: 0;
  width: 100%;
  height: 3px;
  background-color: #d0021b;
`;

const RightSection = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  cursor: pointer;
`;

const Navbar = () => {
  // Obtiene el estado global y la función de dispatch del contexto
  const { state, dispatch } = useAutoContext();
  const navigate = useNavigate(); // Hook para la navegación entre rutas
  const location = useLocation(); // Hook para obtener información de la URL actual

  useEffect(() => {
    // Extrae los parámetros de búsqueda de la URL
    const searchParams = new URLSearchParams(location.search);
    const section = searchParams.get("section");
    // Actualiza el estado global según el valor de "section" en la URL
    dispatch({
      type: "SET_VIEW",
      payload: section === "ficha-tecnica" ? "ficha-tecnica" : "modelos",
    });
  }, [location.search, dispatch]);  // Se ejecuta cada vez que cambia la URL de búsqueda

  return (
    <NavbarContainer>
      <LeftSection>
      {/* Logo de la aplicación con navegación a la página de inicio */}
        <Logo src={logo} alt="Logo" onClick={() => navigate("/")} />
       {/* Elemento de navegación para "Modelos" */}
        <NavItem
          clickable
          active={state.view === "modelos"}
          onClick={() => navigate("/")}
        >
          Modelos
          {state.view === "modelos" && <ActiveBar layoutId="active-bar" />}
        </NavItem>
        {/* Elemento de navegación para "Ficha de modelo" (no es clickeable) */}
        <NavItem active={state.view === "ficha-tecnica"}>
          Ficha de modelo
          {state.view === "ficha-tecnica" && (
            <ActiveBar layoutId="active-bar" />
          )}
        </NavItem>
      </LeftSection>
      {/* Menú desplegable en la sección derecha del navbar */}
      <RightSection>
        <Menu />
      </RightSection>
    </NavbarContainer>
  );
};

export default Navbar;
