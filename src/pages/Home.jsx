import { useEffect, useState } from "react";
import { useAutoContext } from "../context/AutoContext";
import CarCard from "../components/CarCard";
import styled from "styled-components";
import Header from "../components/Header";
import { Orbit } from "@uiball/loaders";

const HomeContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
  justify-content: center;
  padding: 20px;
  margin-top:30px;
  margin-bottom:90px;
`;

const SpinnerContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
`;

const LoadingText = styled.p`
  margin-top: 10px;
  font-size: 14px;
  color: #191919;
`;

const MIN_LOADING_TIME = 1500; // Tiempo mínimo de carga en milisegundos

const Home = () => {
  const { state } = useAutoContext(); // Obtiene el estado global del contexto de autos
  const { filteredCars } = state; // Extrae los autos filtrados del estado global
  const [loading, setLoading] = useState(true); // Estado para manejar la carga de los autos

  useEffect(() => {
    const startTime = Date.now(); // Guarda el tiempo de inicio de la carga


    const loadCars = () => {
      const elapsedTime = Date.now() - startTime; // Calcula el tiempo transcurrido desde el inicio
      const remainingTime = Math.max(MIN_LOADING_TIME - elapsedTime, 0);  // Determina el tiempo restante para alcanzar el mínimo requerido

     // Garantiza que la pantalla de carga se muestre al menos MIN_LOADING_TIME ms
      setTimeout(() => setLoading(false), remainingTime);
    };

    loadCars();
  }, []); // Solo se ejecuta una vez cuando el componente se monta

  //Mientras el estado de carga sea true, muestra el spinner de carga
  if (loading)
    return (
      <SpinnerContainer>
        <Orbit color="#000" size={30} />
        <LoadingText>Cargando autos...</LoadingText>
      </SpinnerContainer>
    );

  return (
    <>
      <Header />
      <HomeContainer>
       {/* Renderiza la lista de autos si hay elementos, de lo contrario muestra un mensaje */}
        {filteredCars.length > 0 ? (
          filteredCars.map((car) => <CarCard key={car.id} car={car} />)
        ) : (
          <p>No hay autos disponibles.</p>
        )}
      </HomeContainer>
    </>
  );
};

export default Home;
