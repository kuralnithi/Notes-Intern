import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addTask, deleteTask, getTask, updateTask } from "./Features/TaskSlice";
import { v4 as uuidv4 } from "uuid";
import "./TasksPage.css";
import { faEdit, faTrashCan } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Link } from "react-router-dom";
function TasksPage() {
  const [taskText, setTaskText] = useState("");
  const [taskTitle, setTaskTitle] = useState("");
  const taskList = useSelector((state) => state.tasks);
  let [isdisplay, setIsdisplay] = useState(false);
  const [taskDate, setTaskDate] = useState("");
  const [taskTime, setTaskTime] = useState("");
  const [emailid, setEmailid] = useState("kuralnithi1999@gmail.com");
  const [taskId, setTaskId] = useState("");
  const [taskCompleted, setTaskCompleted] = useState("");

  const [editmode, setEditmode] = useState(false);

  const dispatch = useDispatch();
const  username = useSelector(state=> state.user.username)
const  userEmail = useSelector(state=> state.user.emailid)
const  loggedin = useSelector(state=> state.user.login)

const taskref = useRef(null)
  const handleTaskTextChange = (e) => {
    setTaskText(e.target.value);
  };
  
  const handleTaskTitleChange = (e) => {
    setTaskTitle(e.target.value);
  };

  const handleTaskDate = (e) => {
    setTaskDate(e.target.value);
  };

  const handleTaskTime = (e) => {
    setTaskTime(e.target.value);
  };

  const handleAddTask = () => {
    if (taskText.length == 0 && taskTitle.length == 0) {
      setIsdisplay(true);
      setTimeout(() => {
        setIsdisplay(false);
      }, 2000);
   
    }

    if (taskText.trim() !== "" || taskTitle.trim() !== "") {
      const newTask = {
        id: uuidv4(),
        title: taskTitle,
        text: taskText,
        taskdate: taskDate,
        time: taskTime,
        emailid: userEmail,
        completed: 0,
      };

      dispatch(addTask(newTask));
      setTaskText("");
      setTaskTitle("");
      taskadd()
      taskRemainder()
    }
  };

  const handleDeleteTask = (id, emailid) => {
    dispatch(deleteTask({ id, emailid }));
    taskdelete()
    taskRemainder()

  };

  const handleEditTask = (taskId, emailid, completed) => {
    setTaskId(taskId);
    const Task = {
      id: taskId,
      emailid: emailid,
      // title: taskTitle,
      // text: taskText,
      // taskdate: taskDate,
      // time: taskTime,
      completed: completed,
    };

    if (editmode === true) setEditmode(false);
    if (editmode === false) setEditmode(true);

    dispatch(updateTask(Task));
    taskref.current.focus();  

  };
  const handleEditBtn = () => {
    const Task = {
      id: taskId,
      emailid: emailid,
      title: taskTitle,
      text: taskText,
      taskdate: taskDate,
      time: taskTime,
    };

    if (editmode === true) setEditmode(false);
    if (editmode === false) setEditmode(true);

    dispatch(updateTask(Task));
    taskupdated()
    taskRemainder()

  };
  const handleCancelBtn = () =>{

    if (editmode === true) setEditmode(false);
    if (editmode === false) setEditmode(true);
  
   }

  useEffect(() => {
    dispatch(getTask({ emailid: emailid }));
  }, []);

  const taskadd = () => toast("Task Added successfully");
  const taskdelete = () => toast("Task Removed successfully");
  const taskcompleted = () => toast("Task marked as Completed");
  const taskpending = () => toast("Task marked as pending");
  const taskupdated = () => toast("Task updated successfully");
  const taskRemainder = () => toast("Task Remainder mail send to " + emailid);



  return (
    <div className="Tasks container-fluid">
      <div className="mt-5  addnotebox container-fluid TasksPage  ">
        <div className="task-container "  id="task">
          {editmode ? <h1>Edit a Task</h1> : <h1>Add a Task</h1>}
          <div className="input-container d-flex flex-column">
            <input  ref={taskref}
              className="taskinp"
              type="text"
              placeholder="Task Title"
              value={taskTitle}
              onChange={handleTaskTitleChange}
            />
            <input
              className="taskinp"
              type="text"
              placeholder="Task Description"
              value={taskText}
              onChange={handleTaskTextChange}
            />
            <input
              className="taskinp"
              type="date"
              placeholder="Set Remainder"
              value={taskDate}
              onChange={handleTaskDate}
            />
            <input
              className="taskinp"
              type="time"
              placeholder="Set Remainder"
              value={taskTime}
              onChange={handleTaskTime}
            />
            {editmode ? (
             <> <button
                className="taskbtn mt-3"
                onClick={() => {
                  handleEditBtn(taskId, taskCompleted);
                }}
              >
                Edit
              </button>
              <button
                className="taskbtn mt-3"
                onClick={() => {
                  handleCancelBtn();
                }}
              >
                cancel
              </button></>
            ) : (
              <button className="taskbtn mt-3" onClick={handleAddTask}>
                Add
              </button>
            )}{" "}
            <span
              style={{ display: isdisplay ? "block" : "none" }}
              className="text-danger"
            >
              Give input
            </span>
          </div>
        </div>
      </div>

      <h1 className="mt-5 mynotes">My Tasks</h1>

      <div className="TasksList container-fluid mt-5 py-3">
        {taskList.length > 0 && loggedin ? (
          taskList.map((task) => {
            console.log("eee",userEmail==task.emailid);


            if(task.emailid === userEmail){
            return( 
            <div key={task.id} className="mt-4 task-item">
              <div
                className={`task-checkbox  ${
                  task.completed == 0 ? "" : "checked"
                }`}
                onClick={
                  task.completed == 0 
                    ? () =>
                        dispatch(
                          updateTask({
                            id: task.id,
                            completed: 1,
                            emailid: task.emailid,
                          })
                        )
                    : () =>
                        dispatch(
                          updateTask({
                            id: task.id,
                            completed: 0,
                            emailid: task.emailid,
                          })
                        )
                }
              >
{console.log(task.id)}

              </div>
              <div
                style={{
                  "text-decoration": task.completed == 1 ? "line-through" : "",
                }}
                className="task-content"
              >
                <h3>{task.title}</h3>

                <p className="my-2  ">{`deadline :${task.taskdate} ${task.time} `}</p>
              </div>

              <div
                style={{
                  "text-decoration": task.completed == 1 ? "line-through" : "",
                }}
                className="task-content"
              >
                {" "}
                <p>{task.text}</p>
              </div>

              <div className="edit-delete-deadline d-flex flex-column justify-content-center  gap-2">
                <Link to="#task"
                  className="delete-button  "
                  onClick={() =>
                    handleEditTask(task.id, task.emailid, task.completed)
                  }
                >
                  <FontAwesomeIcon icon={faEdit} />
                </Link>

                <div
                  className="delete-button  "
                  onClick={() => handleDeleteTask(task.id, emailid)}
                >
                  <FontAwesomeIcon icon={faTrashCan} />
                </div>
              </div>
            </div>)}
})
        ) : (
          <div className="no-tasks-message ">No tasks added</div>
        )}
      </div>
      <div>
        <ToastContainer />
      </div>
    </div>
  );
}

export default TasksPage;
