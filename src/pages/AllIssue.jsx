import React, { use, useEffect } from "react";
import { AuthContext } from "../Context/AuthContext";
import IssueCard from "../Components/IssueCard/IssueCard";
import Container from "../Components/Container/Container";
import Loading from "../Components/Loading/Loading";
import { Helmet } from "react-helmet";

const AllIssue = () => {
  const { issues, setIssues } = use(AuthContext);

  // Fetch latest 6 issues from MongoDB
  useEffect(() => {
    fetch("https://community-cleanliness-server-three.vercel.app/allIssues")
      .then((res) => res.json())
      .then((data) => setIssues(data))
      .catch((err) => console.error("Error fetching issues:", err));
  }, [setIssues]);

  return (
    <Container>
      <Helmet>
        <meta charSet="utf-8" />
        <title>All Issues |communitycleanliness</title>
        <link rel="canonical" href="http://mysite.com/example" />
      </Helmet>
      <section className="py-10">
        <div>
          <h2 className="text-2xl md:text-3xl font-bold  text-green-600 mb-5">
            All <span className="text-primary">Issues :</span>
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
    </Container>
  );
};

export default AllIssue;
