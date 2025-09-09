import { createBrowserRouter } from "react-router-dom";
import RootLayout from "../layouts/RootLayout";
import Homepage from "../pages/Homepage";
import ContactPage from "../pages/ContactPage";
import IllustsPage from "../pages/IllustsPage";
import ProjectPage from "../pages/ProjectPage";
import AnimationPage from "../pages/AnimationPage";
import Latibule from "../pages/projects/Latibule/Latibule";
import Learcult from "../pages/projects/Learcult/Learcult";
import IntroductoryTermPaper from "../pages/animation/IntroductoryTermPaper/FundamentalTopics";

const CustomRouter = createBrowserRouter(
  [
    {
      path: "/",
      element: <RootLayout />,
      children: [
        { index: true, element: <Homepage /> },
        { path: "contact", element: <ContactPage /> },
        { path: "illust", element: <IllustsPage /> },
        { path: "project", element: <ProjectPage /> },
        { path: "animation", element: <AnimationPage /> },
        { path: "latibule", element: <Latibule /> },
        { path: "learcult", element: <Learcult /> },
        { path: "fundamentalTopics", element: <IntroductoryTermPaper /> },
      ],
    },
  ],
  {
    basename: import.meta.env.BASE_URL,
  }
);

export default CustomRouter;
