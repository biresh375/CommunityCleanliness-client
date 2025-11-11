import React, { useEffect, useState, use } from "react";
import { useParams } from "react-router";

import { FaMapMarkerAlt } from "react-icons/fa";

import Swal from "sweetalert2";
import { AuthContext } from "../Context/AuthContext";
import Container from "../Components/Container/Container";
import { TbCategory2 } from "react-icons/tb";
import Loading from "../Components/Loading/Loading";

const IssueDetails = () => {
  const { id } = useParams();
  const { user } = use(AuthContext);
  const [issue, setIssue] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [contributions, setContribution] = useState([]);
  console.log(id);

  useEffect(() => {
    setLoading(true);
    fetch(`http://localhost:3000/allIssues/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setIssue(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error loading issue:", err);
        setLoading(false);
      });
  }, [id]);

  useEffect(() => {
    setLoading(true);
    fetch(`http://localhost:3000/issue/contribution/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setContribution(data);

        setLoading(false);
      })
      .catch((err) => {
        console.error("Error loading issue:", err);
        setLoading(false);
      });
  }, [id]);

  const handlePayment = (e) => {
    e.preventDefault();
    const form = e.target;
    const issueId = issue._id;
    const title = form.title.value;
    const amount = form.amount.value;
    const name = form.contributorname.value;
    const image = user.photoURL;
    const email = user.email;
    const phone = form.phone.value;
    const address = form.address.value;
    const additionalInfo = form.additionalInfo.value;
    const date = new Date().toLocaleDateString();
    const newcontribution = {
      title,
      amount,
      name,
      email,
      phone,
      address,
      additionalInfo,
      date,
      image,
      issueId,
    };
    fetch("http://localhost:3000/contribution", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(newcontribution),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.insertedId) {
          newcontribution._id = data.insertedId;
          const submitContribution = [newcontribution, ...contributions];
          setContribution(submitContribution);
          Swal.fire({
            title: "Thank You!",
            text: "Your contribution has been recorded successfully 💚",
            icon: "success",
            confirmButtonColor: "#16a34a",
          });
          setShowModal(false);
        }
      });
  };

  if (loading) return <Loading></Loading>;

  return (
    <Container>
      <div className=" mx-auto py-10 px-5 md:px-2.5 lg:px-0 ">
        {/* Header */}
        <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-5">
          {issue?.title}
        </h1>

        {/* Image */}
        <div className="rounded-xl overflow-hidden shadow-md mb-6">
          <img
            src={issue?.image}
            alt={issue?.title}
            className="w-full h-64 object-cover"
          />
        </div>

        {/* Info Section */}
        <div className="space-y-4 mb-8">
          <p className="flex items-center gap-2 text-gray-700">
            <TbCategory2 className="text-green-600 text-xl" />{" "}
            <span className="font-medium">Category:</span> {issue?.category}
          </p>

          <p className="flex items-center gap-2 text-gray-700">
            <FaMapMarkerAlt className="text-red-600 text-xl" />{" "}
            <span className="font-medium">Location:</span> {issue?.location}
          </p>

          <p className="text-gray-700">
            <span className="font-medium">Description:</span>{" "}
            {issue?.description}
          </p>

          <p className="text-gray-700">
            <span className="font-medium">Date:</span>{" "}
            {new Date(issue?.date).toLocaleDateString()}
          </p>

          <p className="text-gray-700">
            <span className="font-medium">Estimated Clean-Up Cost:</span>{" "}
            <span className="text-primary font-semibold">
              ৳ {issue?.amount || 0}
            </span>
          </p>
        </div>

        {/* Pay Button */}
        <div className="text-center">
          <button
            onClick={() => setShowModal(true)}
            className="btn btn-primary btn-outline text-primary hover:text-white px-6 py-3 rounded-full font-semibold  transition-all"
          >
            Pay Clean-Up Contribution
          </button>
        </div>

        {/* Modal */}
        {showModal && (
          <div className="fixed inset-0 bg-[#b0b8b886]  flex justify-center items-center z-50">
            <div className="bg-white rounded-2xl shadow-lg p-6 w-11/12 md:w-1/3 relative">
              <button
                onClick={() => setShowModal(false)}
                className="absolute top-2 right-3 text-gray-400 hover:text-gray-600 text-xl"
              >
                ✕
              </button>

              <form onSubmit={handlePayment} className="space-y-2.5">
                <h2 className="text-2xl font-semibold text-gray-800 mb-4 text-center">
                  Contribute to Cleaning
                </h2>

                <label className="text-gray-700 mb-4 text-center">
                  You're supporting the clean-up of:{" "}
                </label>
                <input
                  className="input mt-1 w-full font-medium text-primary"
                  defaultValue={issue?.title}
                  name="title"
                  readOnly
                />
                <label className="text-gray-700">Enter amount ৳:</label>
                <input
                  required
                  name="amount"
                  type="number"
                  placeholder="Enter amount (৳)"
                  className="input mt-1  w-full mb-4"
                  defaultValue={issue?.amount || ""}
                />
                <label className="text-gray-700">Contributor Name</label>
                <input
                  required
                  name="contributorname"
                  type="text"
                  placeholder="Enter Your Name"
                  className="input mt-1  w-full mb-4"
                  defaultValue={user?.displayName}
                />
                <label className="text-gray-700">Phone Number</label>
                <input
                  required
                  name="phone"
                  type="number"
                  placeholder="Enter Your Phone Number"
                  className="input mt-1  w-full mb-4"
                />
                <label className="text-gray-700">Address</label>
                <input
                  required
                  name="address"
                  type="text"
                  placeholder="Enter Your Address"
                  className="input mt-1  w-full mb-4"
                />
                <label className="text-gray-700">
                  Additional info - (if needed)
                </label>
                <input
                  name="additionalInfo"
                  type="text-area"
                  placeholder="optional"
                  className="input mt-1  w-full mb-4"
                />

                <button
                  type="submit"
                  className="w-full bg-green-600 text-white py-2 rounded-full hover:bg-green-700 transition-colors"
                >
                  Confirm Payment
                </button>
              </form>
            </div>
          </div>
        )}
        <div className="divider mt-10"></div>
      </div>
      <div className="overflow-x-auto">
        <table className="table">
          {/* head */}
          <thead>
            <tr>
              <th>SN</th>
              <th>contributor’s image</th>
              <th>name</th>
              <th>contribution amount</th>
            </tr>
          </thead>
          <tbody>
            {/* row 1 */}
            {contributions.map((contribution, index) => (
              <tr key={contribution._id}>
                <th>{index + 1}</th>
                <td>
                  <div className="flex items-center gap-3">
                    <div className="avatar">
                      <div className="mask mask-squircle h-12 w-12">
                        <img
                          src={contribution.image}
                          alt={contribution.title}
                        />
                      </div>
                    </div>
                  </div>
                </td>
                <td>{contribution.name}</td>
                <td>{contribution.amount}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Container>
  );
};

export default IssueDetails;
