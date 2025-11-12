import React, { useEffect, useState, use } from "react";
import { useParams } from "react-router";

import { FaMapMarkerAlt } from "react-icons/fa";

import Swal from "sweetalert2";
import { AuthContext } from "../Context/AuthContext";
import Container from "../Components/Container/Container";
import { TbCategory2 } from "react-icons/tb";
import Loading from "../Components/Loading/Loading";
import { Helmet } from "react-helmet";

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
        Swal.fire({
          position: "top-center",
          icon: "success",
          title: `${err.code}`,
          showConfirmButton: false,
          timer: 1500,
        });
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
    const category = issue.category;
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
      category,
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
            position: "top-center",
            icon: "success",
            title: "Your contribution has been recorded successfully 💚",
            showConfirmButton: false,
            timer: 1500,
          });
          setShowModal(false);
        }
      });
  };

  if (loading) return <Loading></Loading>;

  return (
    <Container>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Issue Details | communitycleanliness</title>
        <link rel="canonical" href="http://mysite.com/example" />
      </Helmet>
      <div className=" mx-auto py-10 px-5 md:px-2.5 lg:px-0 ">
        {/* Header */}
        <h1 className="text-2xl md:text-3xl font-bold  mb-5">
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
          <p className="flex items-center gap-2 ">
            <TbCategory2 className="text-green-600 text-xl" />{" "}
            <span className="font-medium">Category:</span> {issue?.category}
          </p>

          <p className="flex items-center gap-2 ">
            <FaMapMarkerAlt className="text-red-600 text-xl" />{" "}
            <span className="font-medium">Location:</span> {issue?.location}
          </p>

          <p className="">
            <span className="font-medium">Description:</span>{" "}
            {issue?.description}
          </p>

          <p className="">
            <span className="font-medium">Date:</span>{" "}
            {new Date(issue?.date).toLocaleDateString()}
          </p>

          <p className="">
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
            className="btn bg-linear-to-r from-green-600 to-[#00549F] text-white px-6 py-3 rounded-full font-semibold  transition-all"
          >
            {/* className="w-full btn-outline btn-primary bg-linear-to-r from-green-600 to-[#00549F] text-white py-3 rounded-full transition-all font-semibold" */}
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
                  className="w-full bg-linear-to-r from-green-600 to-[#00549F] text-white py-2 rounded-full cursor-pointer transition-colors"
                >
                  Confirm Payment
                </button>
              </form>
            </div>
          </div>
        )}
        <div className="divider mt-10"></div>
      </div>
      <div className="pb-10">
        <table className="table w-full">
          <thead className="bg-linear-to-r from-green-600 to-[#00549F] text-white">
            <tr>
              <th>#</th>
              <th>
                <span className="hidden md:block">contributor’s</span> image
              </th>
              <th>name</th>
              <th>
                <span className="hidden md:block"> contribution</span> amount
              </th>
            </tr>
          </thead>
          <tbody>
            {contributions.map((c, index) => (
              <tr key={c._id} className="hover:bg-gray-50">
                <td className="font-medium text-gray-700">{index + 1}</td>
                <td>
                  <div className="mask mask-squircle h-12 w-12">
                    <img src={c.image} alt="Avatar Tailwind CSS Component" />
                  </div>
                </td>
                <td>{c.name}</td>
                <td className="text-primary font-semibold">৳ {c.amount}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Container>
  );
};

export default IssueDetails;
