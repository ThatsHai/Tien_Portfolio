import { createBrowserRouter } from "react-router-dom";
import RootLayout from "../layouts/RootLayout";
import Homepage from "../pages/Homepage";

function Home() {
  return <h1>Home Page</h1>;
}
function About() {
  return <h1>About Page</h1>;
}
function Projects() {
  return <h1>Projects Page</h1>;
}

const CustomRouter = createBrowserRouter([
  {
    path: "/Tien_Portfolio",
    element: <RootLayout />,
    children: [
      { index: true, element: <Homepage /> }, // default = "/"
      { path: "about", element: <About /> },
      { path: "projects", element: <Projects /> },
    ],
  },
]);

export default CustomRouter;