
import { Outlet } from "react-router-dom";
// import WelcomeLayout from "./layout/Welcome.layout";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch } from 'react-redux';
import { setUser, setToken } from './redux/userSlice';
import { useEffect } from "react";

const App = () => {

  const dispatch = useDispatch();

  useEffect(() => {
    const fetchUserDetails = async () => {
      const token = localStorage.getItem('token');
      const user = localStorage.getItem('user');
      if (token && user) {
        try {
          const parsedUser = JSON.parse(user);
          dispatch(setUser(parsedUser));
          dispatch(setToken(token));

          // Optionally, you can verify the token by making a request to the backend
          // const response = await axios.get('http://localhost:3333/api/verify-token', {
          //   headers: {
          //     Authorization: `Bearer ${token}`
          //   }
          // });
          // if (response.data.success) {
          //   dispatch(setUser(response.data.user));
          // } else {
          //   localStorage.removeItem('token');
          //   localStorage.removeItem('user');
          // }
        } catch (error) {
          console.error("Failed to fetch user details", error);
        }
      }
    };

    fetchUserDetails();
  }, [dispatch]);


  return (
    <div>
      {/* <WelcomeLayout /> */}
      <Outlet />
      <ToastContainer
        position="bottom-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
    </div>
  );
};

export default App;
