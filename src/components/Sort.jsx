import { useState, useEffect } from "react";
import { useAutoContext } from "../context/AutoContext";
import styled from "styled-components";
import { FaChevronUp } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";

const SortContainer = styled.div`
  position: relative;
  display: inline-block;
`;

const DropdownButton = styled.div`
  margin-top: 10px;
  font-size: 14px;
  color: #373737;
  font-weight: 600;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 10px;

  @media (max-width: 768px) {
    margin-top: 18px;
  }
`;

const DropdownList = styled(motion.ul)`
  z-index: 1000;
  position: absolute;
  top: 100%;
  left: -60px;
  width: 170px;
  height: 182px;
  background: white;
  border-radius: 8px;
  box-shadow: 0px 2px 8px rgba(0, 0, 0, 0.1);
  list-style: none;
  margin-top: 9px;
`;

const DropdownItem = styled.li`
  padding: 12px 16px;
  font-size: 10px;
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
`;

const IconWrapper = styled.div`
  transition: transform 0.3s ease;
  transform: ${({ isOpen }) => (isOpen ? "rotate(-180deg)" : "rotate(0)")};
`;

const BoldText = styled.span`
  font-weight: 700;
`;

const options = [
  { value: "", label: "Nada" },
  {
    value: "menor_precio",
    label: (
      <>
        De <BoldText>menor</BoldText> a <BoldText>mayor</BoldText> precio
      </>
    ),
  },
  {
    value: "mayor_precio",
    label: (
      <>
        De <BoldText>mayor</BoldText> a <BoldText>menor</BoldText> precio
      </>
    ),
  },
  {
    value: "mas_nuevos",
    label: (
      <>
        Más <BoldText>nuevos</BoldText> primero
      </>
    ),
  },
  {
    value: "mas_viejos",
    label: (
      <>
        Más <BoldText>viejos</BoldText> primero
      </>
    ),
  },
];

const Sort = () => {
  const { state, dispatch } = useAutoContext();
  const [isOpen, setIsOpen] = useState(false);

   // Maneja la selección de una opción del menú desplegable
  const handleSortChange = (value) => {
    dispatch({ type: "SET_SORT", payload: value }); // Actualiza el estado global con el criterio de ordenamiento seleccionado
    dispatch({ type: "FILTER_AND_SORT" }); // Aplica el filtrado y ordenamiento en función de la selección
    setIsOpen(false); // Cierra el menú desplegable después de seleccionar una opción
  };

  // Agrega un evento para cerrar el dropdown cuando el usuario hace clic fuera de él
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!event.target.closest("#sort-dropdown")) {
        setIsOpen(false);  // Cierra el menú si el clic ocurre fuera del contenedor
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <SortContainer id="sort-dropdown">
      <DropdownButton onClick={() => setIsOpen(!isOpen)} isOpen={isOpen}>
        Ordenar por
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
            {options.map((option) => (
              <DropdownItem
                key={option.value}
                onClick={() => handleSortChange(option.value)}
              >
                {option.label}
              </DropdownItem>
            ))}
          </DropdownList>
        )}
      </AnimatePresence>
    </SortContainer>
  );
};

export default Sort;
