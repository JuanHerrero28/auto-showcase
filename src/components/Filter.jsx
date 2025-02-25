import { useState, useEffect } from "react";
import { useAutoContext } from "../context/AutoContext";
import styled from "styled-components";
import { FaChevronUp } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";

const FilterContainer = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  gap: 25px;

  @media (max-width: 768px) {
    display: inline-block;
  }
`;

const FilterTitle = styled.h3`
  font-size: 14px;
  color: #373737;
  font-weight: 600;

  @media (max-width: 768px) {
    display: none;
  }
`;

const FilterOption = styled.span`
  font-size: 14px;
  color: #373737;
  cursor: pointer;
  padding: 8px 12px;
  border-radius: 18px;
  transition: background-color 0.3s ease, color 0.3s ease;

  ${({ selected }) =>
    selected
      ? "background-color: #F7F7F7; color: #373737;"
      : "background-color: transparent; color: #373737;"}

  &:hover {
    background-color: #F7F7F7;
  }
`;

const DropdownButton = styled.div`
  margin-top: 18px;
  font-size: 14px;
  color: #373737;
  font-weight: 600;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 10px;

  @media (min-width: 769px) {
    display: none;
  }
`;

const DropdownList = styled(motion.ul)`
  z-index: 1000;
  position: absolute;
  top: 100%;
  left: 0;
  width: 200px;
  background: white;
  border-radius: 8px;
  box-shadow: 0px 2px 8px rgba(0, 0, 0, 0.1);
  list-style: none;
  margin-top: 9px;

  @media (max-width: 768px) {
    width: 158px;
    height: 145px;
  }

`;

const DropdownItem = styled.li`
  padding: 12px 16px;
  font-size: 14px;
  font-weight: 400;
  cursor: pointer;
  border-bottom: 1px solid #d8d8d8;
  transition: background-color 0.2s ease;

  &:last-child {
    border-bottom: none;
  }

  &:hover {
    background-color: #d1d6d634;
  }

  @media (max-width: 768px) {
    font-size: 10px;
  }

`;

const IconWrapper = styled.div`
  transition: transform 0.3s ease;
  transform: ${({ isOpen }) => (isOpen ? "rotate(-180deg)" : "rotate(0)")};
`;

const Filter = () => {
  const { state, dispatch } = useAutoContext();  // Obtiene el estado global y la función dispatch del contexto
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768); // Determina si la pantalla es móvil
  const [isOpen, setIsOpen] = useState(false); // Estado para controlar la apertura del menú desplegable



  const filterOptions = [
    { label: "Todos", value: "todos" },
    { label: "Autos", value: "autos" },
    { label: "Pickups y comerciales", value: "pickups y comerciales" },
    { label: "SUVs y Crossover", value: "suvs y crossover" },
  ];

  // Maneja el cambio de filtro, actualizando el estado global y cerrando el menú desplegable
  const handleFilterChange = (value) => {
    dispatch({ type: "SET_FILTER", payload: value }); // Establece el filtro seleccionado
    dispatch({ type: "FILTER_AND_SORT" }); // Aplica la lógica de filtrado y ordenamiento
    setIsOpen(false); // Cierra el menú desplegable
  };

  // Detecta cambios en el tamaño de la ventana para actualizar el estado `isMobile`
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);


  // Cierra el menú desplegable si el usuario hace clic fuera de él
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!event.target.closest("#filter-dropdown")) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <FilterContainer id="filter-dropdown">
      {!isMobile && <FilterTitle>Filtrar por</FilterTitle>}
      {isMobile ? (
        <>
          <DropdownButton onClick={() => setIsOpen(!isOpen)} isOpen={isOpen}>
            Filtrar por
            <IconWrapper isOpen={isOpen}>
              <FaChevronUp />
            </IconWrapper>
          </DropdownButton>
          <AnimatePresence>
            {isOpen && (
              <DropdownList
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
              >
                {filterOptions.map((option) => (
                  <DropdownItem
                    key={option.value}
                    onClick={() => handleFilterChange(option.value)}
                  >
                    {option.label}
                  </DropdownItem>
                ))}
              </DropdownList>
            )}
          </AnimatePresence>
        </>
      ) : (
        filterOptions.map((option) => (
          <FilterOption
            key={option.value}
            selected={state.filter === option.value}
            onClick={() => handleFilterChange(option.value)}
          >
            {option.label}
          </FilterOption>
        ))
      )}
    </FilterContainer>
  );
};

export default Filter;
