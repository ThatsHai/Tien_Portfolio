import { createBrowserRouter } from "react-router-dom";
import RootLayout from "../layouts/RootLayout";
import Homepage from "../pages/Homepage";
import ContactPage from "../pages/ContactPage";
import IllustsPage from "../pages/IllustsPage";
import ProjectPage from "../pages/ProjectPage";
import Latibule from "../pages/projects/Latibule/Latibule";
import Learcult from "../pages/projects/Learcult/Learcult";

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
        { path: "illust", element: <IllustsPage /> },
        { path: "project", element: <ProjectPage /> },
        { path: "latibule", element: <Latibule /> },
        { path: "learcult", element: <Learcult /> },
      ],
    },
  ],
  {
    basename: import.meta.env.BASE_URL,
  }
);

export default CustomRouter;
