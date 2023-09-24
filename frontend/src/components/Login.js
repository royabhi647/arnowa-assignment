import React, { useState } from "react";
import styles from "./Login.module.css";
import { useNavigate } from "react-router-dom";
import { currentUser } from "../redux/Features/userDataSlice";
import { allUsersData } from "../redux/Features/userDataSlice";
import { useDispatch } from "react-redux";

const Login = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [mobileNo, setMobileNo] = useState("");

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const time = new Date();
    const fetchData = await fetch(
      `${process.env.REACT_APP_SERVER_DOMIN}/login`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email, mobileNo, time }),
      }
    );

    const dataRes = await fetchData.json();
    console.log(dataRes);
    if (dataRes.data) {
      dispatch(currentUser(dataRes.data));
    } else if (dataRes.allUsers) {
      dispatch(allUsersData(dataRes.allUsers));
    }

    if (dataRes.alert == true || dataRes.allUsers) {
      navigate("/home");
    }
  };
  return (
    <div className={styles.container}>
      <div className={styles.innerBox}>
        <h1 className={styles.heading}>Login</h1>

        <input
          type="text"
          placeholder="Enter Your Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className={styles.inputField}
        />
        <input
          type="text"
          placeHolder="Enter email address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className={styles.inputField}
        />
        <input
          type="text"
          placeHolder="Enter your mobile number"
          value={mobileNo}
          onChange={(e) => setMobileNo(e.target.value)}
          className={styles.inputField}
        />

        <div className={styles.footer}>
          <button onClick={handleSubmit}>Submit</button>
        </div>
      </div>
    </div>
  );
};

export default Login;
