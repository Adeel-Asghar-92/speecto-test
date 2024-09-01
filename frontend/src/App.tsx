import "./App.css";
import { Route, Routes } from "react-router-dom";
import { routes } from "./routes";
import NavBar from "./components/Navbar/NavBar";

function App() {
  return (
    <div className="App">
      <NavBar />
      <Routes>
        {routes.map((route, index) => (
          <Route key={index} path={route.path} element={route.element} />
        ))}
      </Routes>
    </div>
  );
}

export default App;
