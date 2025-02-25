import { useState, useRef, useEffect } from "react";
import styled from "styled-components";
import { BsList, BsX } from "react-icons/bs";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";

// Contenedor principal del menú
const MenuContainer = styled.div`
  position: relative;
  display: inline-block;
  cursor: pointer;
  padding: 0px;
`;

// Botón de menú (texto + icono)
const MenuButton = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 14px;
  font-weight: 400;
  color: #191919;

  @media (max-width: 768px) {
    span {
      display: none;
    }
  }
`;

const CloseButton = styled.button`
  background: none;
  border: none;
  font-size: 12px;
  font-weight: 500;
  color: #191919;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  width: 100%;
  gap: 1px;
  cursor: pointer;
  padding: 10px;

  &:hover {
    color: rgb(126, 123, 123);
  }
`;

const DropdownMenu = styled(motion.div)`
  background: white;
  z-index: 1000;
  overflow-y: auto;
  max-height: 80vh;

  @media (max-width: 767px) {
    position: fixed;
    top: 71px;
    left: 0;
    width: 100vw;
    display: flex;
    flex-direction: column;
  }

  @media (min-width: 768px) {
    position: absolute;
    top: 100%;
    right: 0;
    width: 280px;
    height: auto;
    border-radius: 8px;
    box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
  }
`;

// Estilo de cada opción del menú
const MenuItem = styled.div`
  padding: 7px 16px;
  font-size: 14px;
  color: #373737;
  cursor: pointer;
  transition: background 0.3s ease;
  text-align: right;

  &:last-child {
    border-bottom: none;
  }

  &:hover {
    color: rgb(151, 151, 151);
  }
`;

const Section = styled.div`
  padding: 8px;
  border-bottom: 1px solid #d8d8d8;

  &:last-child {
    border-bottom: none;
  }
`;

const LastSection = styled(Section)`
  background: #f5f5f5;
`;

const menuSections = [
  {
    items: [
      "Modelos",
      "Servicios y Accesorios",
      "Financiación",
      "Reviews y Comunidad",
    ],
  },
  {
    items: [
      "Toyota Mobility Service",
      "Toyota Gazoo Racing",
      "Toyota Híbridos",
    ],
  },
  {
    items: ["Concesionarios", "Test Drive", "Contacto"],
  },
  {
    items: [
      "Actividades",
      "Servicios al Cliente",
      "Ventas Especiales",
      "Innovación",
      "Prensa",
      "Acerca de...",
    ],
    isLast: true, // Esta sección tendrá un fondo diferente
  },
];

// Estado y referencia para controlar la visibilidad del menú
const Menu = () => {
  const [isOpen, setIsOpen] = useState(false); // Controla si el menú está abierto o cerrado
  const menuRef = useRef(null);  // Referencia para detectar clics fuera del menú
  const navigate = useNavigate(); // Hook de React Router para navegación

  // Alternar menú al hacer clic
  const toggleMenu = () => setIsOpen((prev) => !prev);

  // Cerrar el menú si el usuario hace clic fuera
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <MenuContainer ref={menuRef}>
     {/* Botón de menú que alterna su estado al hacer clic */}
      <MenuButton onClick={toggleMenu}>
        <span>Menú</span>
        <BsList size={26} />
      </MenuButton>
      <AnimatePresence>
        {isOpen && (
          <DropdownMenu
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
          >
          {/* Botón para cerrar el menú manualmente */}
            <CloseButton onClick={toggleMenu}>
              <span>Cerrar</span>
              <BsX size={22} />
            </CloseButton>
           {/* Renderizado de las secciones del menú dinámicamente */}
            {menuSections.map((section, index) =>
              section.isLast ? (
                <LastSection key={index}>
                  {section.items.map((item, i) => (
                    <MenuItem key={i}>{item}</MenuItem>
                  ))}
                </LastSection>
              ) : (
                <Section key={index}>
                  {section.items.map((item, i) => (
                    <MenuItem
                      key={i}
                      onClick={() => {
                        if (item === "Modelos") {
                          navigate("/"); // Redirección a la página principal
                          setIsOpen(false); // Cierra el menú después de la navegación
                        }
                      }}
                    >
                      {item}
                    </MenuItem>
                  ))}
                </Section>
              )
            )}
          </DropdownMenu>
        )}
      </AnimatePresence>
    </MenuContainer>
  );
};

export default Menu;
