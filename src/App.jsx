import { BrowserRouter } from "react-router-dom";
import AppRoutes from "./routes/AppRouter";
import GlobalStyles from "./styles/GlobalStyles";

function App() {
  return (
      // `BrowserRouter` envuelve la aplicación para habilitar la navegación basada en rutas.
      <BrowserRouter>
      {/* Aplica los estilos globales definidos en `GlobalStyles`, asegurando coherencia en toda la aplicación. */}
      <GlobalStyles />
      
      {/* Renderiza las rutas de la aplicación, gestionadas en `AppRoutes`. */}
      <AppRoutes />
    </BrowserRouter>
  );
}

export default App;
