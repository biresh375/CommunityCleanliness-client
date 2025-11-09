import React, { use } from "react";
import { Link, NavLink } from "react-router";
import logo from "../../assets/logo.png";
import { FaUserCircle } from "react-icons/fa";
import Container from "../Container/Container";
import { RiArrowDropRightFill } from "react-icons/ri";
import { AuthContext } from "../../Context/AuthContext";
import Swal from "sweetalert2";
const Navbar = () => {
  const { user, logOut } = use(AuthContext);
  const navLinks = (
    <>
      <li>
        <NavLink to="/" className="hover:text-primary">
          Home
          <RiArrowDropRightFill />
        </NavLink>
      </li>
      <li>
        <NavLink to="/all-issues" className="hover:text-primary">
          All Issues
          <RiArrowDropRightFill />
        </NavLink>
      </li>

      {user && (
        <>
          <li>
            <NavLink to="/add-issue" className="hover:text-primary">
              Add Issue
              <RiArrowDropRightFill />
            </NavLink>
          </li>
          <li>
            <NavLink to="/my-issues" className="hover:text-primary">
              My Issues
              <RiArrowDropRightFill />
            </NavLink>
          </li>
          <li>
            <NavLink to="/my-contribution" className="hover:text-primary">
              My Contribution
              <RiArrowDropRightFill />
            </NavLink>
          </li>
        </>
      )}
    </>
  );
  const handleLogout = () => {
    logOut()
      .then(() => {
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Sucessfully Logout",
          showConfirmButton: false,
          timer: 1500,
        });
      })
      .catch((err) => {
        alert(err.message);
      });
  };

  return (
    <div className=" bg-secondary shadow-sm">
      <Container>
        <div className="navbar">
          <div className="navbar-start">
            <div className="dropdown">
              <div
                tabIndex={0}
                role="button"
                className="btn btn-ghost lg:hidden"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  {" "}
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h8m-8 6h16"
                  />{" "}
                </svg>
              </div>
              <ul
                tabIndex="-1"
                className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
              >
                {navLinks}
              </ul>
            </div>
            <Link to="/">
              <img className="h-10 " src={logo} alt="LOGo Png" />
            </Link>
          </div>
          <div className="navbar-center hidden lg:flex xl:hidden">
            <ul className="menu menu-horizontal flex-nowrap whitespace-nowrap  px-1">
              {navLinks}
            </ul>
          </div>
          <div className="navbar-end ">
            <div className="hidden  xl:flex">
              <ul className="menu menu-horizontal flex-nowrap whitespace-nowrap  px-1">
                {navLinks}
              </ul>
            </div>

            <div className="flex-none gap-2">
              {user ? (
                <div className="dropdown dropdown-end">
                  <div
                    tabIndex={0}
                    role="button"
                    className="btn btn-ghost btn-circle avatar"
                  >
                    {user.photoURL ? (
                      <img
                        alt="User"
                        src={user.photoURL}
                        className="w-10 rounded-full"
                      />
                    ) : (
                      <FaUserCircle className="text-3xl text-blue-700" />
                    )}
                  </div>
                  <ul
                    tabIndex={0}
                    className="menu dropdown-content bg-white rounded-box w-52 mt-3 shadow"
                  >
                    <li>
                      <p className="text-sm font-semibold px-3">
                        {user.displayName}
                      </p>
                    </li>
                    <li>
                      <button
                        onClick={handleLogout}
                        className="text-red-600 hover:bg-red-50"
                      >
                        Logout
                      </button>
                    </li>
                  </ul>
                </div>
              ) : (
                <div className="flex gap-3">
                  <Link to="/login" className="btn btn-outline btn-primary">
                    Login
                  </Link>
                  <Link to="/register" className="btn btn-primary text-white">
                    Register
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default Navbar;
