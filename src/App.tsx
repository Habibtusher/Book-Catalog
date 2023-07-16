import { RouterProvider } from "react-router-dom";
import "./App.css";
import { Toaster } from "react-hot-toast";
import routes from "./routes/routes";
import { useEffect } from "react";
import { useAppDispatch } from "./redux/hooks";
import { setUser } from "./redux/features/user/userSlice";

function App() {
  const dispatch = useAppDispatch();
  useEffect(() => {
    const persistedUser = localStorage.getItem("user");
    if (persistedUser) {
      dispatch(setUser(JSON.parse(persistedUser)));
    }
  }, [dispatch]);
  return (
    <>
      <RouterProvider router={routes} />
      <Toaster position="top-right"></Toaster>
    </>
  );
}

export default App;
