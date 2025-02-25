import { createContext, useReducer, useContext, useEffect } from "react";
import { getCarModels, getCarById } from "../services/api";

const AutoContext = createContext();

const initialState = {
  cars: [], // Almacena la lista completa de autos obtenida desde la API
  filteredCars: [], // Contiene los autos filtrados y ordenados según los criterios aplicados
  filter: "todos", // Criterio de filtrado seleccionado por el usuario
  sort: "Nada", // Criterio de ordenamiento seleccionado por el usuario
  carDetails: {}, // Objeto que almacena detalles individuales de cada auto por ID
  view: "modelos", // Vista actual seleccionada en la interfaz
};

function autoReducer(state, action) {
  switch (action.type) {
    case "SET_CARS":
      // Almacena la lista de autos en el estado global y la asigna a filteredCars para mostrar inicialmente todos los autos
      return { ...state, cars: action.payload, filteredCars: action.payload };

    case "SET_FILTER":
      // Actualiza el criterio de filtrado del usuario
      return { ...state, filter: action.payload };

    case "SET_SORT":
       // Actualiza el criterio de ordenamiento del usuario
      return { ...state, sort: action.payload };

    case "SET_CAR_DETAILS":
      // Almacena los detalles de un auto específico en el estado global usando su ID como clave
      return {
        ...state,
        carDetails: {
          ...state.carDetails,
          [action.payload.id]: action.payload,
        },
      };

      case "FILTER_AND_SORT": {
        let filtered = [...state.cars]; // Copia la lista de autos original antes de aplicar filtros
        // Aplica el filtro basado en la categoría seleccionada
        if (state.filter !== "todos") {
          if (state.filter === "pickups y comerciales") {
            filtered = filtered.filter(
              (car) => car.segment.toLowerCase() === state.filter.toLowerCase()
            );
          } else if (state.filter === "suvs y crossover") {
            filtered = filtered.filter((car) => car.segment === "SUVs");
          } else if (state.filter === "autos") {
            filtered = filtered.filter(
              (car) =>
                car.segment !== "Pickups y Comerciales" && car.segment !== "SUVs"
            );
          }
        }
      
        // Aplica el ordenamiento si se ha seleccionado un criterio específico
        if (state.sort === "menor_precio") {
          filtered.sort((a, b) => a.price - b.price);
        } else if (state.sort === "mayor_precio") {
          filtered.sort((a, b) => b.price - a.price);
        } else if (state.sort === "mas_nuevos") {
          filtered.sort((a, b) => b.year - a.year);
        } else if (state.sort === "mas_viejos") {
          filtered.sort((a, b) => a.year - b.year);
        }
      
        return { ...state, filteredCars: filtered };
      }

    case "SET_VIEW":
      // Actualiza la vista actual en la interfaz
      return { ...state, view: action.payload };

    default:
      return state; // Retorna el estado sin cambios si la acción no está definida
  }
}

export function AutoProvider({ children }) {
  const [state, dispatch] = useReducer(autoReducer, initialState);

  useEffect(() => {
    async function fetchCars() {
      const data = await getCarModels();  // Obtiene la lista de autos desde la API
      dispatch({ type: "SET_CARS", payload: data }); // Almacena los autos en el estado global
    }
    fetchCars();
  }, []); // Se ejecuta una sola vez al montar el componente


  // Función para obtener detalles de un auto y almacenarlo en el estado global
  const fetchCarDetails = async (id) => {
    // Si los detalles del auto ya están en el estado, los retorna sin hacer una nueva solicitud
    if (state.carDetails[id]) return state.carDetails[id];

    try {
      const data = await getCarById(id); // Obtiene detalles del auto desde la API
      dispatch({ type: "SET_CAR_DETAILS", payload: { id, ...data } }); // Guarda los detalles en el estado global
      return data;
    } catch (error) {
      console.error("Error obteniendo detalles del auto:", error);
      return null;
    }
  };

  return (
    <AutoContext.Provider value={{ state, dispatch, fetchCarDetails }}>
      {children}
    </AutoContext.Provider>
  );
}

export function useAutoContext() {
  return useContext(AutoContext); // Hook para acceder al contexto global desde cualquier componente
}
