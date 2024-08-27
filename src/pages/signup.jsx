import { useState } from "react";
import axios from "axios";

const Signup = () => {
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [name, setName] = useState("");
  const [profilePicture, setProfilePicture] = useState(null);
  const [mail,setMail] = useState("")

  async function signupHandler(e) {
    e.preventDefault();
    if (name === "" || username === "" || password === "") {
      alert("please fill name , username and password in order to proceed");
    } else {
      try {
        const formData = new FormData();
        formData.append("name", name);
        formData.append("username", username);
        formData.append("password", password);
        formData.append('mail',mail)
        formData.append("profilePicture", profilePicture);
        const resp = await axios.post(
          "http://localhost:3000/api/signup/register-user",
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
        alert(resp.data.message);
      } catch (error) {
        console.log(error);
        alert("axios request failed");
      }
    }
  }

  return (
    <>
      <form
        className="min-h-[80vh]"
        encType="multipart/form-data"
        method="POST"
      >
        <div className="flex flex-col border-orange-500 border-2 h-[550px] w-[450px] mx-auto rounded justify-between mt-[5%]">
          <h1 className="text-center mt-[0%] font-bold text-4xl bg-orange-500 p-4">
            Signup Form
          </h1>
          <div className="text-center">
            <h1 className="font-bold text-xl mb-2 ">Enter full name</h1>
            <input
              className="border-2 border-orange-500 rounded w-[300px] h-[40px] text-center text-black "
              type="text"
              maxLength="20"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
              }}
            />
          </div>
          <div className="text-center">
            <h1 className="font-bold text-xl mb-2 ">Enter Email</h1>
            <input
              className="border-2 border-orange-500 rounded w-[300px] h-[40px] text-center text-black "
              type="text"
              value={mail}
              onChange={(e) => {
                setMail(e.target.value);
              }}
            />
          </div>
         
          <div className="text-center">
            <h1 className="font-bold text-xl mb-2 ">Enter username</h1>
            <input
              className="border-2 border-orange-500 rounded w-[300px] h-[40px] text-center text-black"
              type="email"
              maxLength="20"
              value={username}
              onChange={(e) => {
                setUsername(e.target.value);
              }}
            />
          </div>
          <div className="text-center">
            <h1 className="font-bold text-xl mb-2">Enter Password</h1>
            <input
              className="border-2 border-orange-500 rounded w-[300px] h-[40px] text-center text-black"
              type="password"
              maxLength="20"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />
          </div>
          <div className="text-center">
            <h1 className="font-bold text-xl mb-2">Enter Profile picture</h1>
            <input
              className="border-2 border-orange-500 rounded w-[300px] h-[40px] text-center text-black"
              type="file"
              onChange={(e) => {
                setProfilePicture(e.target.files[0]);
              }}
            />
          </div>
          <button
            className="mb-4 p-2 rounded font-bold bg-orange-500 w-[120px] mx-auto"
            onClick={signupHandler}
          >
            Signup
          </button>
        </div>
      </form>
    </>
  );
};
export default Signup;
