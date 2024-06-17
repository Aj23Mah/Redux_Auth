// import { Routes, Route, createBrowserRouter } from "react-router-dom";
import { createBrowserRouter } from "react-router-dom";
// import { PRIMARY_ROUTES } from "./routes";
import LogIn from "../pages/LogIn";
import SignUp from "../pages/SignUp";
import ForgetPassword from "../pages/ForgetPassword";
import App from "../App";
import Home from "../pages/Home";
import AuthLayouts from "../layout/index";
// import UserProfile from "../components/UserProfile";
// import ProtectedRoute from "../components/ProtectedRoute";

// const PrimaryRoute = () => {
//   return (
//     <Routes>
//       <Route path="/login" element={<LogIn />} />
//       <Route path="/register" element={<SignUp />} />
//       <Route path="/forget-password" element={<ForgetPassword />} />
//       <Route element={<ProtectedRoute />}>
//         {PRIMARY_ROUTES.map((route, key) => (
//           <Route key={key} path={route.path} element={route.element} />
//         ))}
//       </Route>
//     </Routes>
//   );
// };
const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "register",
        element: <AuthLayouts><SignUp /></AuthLayouts>,
      },
      {
        path: "login",
        element: <AuthLayouts><LogIn /></AuthLayouts>,
      },
      {
        path: "forget-password",
        element: <AuthLayouts><ForgetPassword /></AuthLayouts>,
      },
      {
        path: "",
        element: <Home />,
        // children: [
          // {
          //   path: "/profile",
          //   element: <UserProfile />,
          // },
          // {
          //   path: ":userId",
          //   element: <MessagePage />,
          // },
        // ],
      },
    ],
  },
]);

export default router;
// export default PrimaryRoute;
