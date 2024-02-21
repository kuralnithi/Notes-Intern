


import React, { useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import './TasksPage.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useDispatch, useSelector } from 'react-redux';
import { faListCheck, faNoteSticky, faPenClip, faTrashCan } from '@fortawesome/free-solid-svg-icons';
import { deleteNote, getNote } from './Features/NotesSlice';
import { getTask } from './Features/TaskSlice';




function HomePage(props) {

    const [inptxt, setInptxt] = useState('')
    const [inptxt2, setInptxt2] = useState('')

    const [editmode, setEditmode] = useState(false);
    const [editedTitle, setEditedtitle] = useState('');
    const [editedContent, setEditedcontent] = useState('');
    const [editId, setEditid] = useState('');

    const DispBoxVal = useSelector((state) => state.NotesPageReducer)
    const dispatch = useDispatch()

    const  username = useSelector(state=> state.user.username)
    const  userEmail = useSelector(state=> state.user.emailid)
    const  loggedin = useSelector(state=> state.user.login)


    //////////////////////////////////////
    const handleChange = (e) => {


        setInptxt(e.target.value);



    }


    /////////////////////

    const handleChange2 = (e) => {


        setInptxt2(e.target.value);



    }

    ///////////////////////////////////////




    const handleClick = () => {

        const data = {
            id: uuidv4(),
            content1: inptxt,
            content2: inptxt2

        }
        dispatch(addNote(data))


        console.log(data)

        setInptxt('')
        setInptxt2('')

    }

    ////////////////////////////////////

    const handleDelete = (id) => {
        dispatch(deleteNote(id));
    }

    ///////////////////////


    const handleEdit = (id) => {

        if (editmode == true) {
            setEditmode(false)
        }

        else {
            console.log(id);
            setEditmode(true);
            setEditid(id);

            DispBoxVal.map((obj) => {

                if (obj.id == id) {


                    setEditedtitle(obj.content1);
                    setEditedcontent(obj.content2);
                    console.log(editedTitle);
                    return obj;
                }
                else
                    return obj;

            })




        }

        const contentInparr = useSelector((state) => state.NotesPageReducer.map(obj => {

            if (obj.id == id) {


                setEditedtitle(obj.content2);

                return obj;
            }
            else
                return obj;

        }


        ));




    }


    /////////////////////



    const handleSave = () => {
        setEditmode(false);


        const editData = {
            id: editId,
            Econtent1: editedTitle,
            Econtent2: editedContent
        }
        console.log(editData);

        dispatch(editNote(editData));

        setEditedtitle('');
        setEditedcontent('');
    }




    ///////////////////////////////////////////////


    const handleCancel = () => {


        setEditmode(false);

    }












    const [taskText, setTaskText] = useState('');
    const [taskTitle, setTaskTitle] = useState('');
    const taskList = useSelector((state) => state.tasks);

    const handleTaskTextChange = (e) => {
        setTaskText(e.target.value);
    };

    const handleTaskTitleChange = (e) => {
        setTaskTitle(e.target.value);
    };

    const handleAddTask = () => {
        if (taskText.trim() !== '' && taskTitle.trim() !== '') {
            const newTask = {
                id: uuidv4(),
                title: taskTitle,
                text: taskText,
                completed: false,
            };

            dispatch(addTask(newTask));
            setTaskText('');
            setTaskTitle('');
        }
    };

    const handleDeleteTask = (taskId) => {
        dispatch(deleteTask(taskId));
    };



   
            useEffect(() => {
                dispatch(getTask({ emailid: userEmail }));
              }, [loggedin]);

    return (


        <div className="">
        {loggedin && <h1 className='mynotes  py-2'>WELCOME {username.toUpperCase()}</h1>
}


            <h2 className='mx-5 mt-5 mynotes'>

                <FontAwesomeIcon icon={faListCheck} />

                My Tasks</h2>

            <div className="Tasks container-fluid">






                <div className="TasksList container-fluid mt-5 py-3">

                    {taskList.length > 0 && loggedin ? (
                        taskList.map((task) => 
                        
                      { 
                        if(task.emailid == userEmail)
                       { 
                     return   (
                            <div key={task.id} className="mt-4 task-item ">
                                {/* <div
                                    className={`task-checkbox  ${task.completed ? 'checked' : ''}`}
                                    onClick={() => {
                                    }}
                                ></div> */}
                                <div  className="task-content ">
                                    <h3 style={{  "text-decoration": task.completed == 1?"line-through":""}}>{task.title}</h3>
                                    <p style={{  "text-decoration": task.completed == 1?"line-through":""}}>{`DEADLINE : ${task.taskdate }`}</p>
                                    <p>{`STATUS : ${task.completed ==0 ?"Pending":"Completed"}`}</p>
                                </div>
                                <div
                                    className="delete-button "
                                    onClick={() => handleDeleteTask(task.id)}
                                >
                                    {/* <FontAwesomeIcon icon={faTrashCan} /> */}

                                </div>
                            </div>
                        )}})
                    ) : (<>
                    {
                      loggedin ?  <div className="no-tasks-message ">No tasks added</div> :<div className="no-tasks-message ">Login to Add task</div>
                   }
                        </>
                    )}










                </div>
            </div>


        </div>

    );
}

export default HomePage;