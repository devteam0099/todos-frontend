import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrashCan } from "@fortawesome/free-regular-svg-icons";
import { useSelector } from "react-redux";
import { useState ,useEffect} from "react";
import { Navigate } from "react-router-dom";
import axios from 'axios'
const ViewTodos = () => {
  const [todos,setTodos] = useState([])
  const [renderPage,setRenderPage] = useState(false)
const data = useSelector(state => state.loginReducer.userDetails)
  
  const [controlButton, setControlButton] = useState(false);
  const [editedTodo, setEditedTodo] = useState();
  useEffect(()=>{
    ;(
      async()=>{
        if (data) {
          const resp = await axios.get('http://localhost:3000/api/get-todos/get-data',{params : {user : data?.username}})
          resp.data.message? alert(resp.data.message) :  setTodos([...todos,...resp.data]) 
        }
      }
    )()
  },[])
  
  function editTodoMember(element) {
    const confirmation = confirm("are you sure to want to edit todo ? ");
    if (confirmation) {
      setEditedTodo(element);
      setControlButton(true);
    }
  }

  async function completedTodos(completeId){
         try {
          const resp = await axios.patch('http://localhost:3000/api/complete-todos/complete-data',{completeId})
          alert(resp.data.message)
          setRenderPage(!renderPage)
         } catch (error) {
          alert('could not mark todo as completed')
         }
  }

  async function deleteTodo(deleteId){
        try {
        const resp = await axios.delete('http://localhost:3000/api/delete-todos/delete-data',{params : {deleteId}})
        alert(resp.data.message)
        setRenderPage(!renderPage)
        } catch (error) {
          alert('delete request failed')
        }
  }

  if (controlButton) {
    return <Navigate to="/editTodos" state={editedTodo} />;
  }
  
  return (
    <>
    <div className="min-h-[90vh]">
    {<div className="text-center text-3xl font-bold mt-4">{todos.length > 0 ? "List of Tasks" : "Nothing To Display"}</div>}
    {todos.length > 0 && todos.map((item)=>(
      <div key={item.id} className="p-2 bg-gray-200 m-2 rounded text-black w-[50%] mx-auto ">
        <div className="flex w-[100%] justify-around p-2 bg-gray-200 rounded">
        <div className="h-[80px] w-[80px] border-2 border-black rounded-[50%]  "><img src={item.todoimage} alt="image not found" className="rounded-[50%] h-full w-full " /></div>
      
       <div className="flex justify-between w-[80%] ">
                <div className="flex ">
                  <div className="mt-6 ml-2">{item.completed ? "✅" : ""}</div>
                  <div
                    className={
                      item.completed
                        ? "line-through font-bold ml-10 mt-6"
                        : "font-bold mt-6 ml-10 "
                    }
                  >
                    {item.todoname}
                  </div>
                </div>

                <div className="mr-4  flex align-center">
                  <input
                    type="checkbox"
                    className="text-black"
                    onChange={() => {
                      completedTodos(item.id)
                    }}
                    checked={item.completed}
                  />
                  <FontAwesomeIcon
                    icon={faEdit}
                    onClick={() => {
                      editTodoMember(item.id);
                    }}
                    className="m-6  text-xl font-bold cursor-pointer "
                  />
                  <FontAwesomeIcon
                    icon={faTrashCan}
                    onClick={() => {
                      deleteTodo(item.id)
                    }}
                    className="mt-6 text-red-500 text-xl font-bold cursor-pointer"
                  />
                </div>
              </div>

       </div>
       <div className=" -mt-2 ">
       <div className="font-bold m-2 ">description : </div>
       <div className="bg-white text-center border-2 border-black rounded">{item.tododescription}</div>
       </div>
      </div>
    ))}   
    </div>   </>
  );
};
export default ViewTodos;

