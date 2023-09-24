import React, { useEffect, useState } from "react";
import "./Home.css";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const Home = () => {
  const [textField, setTextField] = useState("");
  const currentUser = useSelector((state) => state.userDataDetails.userDetails);
  console.log("currentUser", currentUser);
  const allPreviousUser = useSelector(
    (state) => state.userDataDetails.allUsersDetails
  );
  console.log("allPreviousUser", allPreviousUser);
  const [showMessage, setShowMessage] = useState(false);
  const [storeTxt, setStoreTxt] = useState("");
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate("/");
  };

  const handleSubmit = () => {
    setStoreTxt(textField);
    setShowMessage(true);
    setTextField("");
  };

  useEffect(() => {
    getDetails();
  }, []);

  const getDetails = async () => {
    let result = await fetch(`${process.env.REACT_APP_SERVER_DOMIN}/details`);
    result = await result;
    console.log(result);
  };
  return (
    <>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {allPreviousUser.length > 0 ? (
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Mobile</th>
                <th>LoginTime</th>
              </tr>
            </thead>
            {allPreviousUser.map((data) => (
              <tbody>
                <tr>
                  <td>{data.name}</td>
                  <td>{data.email}</td>
                  <td>{data.mobileNo}</td>
                  <td>{data.time}</td>
                </tr>
              </tbody>
            ))}
          </table>
        ) : (
          <div>
            <div
              style={{
                marginTop: "20px",
              }}
            >
              <h1>Welcome {currentUser?.name}</h1>
              <button
                style={{ width: "60px", height: "35px" }}
                onClick={handleLogout}
              >
                Logout
              </button>
              <div
                style={{
                  marginTop: "20px",
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <textarea
                  id="w3review"
                  rows="4"
                  cols="50"
                  value={textField}
                  onChange={(e) => setTextField(e.target.value)}
                ></textarea>
                <button style={{ marginTop: "20px" }} onClick={handleSubmit}>
                  Submit
                </button>
              </div>
            </div>

            {currentUser.email && showMessage === true && (
              <div
                style={{
                  border: "1px solid blue",
                  marginTop: "15px",
                  display: "flex",
                  justifyContent: "center",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                <p>name:{currentUser.name}</p>
                <br />
                <p>email:{currentUser.email}</p>
                <br />
                <p>mobileNo: {currentUser.mobileNo}</p>
                <br />
                <p>time:{currentUser.time}</p>
                <br />
                <p>message:{storeTxt}</p>
              </div>
            )}
          </div>
        )}
      </div>
    </>
  );
};

export default Home;
