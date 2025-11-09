import { Link, useNavigate } from "react-router";

import { FcGoogle } from "react-icons/fc";

import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";

import { use, useState } from "react";
import { AuthContext } from "../../Context/AuthContext";
import Swal from "sweetalert2";

const Register = () => {
  const { setUser, googleSignIn, creatUser, update } = use(AuthContext);
  const [show, setShow] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const handleSubmit = (e) => {
    setError("");
    e.preventDefault();
    const form = e.target;
    const name = form.name.value;
    const photo = form.photo.value;
    const email = form.email.value;
    const password = form.password.value;
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z]).{6,}$/;
    if (!passwordRegex.test(password)) {
      setError(
        "Password must have at least one uppercase letter, one lowercase letter, and be at least 6 characters long."
      );
      return;
    }
    console.log({ name, photo, email, password });
    creatUser(email, password)
      .then((result) => {
        const user = result.user;
        update({ displayName: name, photoURL: photo })
          .then(() => {
            setUser({ ...user, displayName: name, photoURL: photo });
            navigate("/");
          })
          .catch((error) => {
            const errorCode = error.code;
            setUser(user);
            Swal.fire({
              position: "top-end",
              icon: "error",
              title: `${errorCode}`,
              showConfirmButton: false,
              timer: 1500,
            });
          });
        // console.log(user);
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Register Sucessfully",
          showConfirmButton: false,
          timer: 1500,
        });
      })
      .catch((error) => {
        const errorcode = error.code;
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: `${errorcode}`,
          showConfirmButton: false,
          timer: 1500,
        });
      });
  };
  const handleGoogleSignin = () => {
    googleSignIn()
      .then((result) => {
        const user = result.user;
        setUser(user);
        console.log(user);
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Sucessfully login with google",
          showConfirmButton: false,
          timer: 1500,
        });
        navigate("/");
      })
      .catch((error) => {
        const errorcode = error.code;
        Swal.fire({
          position: "top-end",
          icon: "error",
          title: `${errorcode}`,
          showConfirmButton: false,
          timer: 1500,
        });
      });
  };
  const handleShow = (e) => {
    e.preventDefault();
    setShow(!show);
  };
  return (
    <div className="flex justify-center mt-5 items-center">
      <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
        <p className="pt-2.5 text-2xl font-semibold text-center">
          Register your account
        </p>
        <form onSubmit={handleSubmit} className="card-body">
          <div className="divider"></div>
          <fieldset className="fieldset">
            <label className="label">Name</label>
            <input
              required
              type="text"
              className="input"
              name="name"
              placeholder="Name"
            />
            <label className="label">Photo URL</label>
            <input
              required
              type="text"
              className="input"
              name="photo"
              placeholder="Photo URL"
            />
            <label className="label">Email</label>
            <input
              required
              type="email"
              className="input"
              name="email"
              placeholder="Email"
            />
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
            <div>{error && <p className="text-red-500">{error}</p>}</div>
            <button
              type="submit"
              className="btn btn-primary text-white px-3 py-1 rounded-md mt-4"
            >
              Register
            </button>
            <div className="text-center">
              <p>or</p>
            </div>
            <button
              onClick={handleGoogleSignin}
              className="btn btn-primary btn-outline w-full"
            >
              <FcGoogle size={24} /> Login with Google
            </button>
            <p className="my-2.5 text-center">
              Already Have An Account ?{" "}
              <Link className="text-purple-500 hover:underline" to="/login">
                Login
              </Link>
            </p>
          </fieldset>
        </form>
      </div>
    </div>
  );
};

export default Register;
