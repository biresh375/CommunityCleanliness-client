import React, { useEffect, useState } from "react";
import { Link } from "react-router";
import { FaMapMarkerAlt } from "react-icons/fa";
import { MdCategory } from "react-icons/md";
import Loading from "../Loading/Loading";
import IssueCard from "../IssueCard/IssueCard";

const RecentComplaints = () => {
  const [issues, setIssues] = useState([]);

  // Fetch latest 6 issues from MongoDB
  useEffect(() => {
    fetch("http://localhost:3000/issues")
      .then((res) => res.json())
      .then((data) => setIssues(data))
      .catch((err) => console.error("Error fetching issues:", err));
  }, []);

  return (
    <section className="py-10">
      <div>
        <h2 className="text-2xl md:text-3xl font-bold text-center text-gray-800 mb-5">
          Recent <span className="text-primary">Complaints</span>
        </h2>

        {issues.length === 0 ? (
          <Loading></Loading>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {issues.map((issue) => (
              <IssueCard key={issue._id} issue={issue}></IssueCard>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default RecentComplaints;
