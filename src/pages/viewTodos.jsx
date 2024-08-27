import DisplayTodos from "../components/displayTodos";
import { useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";
import axios from "axios";
const ViewTodos = () => {
  const [todosList, setTodosList] = useState([]);
  const [renderPage, setRenderPage] = useState(false);
  const data = useSelector((state) => state.loginReducer.userDetails);

  const [controlButton, setControlButton] = useState(false);
  const [editedTodo, setEditedTodo] = useState();
  useEffect(() => {
    (async () => {
      if (data) {
        const resp = await axios.get(
          "http://localhost:3000/api/get-todos/get-data",
          { params: { user: data?.username } }
        );
        resp.data.message
          ? alert(resp.data.message)
          : setTodosList([...todosList, ...resp.data]);
      }
    })();
  }, []);

  function editTodoMember(element) {
    const confirmation = confirm("are you sure to want to edit todo ? ");
    if (confirmation) {
      setEditedTodo(element);
      setControlButton(true);
    }
  }

  async function completedTodos(completeId) {
    try {
      const resp = await axios.patch(
        "http://localhost:3000/api/complete-todos/complete-data",
        { completeId }
      );
      alert(resp.data.message);
      setRenderPage(!renderPage);
    } catch (error) {
      alert("could not mark todo as completed");
    }
  }

  async function deleteTodo(deleteId) {
    try {
      const resp = await axios.delete(
        "http://localhost:3000/api/delete-todos/delete-data",
        { params: { deleteId } }
      );
      alert(resp.data.message);
      setRenderPage(!renderPage);
    } catch (error) {
      alert("delete request failed");
    }
  }

  console.log(todosList);

  if (controlButton) {
    return <Navigate to="/editTodos" state={editedTodo} />;
  }

  return (
    <DisplayTodos
      todos={todosList}
      editTodos={editTodoMember}
      deleteTodo={deleteTodo}
      completedTodos={completedTodos}
    />
  );
};

export default ViewTodos;
