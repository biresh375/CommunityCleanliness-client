import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router";
import cleanImg from "../../assets/cleanup-volunteer.jpeg";

const JoinCleanDrive = () => {
  return (
    <section className=" py-10 ">
      <div className=" flex flex-col-reverse lg:flex-row items-center justify-between gap-15">
        <motion.div
          className="lg:w-1/2 text-center lg:text-left"
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-3xl md:text-4xl font-extrabold text-green-600 mb-4">
            Be a <span className="text-primary">Community Hero!</span>
          </h2>
          <p className="text-gray-600 text-lg leading-relaxed mb-6">
            Join our next <strong>Clean-Up Drive</strong> and help make your
            city greener, cleaner, and more livable. Together we can make a
            lasting change for our environment
          </p>

          <Link to="/register">
            <button className="btn bg-linear-to-r from-green-600 to-[#00549F] text-white hover:opacity-90 transition-all">
              Join as Volunteer
            </button>
          </Link>
        </motion.div>

        <motion.div
          className="lg:w-1/2 flex justify-center"
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          <img
            src={cleanImg}
            alt="Volunteer cleaning drive"
            className="max-w-md w-full rounded-2xl"
          />
        </motion.div>
      </div>
    </section>
  );
};

export default JoinCleanDrive;
