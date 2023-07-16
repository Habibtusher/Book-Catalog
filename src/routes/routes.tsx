import { createBrowserRouter } from "react-router-dom";
import Home from "../pages/home/Home";
import MainLayout from "../layouts/MainLayout";
import Login from "../pages/login/Login";
import Signup from "../pages/signup/Signup";
import NotFound from "../pages/shared/NotFound";
import Books from "../pages/books/Books";
import AddNewBooks from "../pages/books/AddNewBooks";
import BookDetails from "../pages/books/BookDetails";
import EditBook from "../pages/books/EditBook";
import PrivateRoute from "./PrivateRoute";

const routes = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: '/books',
        element: <Books />,
      },
      {
        path: '/book/details/:id',
        element: <BookDetails />,
      },
      {
        path: '/add-new-book',
        element: <AddNewBooks />,
      },
      {
        path: '/edit-book/:id',
        element:<PrivateRoute><EditBook /></PrivateRoute> ,
      },
    ],
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/signup",
    element: <Signup />,
  },
  {
    path: "*",
    element: <NotFound />,
  },
]);

export default routes;
