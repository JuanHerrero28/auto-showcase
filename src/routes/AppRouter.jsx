import { Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import CarDetail from "../pages/CarDetail";
import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

// Componente de diseño general que encapsula la navegación y el footer.
// `Outlet` representa el contenido dinámico que cambia según la ruta actual.
const Layout = () => (
  <>
    <Navbar />
    <Outlet /> {/* Renderiza el contenido de la ruta actual */}
    <Footer />
  </>
);

// Definición de las rutas principales de la aplicación
const AppRoutes = () => {
  return (
    <Routes>
      {/* Define una ruta base que utiliza el componente Layout */}
      <Route path="/" element={<Layout />}>
        {/* Ruta principal que carga la página Home */}
        <Route index element={<Home />} />
        {/* Ruta dinámica que carga los detalles de un auto según su ID */}
        <Route path="/:id" element={<CarDetail />} />
      </Route>
    </Routes>
  );
};

export default AppRoutes;

