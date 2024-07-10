import { Counter } from "./components/Counter";
import Courses from "./components/Courses";
import { FetchData } from "./components/FetchData";
import { Home } from "./components/Home";

const AppRoutes = [
  {
    index: true,
    element: <Home />,
  },
  {
    path: "/counter",
    element: <Counter />,
  },
  {
    path: "/fetch-data",
    element: <FetchData />,
  },
  {
    path: "/courses",
    element: <Courses />,
  },
];

export default AppRoutes;
