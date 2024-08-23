import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { putLoginDetaild } from "../../hooks/todoSlice";
import axios from "axios";
//localStorage.clear()
const Login = () => {
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const dispatch = useDispatch();
  const state = useSelector((state) => state.loginReducer);
  console.log(state);

  async function loginHandler(e) {
    e.preventDefault();
    alert("submitted login details");
    //take authantication headers on localstorage if found
    const header = localStorage.getItem("auth");
    console.log(header);
    try {
      const resp = await axios.post(
        "http://localhost:3000/api/login/auth-user",
        {
          username,
          password,
        },
        {
          headers: {
            Authorization: header,
          },
        }
      );
      //checks the response type sent by server and process accordingly
      if (resp.data.message) {
        alert(resp.data.message);
      } else if (resp.data.auth) {
        dispatch(putLoginDetaild(resp.data.auth));
      } else {
        localStorage.setItem("auth", resp.data.token);
        dispatch(putLoginDetaild(resp.data.user));
      }
    } catch (error) {
      alert("could not validate login request");
    }
  }

  return (
    <>
      <form className="min-h-[75vh]">
        <div className="flex flex-col border-orange-500 border-2 h-[400px] w-[450px] mx-auto rounded justify-between mt-[7%]">
          <h1 className="text-center mt-[0%] font-bold text-4xl bg-orange-500 p-4">
            Login Form
          </h1>
          <div className="text-center">
            <h1 className="font-bold text-xl mb-2">Enter username</h1>
            <input
              className="border-2 border-orange-500 rounded w-[300px] h-[40px] text-center text-black "
              type="text"
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
              maxLength="100"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />
          </div>
          <button
            className="mb-4 p-2 rounded font-bold bg-orange-500 w-[120px] mx-auto"
            onClick={loginHandler}
          >
            Login
          </button>
        </div>
      </form>
    </>
  );
};
export default Login;
