import { Link } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { setUser } from "../redux/features/user/userSlice";

const Navbar = () => {
  const { user } = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();
  return (
    <div className="navbar bg-neutral text-neutral-content">
      <div className="container mx-auto">
        <div className="flex-1">
          <Link to="/" className="btn btn-ghost normal-case text-xl">
            Book Catalog
          </Link>
        </div>
        <div className="flex items-center gap-5">
          <div className="dropdown dropdown-end">
            <div className="flex items-center justify-center">
               <Link to="/books">Books</Link>
            </div>
          </div>
          <div className="dropdown dropdown-end">
            <div className="flex items-center justify-center">
              {user?.email && <Link to="/add-new-book">Add New Book</Link>}
            </div>
          </div>
        
          <div className="dropdown dropdown-end -ml-5">
            <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
              <div className="w-6 rounded-full">
                <img src="https://w7.pngwing.com/pngs/81/570/png-transparent-profile-logo-computer-icons-user-user-blue-heroes-logo-thumbnail.png" />
              </div>
            </label>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content mt-3 z-[1] p-2 text-gray-900 shadow bg-base-100 rounded-box w-52"
            >
              {!user?.email && (
                <>
                  <li>
                    <Link to="/login">Login</Link>
                  </li>
                  <li>
                    <Link to="/signup">Sign Up</Link>
                  </li>
                </>
              )}
              {user?.email && (
                <>
                <li>
                  <a onClick={() => {
                    // localStorage.removeItem('user')
                    // dispatch(setUser(""))
                    }}>Wishlist</a>
                </li>
                <li>
                  <a onClick={() => {
                    // localStorage.removeItem('user')
                    // dispatch(setUser(""))
                    }}>Plan to read</a>
                </li>
                <li>
                  <a onClick={() => {
                    localStorage.removeItem('user')
                    dispatch(setUser(""))
                    }}>Logout</a>
                </li>
                </>
              )}
               
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
