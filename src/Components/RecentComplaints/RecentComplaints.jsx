import React, { use, useEffect } from "react";

import Loading from "../Loading/Loading";
import IssueCard from "../IssueCard/IssueCard";
import { AuthContext } from "../../Context/AuthContext";

const RecentComplaints = () => {
  const { issues, setIssues } = use(AuthContext);

  // Fetch latest 6 issues from MongoDB
  useEffect(() => {
    fetch("https://community-cleanliness-server-three.vercel.app/issues")
      .then((res) => res.json())
      .then((data) => setIssues(data))
      .catch((err) => console.error("Error fetching issues:", err));
  }, [setIssues]);

  return (
    <section className="py-10">
      <div>
        <h2 className="text-2xl md:text-3xl font-bold text-center text-green-600 mb-5">
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
