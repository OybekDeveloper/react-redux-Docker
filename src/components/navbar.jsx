import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { logo } from "../constants/logo";
import { useDispatch, useSelector } from "react-redux";
import { logOutUser } from "../slice/auth";
const Navbar = () => {

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loggedIn, user } = useSelector(state => state.auth);
  const logoutHandler = () => {
    localStorage.removeItem('token');
    navigate('/login');
    dispatch(logOutUser());
  }
  return (
    <header className="d-flex flex-wrap align-items-center justify-content-center justify-content-md-between py-3 mb-4 border-bottom">
      <div className="col-md-3 mb-2 mb-md-0 ">
        <Link to={"/"}>
          <img
            style={{ width: "100px" }}
            src={logo}
            alt={"logo"}
          />
        </Link>

      </div>
      {user && (
        <div className="d-flex  align-items-center ">
          <h4 className="mt-1 mx-2">Profile:</h4>
          <Link to={`/profile/${user.username}`}>
            <button className=" btn btn-secondary">
              {user.username}
            </button>
          </Link>
        </div>
      )}
      <div className="col-md-3 text-end">
        {loggedIn ? (
          <div className="d-flex align-items-center justify-content-center" >

            <Link to={'/create-article'}>
              <button className="btn btn-outline-success">
                Create Article
              </button>
            </Link>
            <button className=" mx-2 btn btn-outline-danger" onClick={logoutHandler}>
              Log Out
            </button>
          </div>
        ) : (
          <>
            <Link to={"/login"}>
              <button type="button" className="btn btn-outline-primary me-2">
                Login
              </button>
            </Link>
            <Link to={"register"}>
              <button type="button" className="btn btn-primary">
                Register
              </button>
            </Link>
          </>
        )}

      </div>
    </header>
  );
};

export default Navbar;
