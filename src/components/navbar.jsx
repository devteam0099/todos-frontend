import { NavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlus,
  faDisplay,
  faUser,
  faUserPlus,
} from "@fortawesome/free-solid-svg-icons";
import { toggleTheme } from "../hooks/todoSlice";
import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";

const Navbar = () => {
  const [showDetails, setShowDetails] = useState(false);
  const [currentButton, setCurrentButton] = useState(false);
  const dispatch = useDispatch();
  const login = useSelector((state) => state.loginReducer.userDetails);

  function toggleButton(e) {
    e.preventDefault();
    setCurrentButton(!currentButton);
  }
  dispatch(toggleTheme(currentButton));

  return (
    <>
      <nav className="bg-orange-200 relative text-black">
        <div className="flex justify-around">
          <div
            className={
              login
                ? "mt-4  px-2 h-6 rounded bg-orange-500 font-bold text-center cursor-pointer"
                : "mt-4 w-[100px] h-6 rounded bg-gray-500/[0.2] font-bold text-gray-500 text-center"
            }
            onClick={() => {
              setShowDetails(!showDetails);
            }}
          >
            {login ? login.name : "Guest User"}
          </div>

          <div className="text-center w-[400px] text-4xl font-bold p-1">
            <h1>To-do List</h1>
          </div>

          <div className="flex  w-[400px] justify-around">
            <div className="flex flex-col text-center">
              <NavLink
                to="/AddTodos"
                className={({ isActive }) =>
                  isActive ? "bg-orange-500 rounded p-1" : "rounded p-1"
                }
              >
                <FontAwesomeIcon icon={faPlus} />
                <h3 className="text-bold">Add Todos</h3>
              </NavLink>
            </div>
            <div className="flex flex-col text-center">
              <NavLink
                to="/ViewTodos"
                className={({ isActive }) =>
                  isActive ? "bg-orange-500 rounded p-1" : "rounded p-1"
                }
              >
                <FontAwesomeIcon icon={faDisplay} className="text-xl" />
                <h3>View Todos</h3>
              </NavLink>
            </div>
            <div className="flex flex-col text-center">
              <NavLink
                to="/Login"
                className={({ isActive }) =>
                  isActive ? "bg-orange-500 rounded p-1" : "rounded p-1"
                }
              >
                <FontAwesomeIcon icon={faUser} />
                <h3 className="text-bold">Login</h3>
              </NavLink>
            </div>
            <div className="flex flex-col text-center">
              <NavLink
                to="/Signup"
                className={({ isActive }) =>
                  isActive ? "bg-orange-500 rounded p-1" : "rounded p-1"
                }
              >
                <FontAwesomeIcon icon={faUserPlus} />
                <h3 className="text-bold">Signup</h3>
              </NavLink>
            </div>
          </div>
          <button onClick={toggleButton}>{currentButton ? "🌙" : "☀︎"}</button>
        </div>
      </nav>
      {login && showDetails && (
        <div className="text-white bg-black text center rounded w-[20%] absolute m-2">
          <div className="text-center p-2">loggedin as : {login.username}</div>
          <div className="text-center p-2">name : {login.name}</div>
        </div>
      )}
    </>
  );
};
export default Navbar;
