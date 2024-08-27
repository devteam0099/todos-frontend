import { useState } from "react";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import axios from "axios";

const AddTodos = () => {
  const [name, setname] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState();
  const isLoggedIn = useSelector((state) => state.loginReducer.userDetails);

  async function todo(e) {
    e.preventDefault();
    if (!image) {
      alert("Please select an image");
      return;
    }
    const data = new FormData();
    data.append("name", name);
    data.append("description", description);
    data.append("image", image);
    data.append("username", isLoggedIn.username);
    try {
      const response = await axios.post(
        "http://localhost:3000/api/save-todos/save-data",
        data,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      alert(response.data.message);
    } catch (error) {
      alert("todo did not saved");
    }
  }

  //checks if user is not loggedin navigate to login page
  if (!isLoggedIn) {
    return <Navigate to="/login" />;
  }

  return (
    <>
      <div className="min-h-[75vh]">
        <form encType="multipart/form-data" method="POST">
          <div className="flex flex-col border-orange-500 border-2 h-[400px] w-[450px] mx-auto rounded justify-between mt-[7%]">
            <h1 className="text-center mt-[0%] font-bold text-4xl bg-orange-500 p-4">
              Add todos
            </h1>
            <div className="text-center">
              <h1 className="font-bold text-xl mb-2">Enter Todo Name</h1>
              <input
                className="border-2 border-orange-500 rounded w-[300px] h-[40px] text-black "
                type="text"
                maxLength="20"
                value={name}
                onChange={(e) => {
                  setname(e.target.value);
                }}
              />
            </div>
            <div className="text-center">
              <h1 className="font-bold text-xl mb-2">Enter Todo Description</h1>
              <textarea
                className="border-2 border-orange-500 rounded w-[300px] h-[80px] text-black"
                maxLength="80"
                value={description}
                onChange={(e) => {
                  setDescription(e.target.value);
                }}
              />
            </div>
            <div className="text-center">
              <h1 className="font-bold text-xl mb-2">Enter Todo Name</h1>
              <input
                className="border-2 border-orange-500 rounded w-[300px] h-[40px] text-black mb-2 "
                type="file"
                onChange={(e) => {
                  setImage(e.target.files[0]);
                }}
              />
            </div>
            <div className="text-center"></div>
            <button
              className="mb-4 p-2 rounded font-bold bg-orange-500 w-[120px] mx-auto"
              onClick={todo}
            >
              Add todos
            </button>
          </div>
        </form>
      </div>
    </>
  );
};
export default AddTodos;
