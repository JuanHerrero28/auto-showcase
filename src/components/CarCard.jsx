import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const fadeIn = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.8, ease: "easeOut" } },
};

const Card = motion(
  styled.div`
    width: 269px;
    height: 216px;
    text-align: center;
    border: 2px solid transparent;
    padding: 10px;
    border-radius: 8px;
    transition: all 0.3s ease-in-out;
    position: relative;
    overflow: hidden;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background-color: white;

    ${({ selected }) =>
      selected &&
      `
      border-color: blue;
    `}

    &:hover h2 {
      color: red;
    }

    &:hover .cta-button {
      opacity: 1;
    }
  `
);

const CarImage = styled.img`
  width: 216px; 
  height: 112px;
  object-fit: contain; 
  margin-bottom: 8px;
`;

const CarName = styled.h2`
  font-weight: bold;
  font-size: 24px;
  margin: 5px 0;
  transition: color 0.3s ease-in-out;
`;

const CarDetails = styled.p`
  font-size: 14px;
  color: #191919;
`;

const Button = styled.button`
  width: 152px;
  height: 34px;
  border-radius: 40px;
  background-color: #191919;
  color: white;
  font-size: 13px;
  border: none;
  cursor: pointer;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, 72px);
  opacity: 0;
  transition: opacity 0.3s ease-in-out, transform 0.3s ease-in-out;

  &:hover {
    background-color: darkgray;
  }
`;

const CarCard = ({ car, selected, onSelect }) => {
  const navigate = useNavigate();  // Hook de navegación de React Router
  return (
    <Card selected={selected} onClick={() => onSelect(car.id)} initial="hidden" animate="visible" variants={fadeIn}>
      <CarName>{car.name}</CarName>
      <CarDetails>
        {car.year} | ${car.price.toLocaleString()}
      </CarDetails>
      <CarImage src={car.thumbnail} alt={car.name} />
      <Button
        className="cta-button"
        onClick={(e) => {
          e.stopPropagation(); // Evita que el evento de clic se propague al Card y dispare onSelect
          navigate(`/${car.id}?section=ficha-tecnica`); // Redirige a la página de detalles del auto
        }}
      >
        Ver Modelo
      </Button>
    </Card>
  );
};

export default CarCard;
