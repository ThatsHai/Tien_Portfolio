import { RouterProvider } from "react-router-dom";
import Navbar from "./components/Navbar";
import Homepage from "./pages/Homepage";
import CustomRouter from "./router/CustomRouter";

function App() {
  return (
    <>
      <RouterProvider router={CustomRouter} ></RouterProvider>
    </>
  );
}

export default App;
