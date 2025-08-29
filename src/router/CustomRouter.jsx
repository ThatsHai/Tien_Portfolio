import { createBrowserRouter } from "react-router-dom";
import RootLayout from "../layouts/RootLayout";
import Homepage from "../pages/Homepage";
import ContactPage from "../pages/ContactPage";

function Home() {
  return <h1>Home Page</h1>;
}
function About() {
  return <h1>About Page</h1>;
}
function Projects() {
  return <h1>Projects Page</h1>;
}

const CustomRouter = createBrowserRouter(
  [
    {
      path: "/", 
      element: <RootLayout />,
      children: [
        { index: true, element: <Homepage /> },
        { path: "contact", element: <ContactPage /> },
        { path: "projects", element: <Projects /> }, 
      ],
    },
  ],
  {
    basename: import.meta.env.BASE_URL, 
  }
);

export default CustomRouter;