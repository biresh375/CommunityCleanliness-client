import React, { useState } from "react";
import { Link } from "react-router";

import { FcGoogle } from "react-icons/fc";

import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";

const Login = () => {
  // const { singIn, setUser, error, setError, setShow, show } = use(AuthContext);
  const [show, setShow] = useState(false);
  // console.log(show);
  // const emailRef = useRef(null);

  // const location = useLocation();

  // const navigate = useNavigate();
  // const handleLogin = (e) => {
  //   e.preventDefault();
  //   setError("");
  //   const form = e.target;
  //   const email = form.email.value;
  //   const password = form.password.value;

  //   const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z]).{6,}$/;

  //   if (!passwordRegex.test(password)) {
  //     setError(
  //       "Password must have at least one uppercase letter, one lowercase letter, and be at least 6 characters long."
  //     );
  //     return;
  //   }

  //   // console.log({email, password});
  //   singIn(email, password)
  //     .then((result) => {
  //       const user = result.user;

  //       toast.success(" sucessfully Login");
  //       navigate(`${location.state ? location.state : "/"}`);
  //     })
  //     .catch((error) => {
  //       setError(error.code);
  //       toast.error(error.message);
  //     });
  // };
  // const handleGoogleSignin = () => {
  //   signInWithPopup(auth, googleprovider)
  //     .then((result) => {
  //       const user = result.user;
  //       setUser(user);

  //       navigate(`${location.state ? location.state : "/"}`);
  //       toast.success("Sucessfully signIn with Google");
  //     })
  //     .catch((error) => {
  //       const errorcode = error.code;
  //       toast.error(errorcode);
  //     });
  // };
  const handleShow = (e) => {
    e.preventDefault();
    setShow(!show);
  };
  return (
    <div className="flex justify-center  mt-10 items-center">
      <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
        <p className="pt-2.5 text-2xl font-semibold text-center">
          Login your account
        </p>
        <form
          //  onSubmit={handleLogin}
          className="card-body"
        >
          <div className="divider"></div>
          <fieldset className="fieldset">
            {/* email */}
            <label className="label">Email</label>
            <input
              // ref={emailRef}
              required
              type="email"
              name="email"
              className="input"
              placeholder="Email"
            />
            {/* password */}
            <label className="label">Password</label>
            <div className="relative">
              <input
                required
                type={show ? "text" : "password"}
                name="password"
                className="input"
                placeholder="Password"
              />
              <button
                onClick={handleShow}
                className="absolute top-2.5 right-6 text-xl z-10"
              >
                {show ? <FaRegEyeSlash /> : <FaRegEye />}
              </button>
            </div>
            <div>
              <Link
                // to={`/forget-password?email=${emailRef.current?.value || ""}`}
                className="text-blue-500 hover:underline"
              >
                Forget Password?
              </Link>
            </div>
            {/* <div>{error && <p className="text-red-700">{error}</p>}</div> */}
            <button
              type="submit"
              className="btn btn-primary text-white px-3 py-1 rounded-md mt-4"
            >
              Login
            </button>
            <div className="text-center">
              <p>or</p>
            </div>
            <button
              // onClick={handleGoogleSignin}
              className="btn  btn-outline btn-primary w-full"
            >
              <FcGoogle size={24} /> Login with Google
            </button>
            <p className="my-2.5 text-center">
              Dont’t Have An Account ?{" "}
              <Link className="text-purple-500 hover:underline" to="/register">
                Register
              </Link>
            </p>
          </fieldset>
        </form>
      </div>
    </div>
  );
};

export default Login;
