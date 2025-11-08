import React from "react";
import { Link, NavLink } from "react-router";
import logo from "../../assets/logo.png";
const Navbar = () => {
  const user = null;
  const navLinks = (
    <>
      <li>
        <NavLink to="/" className="hover:text-primary">
          Home
        </NavLink>
      </li>
      <li>
        <NavLink to="/issues" className="hover:text-primary">
          Issues
        </NavLink>
      </li>
      {user && (
        <>
          <li>
            <NavLink to="/all-issues" className="hover:text-primary">
              All Issues
            </NavLink>
          </li>
          <li>
            <NavLink to="/add-issue" className="hover:text-primary">
              Add Issue
            </NavLink>
          </li>
          <li>
            <NavLink to="/my-issues" className="hover:text-primary">
              My Issues
            </NavLink>
          </li>
          <li>
            <NavLink to="/my-contribution" className="hover:text-primary">
              My Contribution
            </NavLink>
          </li>
        </>
      )}
    </>
  );

  return (
    <div className="navbar bg-base-100 shadow-sm">
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
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
          <img className="h-10 w-20" src={logo} alt="LOGo Png" />
        </Link>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">{navLinks}</ul>
      </div>
      <div className="navbar-end">
        <a className="btn">Button</a>
      </div>
    </div>
  );
};

export default Navbar;
