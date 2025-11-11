import React from "react";
import { FaMapMarkerAlt } from "react-icons/fa";

import { TbCategory2, TbCoinTaka } from "react-icons/tb";
import { Link } from "react-router";

const IssueCard = ({ issue }) => {
  return (
    <div className="bg-white rounded-2xl shadow-md hover:shadow-xl transition duration-300 overflow-hidden border border-gray-100 group flex flex-col">
      {/* Image Section */}
      <div className="relative h-48 overflow-hidden">
        <img
          src={issue.image}
          alt={issue.title}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
        />
        {/* <div className="absolute inset-0 bg-black bg-opacity-30 group-hover:bg-opacity-50 transition-all"></div> */}
      </div>

      {/* Content */}
      <div className="p-5 flex flex-col grow">
        <div className="grow">
          <h3 className="text-xl font-semibold text-gray-800 mb-2 line-clamp-1">
            {issue.title}
          </h3>
          {/* <p className="text-gray-600 text-sm mb-4 line-clamp-2">
            {issue.description}
          </p> */}

          {/* Category and Location */}
          <div className=" text-gray-500 text-sm mb-3">
            <span className="flex items-center gap-1">
              <TbCategory2 className="text-green-500 text-xl" />
              {issue.category}
            </span>
            <span className="flex items-center gap-1 mt-2">
              <FaMapMarkerAlt className="text-red-500 text-xl" />
              {issue?.location || "Unknown"}
            </span>
          </div>
          <p className="text-sm text-gray-500  mb-2 flex items-center gap-1">
            {" "}
            <TbCoinTaka className="text-primary text-xl" />
            Amount:{" "}
            <span className="font-bold text-primary">{issue.amount}</span>
          </p>
        </div>

        {/* Details Button */}
        <Link
          to={`/issues/${issue._id}`}
          className="mt-auto  btn btn-outline btn-primary block text-center text-primary hover:text-white py-2 rounded-full font-medium transition-colors duration-300"
        >
          See Details
        </Link>
      </div>
    </div>
  );
};

export default IssueCard;
