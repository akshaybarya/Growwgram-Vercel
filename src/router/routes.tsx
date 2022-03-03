import { Feed, PageNotFound, Profile } from "../views";

const routes = [
  {
    path: "/",
    element: <Feed />,
  },
  {
    path: "/user/:id",
    element: <Profile />,
  },
  {
    path: "*",
    element: <PageNotFound />,
  },
];

export default routes;
