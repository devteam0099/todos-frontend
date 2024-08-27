import Navbar from "./components/navbar.jsx";
import AddTodos from "./pages/addTodos.jsx";
import ViewTodos from "./pages/viewTodos.jsx";
import Login from "./pages/login.jsx";
import Signup from "./pages/signup.jsx";
import EditTodos from "./pages/editTodos.jsx";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { DataProvider } from "./hooks/contextApi.js";
import { useState } from "react";

const Main = () => {
  const [todoData, setTodoData] = useState([]);
  return (
    <>
      <DataProvider value={{ todoData, setTodoData }}>
        <BrowserRouter>
          <Navbar />
          <Routes>
            <Route path="/AddTodos" element={<AddTodos />} />
            <Route path="/ViewTodos" element={<ViewTodos />} />
            <Route path="/Login" element={<Login />} />
            <Route path="/Signup" element={<Signup />} />
            <Route path="/editTodos" element={<EditTodos></EditTodos>} />
          </Routes>
        </BrowserRouter>
      </DataProvider>
    </>
  );
};
export default Main;
