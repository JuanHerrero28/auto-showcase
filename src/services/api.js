import axios from "axios";


// Definimos la URL base de la API para centralizar el punto de acceso a los recursos.
const API_URL = "https://challenge.egodesign.dev/api";


/**
 * Obtiene la lista de modelos de autos desde la API.
 * Utiliza `axios.get` para realizar la solicitud HTTP de manera asíncrona.
 * 
 * @returns {Promise<Array>} Un array de modelos de autos si la solicitud es exitosa.
 * @throws {Error} Lanza un error en caso de fallo en la petición.
 */
export const getCarModels = async () => {
  try {
    const response = await axios.get(`${API_URL}/models`);
    return response.data;
  } catch (error) {
    console.error("Error al obtener los modelos:", error);
    throw error;
  }
};

/**
 * Obtiene los detalles de un auto específico a partir de su ID.
 * 
 * @param {string} id - Identificador único del auto.
 * @returns {Promise<Object>} Un objeto con los detalles del auto si la solicitud es exitosa.
 * @throws {Error} Lanza un error en caso de fallo en la petición.
 */
export const getCarById = async (id) => {
    try {
      const response = await axios.get(`${API_URL}/models/${id}`);
      return response.data;
    } catch (error) {
      console.error("Error al obtener detalles del auto:", error);
      throw error;
    }
  };