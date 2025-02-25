import { Swiper, SwiperSlide } from "swiper/react";
import { Tooltip } from "react-tooltip";
import "react-tooltip/dist/react-tooltip.css";
import { Navigation, Autoplay, Pagination } from "swiper/modules";
import { useAutoContext } from "../context/AutoContext";
import { useParams } from "react-router-dom";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import styled from "styled-components";

const SliderContainer = styled.div`
  background-color: #f7f7f7;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 15px;
`;

const SwiperWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
`;

const StyledSwiper = styled(Swiper)`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 25px;

  .swiper-button-next,
  .swiper-button-prev {
    color: #373737;
    width: 10px;
    height: 10px;
  }

  .swiper-button-next::after,
  .swiper-button-prev::after {
    font-size: 25px;
  }

  .swiper-pagination {
    bottom: 1px;
  }

  /* Ocultar flechas en móviles */
  @media (max-width: 768px) {
    .swiper-button-next,
    .swiper-button-prev {
      visibility: hidden;
      opacity: 0;
      pointer-events: none;
    }

  /* Estilo de los puntos */
  .swiper-pagination-bullet {
    width: 8px;
    height: 8px;
    background: #373737;
    opacity: 0.5;
    transition: opacity 0.3s ease;
  }

  .swiper-pagination-bullet-active {
    background: #373737;
    opacity: 1;
  }
`;

const SlideItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  width: 350px;
  height: 275px;
`;

const SlideImage = styled.img`
  width: 100%;
  height: 190px;
  object-fit: cover;
  border-radius: 8px;
`;

const SlideTitle = styled.h3`
  margin-top: 15px;
  font-size: 15px;
  font-weight: 600;
  color: #373737;
  text-align: center;
`;

const SlideDescription = styled.p`
  font-size: 14px;
  color: #373737;
  line-height: 27px;
  letter-spacing: -0.1px;
  width: 268px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const CarSlider = () => {
  const { id } = useParams(); // Obtiene el parámetro de la URL
  const { state } = useAutoContext(); // Obtiene el estado global del contexto
  const car = state.carDetails[id]; // Busca los detalles del auto por ID

  if (!car || (!car.model_features && !car.model_highlights)) {
    return <p>No hay imágenes disponibles</p>; // Maneja el caso en el que no hay imágenes
  }

  const sliderItems = [
    ...(car.model_features || []),
    ...(car.model_highlights || []),
  ];  // Combina las características y aspectos destacados en un solo array

  return (
    <SliderContainer>
      <StyledSwiper
        modules={[Navigation, Autoplay, Pagination]}
        spaceBetween={0}
        slidesPerView={3}
        centeredSlides={true}
        navigation
        pagination={{ clickable: true }}
        loop={true}
        autoplay={{ delay: 3000, pauseOnMouseEnter: true }}
        breakpoints={{
          0: { slidesPerView: 1 }, // Mobile: 1 imagen
          768: { slidesPerView: 3 }, // Desktop: 3 imágenes
        }}
      >
        {sliderItems.map((item, index) => (
          <SwiperSlide key={index}>
            <SwiperWrapper>
              <SlideItem>
                <SlideImage src={item.image} alt={item.name || item.title} />
                <SlideTitle>{item.name || item.title}</SlideTitle>
                <SlideDescription
                  data-tooltip-id={`tooltip-${index}`}
                  data-tooltip-content={(
                    item.description || item.content
                  )?.replace(/<\/?[^>]+(>|$)/g, "")}
                >
                  {(item.description || item.content)
                    ?.replace(/<\/?[^>]+(>|$)/g, "")
                    .slice(0, 50)}
                  {item.description?.length > 50 || item.content?.length > 50
                    ? "..."
                    : ""}
                </SlideDescription>

                <Tooltip
                  id={`tooltip-${index}`}
                  style={{
                    backgroundColor: "#373737",
                    color: "#f7f7f7",
                    fontSize: "14px",
                    padding: "8px 12px",
                    borderRadius: "6px",
                    maxWidth: "280px",
                    textAlign: "center",
                    fontFamily: "Montserrat, sans-serif",
                  }}
                />
              </SlideItem>
            </SwiperWrapper>
          </SwiperSlide>
        ))}
      </StyledSwiper>
    </SliderContainer>
  );
};

export default CarSlider;
