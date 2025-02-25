import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useAutoContext } from "../context/AutoContext";
import { Orbit } from "@uiball/loaders";
import styled from "styled-components";
import CarSlider from "../components/CarSlider";

const PageContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  gap: 20px;

  @media (max-width: 768px) {
    display: flex;
    flex-direction: column;
    gap: 10px;
    padding: 10px;
  }
`;

const SectionWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  grid-column: span 12;
  padding: 20px;
  gap: 20px;
  

  @media (max-width: 768px) {
    margin-top: 70px;
    flex-direction: column;
    padding: 10px;
  }
`;

const SectionImageContainer = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;

  img {
    max-width: 100%;
    height: auto;
    object-fit: contain;
    border-radius: 8px;
  }
`;

const SectionOne = styled.div`
margin-top: 20px;
  flex: 1;

  h1 {
    color: #373737;
    font-size: 42px;
    font-weight: 600;
    width: 490px;
  }

  h2 {
    font-size: 24px;
    color: #373737;
    
  }

  p {
    font-size: 16px;
    color: #373737;
    font-weight: 400;
    margin-top: 20px;
    width: 450px;
  }

  @media (max-width: 768px) {
    h1 {
      font-size: 32px;
      padding: 5px;
      width: 410px;
    }

    h2 {
      font-size: 18px;
      padding: 0 5px;
    }

    p {
      font-size: 14px;
      margin-top: 10px;
      padding: 5px;
    }
  }
`;

const Container = styled.div`
  padding: 20px;
  grid-column: span 12;
`;

const SectionOrder = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  grid-column: span 12;
  padding: 20px;
  gap: 20px;

  @media (max-width: 768px) {
    flex-direction: column-reverse;
    padding: 15px;
    gap: 10px;
  }
`;

const SectionOrder2 = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  grid-column: span 12;

  margin-bottom: 20px;
  padding: 20px;
  gap: 20px;

  @media (max-width: 768px) {
    flex-direction: column;
    padding: 15px;
    gap: 10px;
  }
`;

const SectionImageContainer3 = styled.div`
  img {
    width: 559px;
    height: auto;
    object-fit: cover;
    border-radius: 8px;
  }

  @media (max-width: 768px) {
    img {
      width: 345px;
    }
`;

const SectionThree = styled.div`
  flex: 1;
  padding: 20px;

  h3 {
    font-size: 20px;
    font-weight: 600;
    color: #373737;
    margin-bottom: 8px;
  }

  p {
    font-size: 16px;
    color: #373737;
    font-weight: 400;
    line-height: 1.5;
  }

  @media (max-width: 768px) {
    padding: 10px;

    p {
      font-size: 14px;
    }

  }
`;

const SectionFour = styled.div`
  flex: 1;
  padding: 20px;

  h3 {
    font-size: 20px;
    font-weight: 600;
    color: #373737;
    margin-bottom: 8px;
  }

  p {
    font-size: 16px;
    color: #373737;
    font-weight: 400;
    line-height: 1.5;
  }

  @media (max-width: 768px) {
    padding: 10px;

    p {
      font-size: 14px;
    }
  }
`;

const FullWidthSection = styled.div`
  grid-column: span 12;

  @media (max-width: 768px) {
    width: 100%;
  }
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
// tiempo mínimo de carga para garantizar una transición fluida en la UI.
const MIN_LOADING_TIME = 1500;

const CarDetail = () => {
// Extraemos el parámetro de la URL para identificar el auto a visualizar.
  const { id } = useParams();
  // Obtenemos el estado global y la función para obtener detalles del auto desde el contexto.
  const { state, fetchCarDetails } = useAutoContext();
  // Estado local para manejar la carga y los datos del auto.
  const [loading, setLoading] = useState(true);
  const [car, setCar] = useState(state.carDetails[id] || null);

  useEffect(() => {
    setLoading(true); //Indicamos que la carga ha iniciado.
    const startTime = Date.now(); // Guardamos el tiempo de inicio para calcular el tiempo transcurrido.

    const loadCar = async () => {
        // Solo realizamos la petición si los datos del auto aún no están en el estado global.
      if (!car) {
        const data = await fetchCarDetails(id);
        setCar(data);
      }
    
      // Calculamos el tiempo restante para cumplir con el tiempo mínimo de carga.
      const elapsedTime = Date.now() - startTime;
      const remainingTime = Math.max(MIN_LOADING_TIME - elapsedTime, 0);
     
      // Usamos un timeout para garantizar una animación de carga fluida si la respuesta es muy rápida.
      setTimeout(() => setLoading(false), remainingTime);
    };

    loadCar();
  }, [id, fetchCarDetails, car]); // Dependencias: id cambia cuando se navega a otro auto, y la función de fetch.

  // Renderizado condicional mientras los datos aún se están cargando.
  if (loading)
    return (
      <SpinnerContainer>
        <Orbit color="#000" size={30} />
        <LoadingText>Cargando ficha técnica...</LoadingText>
      </SpinnerContainer>
    );
    // Manejo del caso en que no se encuentre el auto.
  if (!car) return <p>Auto no encontrado</p>;

  return (
    <PageContainer>
      <SectionWrapper>
        <SectionImageContainer>
          <img src={car.photo} alt={car.name} />
        </SectionImageContainer>
        <SectionOne>
          <h2>{car.name}</h2>
          <h1>{car.title}</h1>
          <p dangerouslySetInnerHTML={{ __html: car.description }}></p>
        </SectionOne>
      </SectionWrapper>

      <FullWidthSection>
        <CarSlider />
      </FullWidthSection>
      <Container>
        <SectionOrder>
          <SectionThree className="second-child">
            <h3>Puntos destacados</h3>
            <p>Algunas de las características más relevantes del modelo.</p>
          </SectionThree>
          <SectionImageContainer3 className="first-child">
            <img
              src={car.model_highlights[0].image}
              alt={car.model_highlights[0].title}
            />
          </SectionImageContainer3>
        </SectionOrder>

        <SectionOrder2>
          <SectionImageContainer3 className="second-child">
            <img
              src={car.model_highlights[1].image}
              alt={car.model_highlights[1].title}
            />
          </SectionImageContainer3>
          <SectionFour className="first-child">
            <h3>{car.model_highlights[1].title}</h3>
            <p
              dangerouslySetInnerHTML={{
                __html: car.model_highlights[1].content,
              }}
            ></p>
          </SectionFour>
        </SectionOrder2>
      </Container>
    </PageContainer>
  );
};

export default CarDetail;