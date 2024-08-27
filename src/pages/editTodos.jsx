import { useState } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";

const EditTodos = () => {
  const [todoName, setTodoName] = useState("");
  const [todoDescription, setTodoDescription] = useState("");
  const [todoImage, setTodoImage] = useState(null);
  const location = useLocation();
  const id = location.state;

  async function editTodo(e) {
    e.preventDefault();
    const formData = new FormData();
    formData.append("todoName", todoName);
    formData.append("todoDescription", todoDescription);
    formData.append("todoImage", todoImage);
    formData.append("id", id);
    const resp = await axios.put(
      "http://localhost:3000/api/edit-todos/edit-data",
      formData
    );
    alert(resp.data.message);
  }

  return (
    <>
      <div className="min-h-[75vh]">
        <form encType="multipart/form-data" method="POST">
          <div className="flex flex-col border-orange-500 border-2 h-[400px] w-[450px] mx-auto rounded justify-between mt-[7%]">
            <h1 className="text-center mt-[0%] font-bold text-4xl bg-orange-500 p-4">
              Edit todos
            </h1>
            <div className="text-center">
              <h1 className="font-bold text-xl mb-2">Enter Todo Name</h1>
              <input
                className="border-2 border-orange-500 rounded w-[300px] h-[40px] text-black "
                type="text"
                maxLength="20"
                value={todoName}
                onChange={(e) => {
                  setTodoName(e.target.value);
                }}
              />
            </div>
            <div className="text-center">
              <h1 className="font-bold text-xl mb-2">Enter Todo Description</h1>
              <textarea
                className="border-2 border-orange-500 rounded w-[300px] h-[80px] text-black"
                maxLength="80"
                value={todoDescription}
                onChange={(e) => {
                  setTodoDescription(e.target.value);
                }}
              />
            </div>
            <div className="text-center">
              <h1 className="font-bold text-xl mb-2">Enter Todo Image</h1>
              <input
                className="border-2 border-orange-500 rounded w-[300px] h-[40px] text-black mb-2 "
                type="file"
                onChange={(e) => {
                  setTodoImage(e.target.files[0]);
                }}
              />
            </div>
            <div className="text-center"></div>
            <button
              className="mb-4 p-2 rounded font-bold bg-orange-500 w-[120px] mx-auto"
              onClick={editTodo}
            >
              Edit todos
            </button>
          </div>
        </form>
      </div>
    </>
  );
};
export default EditTodos;
