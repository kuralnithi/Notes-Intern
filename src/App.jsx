import React, { useEffect } from "react";
import { store } from "./Features/NotesStore";
import { Provider, useDispatch, useSelector } from "react-redux";
import NotesPage from "./Componenta/NotesPage";
import { AiFillHome, AiOutlineSearch } from "react-icons/ai";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBoxArchive,
  faListCheck,
  faNoteSticky,
  faPen,
  faPenAlt,
  faPenClip,
  faPenFancy,
  faTrashCan,
  faUser,
  faUserLarge,
} from "@fortawesome/free-solid-svg-icons";
import { Link, Route, Routes, useNavigate } from "react-router-dom";
import HomePage from "./HomePage";
import SearchPage from "./Componenta/SearchPage";
import TasksPage from "./TasksPage";
import { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import ResetPasswordpage from "./Componenta/ResetPasswordpage";
import { setEmailid, setLogin, setUsername } from "./Features/UserSlice";

function App(props) {

    const [showLogin, setShowLogin] = useState(false);
    const [showSignup, setShowSignup] = useState(false);
  // const [loggedin,setLoggedin] = useState(false);
  const loggedin = useSelector(state=> state.user.login)
  console.log("LLGG",loggedin);
    const handleClose = () => {
      setShowLogin(false);
      setShowSignup(false);
    };
  
    const handleShowLogin = () => setShowLogin(true);
    const handleShowSignup = () => setShowSignup(true);
  
    const navigate = useNavigate();
  
    const handleUsericon = () => {
      navigate("/loading");
      setTimeout(() => {
        navigate("/userpage");
      }, 4000);
    };
  
    ///////////REG LOG IN/////////////////////////
  const dispatch = useDispatch();
const  username = useSelector(state=> state.user.username)
console.log("US",username);

    const [RegUserName, setRegUserName] = useState("");
    const [RegEmailId, setRegEmailId] = useState("");
    const [RegPassword, setRegPassword] = useState("");
  
    const [LoginEmailid, setLoginEmailid] = useState("");
    const [LoginPassword, setLoginPassword] = useState("");
  
    const [token, setToken] = useState("");
  
    const [userdetails, setUserdetails] = useState("");

    const [regStatus, setRgStatus] = useState("");
    const [loginStatus, setloginStatus] = useState("");
  
    const [loginserverStatus, setloginserverStatus] = useState("");
  
    const [resetMessage, setresetMessage] = useState("");
  
    console.log("recive token  in FE >", token);
  
    const handleRegUserInp = (e) => {
      setRegUserName(e.target.value);
    };
  
    const handleRegEmailInp = (e) => {
      setRegEmailId(e.target.value);
    };
  
    const handleRegPasswordInp = (e) => {
      setRegPassword(e.target.value);
    };
  
    const handleLoginEmailInp = (e) => {
      setLoginEmailid(e.target.value);
    };
  
    const handleLoginPasswordInp = (e) => {
      setLoginPassword(e.target.value);
    };
  
    //REG btn
  
    const handleRegBtn = async (e) => {
      e.preventDefault();
  
      if (RegUserName == "" || RegEmailId == "" || RegPassword == "" || !RegEmailId.includes("@") ) {
        setRgStatus("feilds required details or wrong inputs");
        setTimeout(() => {
          setRgStatus("");
        }, 3000);
  
        return;
      }
  
      try {
      const requestBody = JSON.stringify({
        username: RegUserName,
        emailid: RegEmailId,
        password: RegPassword,
      });
  
      // https://password-reset-ze4r.onrender.com
  
        const regResponce = await fetch(
          "https://notes-intern-backend.onrender.com/api/user/register",
          {
            method: "post",
            headers: {
              "content-type": "application/json",
            },
            body: requestBody,
          }
        );
  
        const regResDetails = await regResponce.json();

        const message = regResDetails.message;
  
        if (regResDetails) {
          setRgStatus(message);
        }
        console.log("REG STATUS", regStatus);
        setTimeout(() => {
          setRgStatus("");
        }, 3000);
      } catch (error) {
        console.log("error in reg>>", error);
      }
    };
  
    const handleLoginBtn = async (e) => {
      e.preventDefault();
  
      if (LoginEmailid == "" || LoginPassword == "") {
        setloginStatus("Please enter the required details");
        setTimeout(() => {
          setloginStatus("");
        }, 3000);
  
        return;
      }
  
      const loginRes = await fetch(
        "https://notes-intern-backend.onrender.com/api/user/login",
        {
          method: "post",
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify({
            emailid: LoginEmailid,
            password: LoginPassword,
          }),
        }
      );
      console.log("LOG REG>>>", loginRes);
      const data = await loginRes.json();
      localStorage.setItem("token", data.token);
      console.log("token setted in local", data.token);
      setToken(localStorage.getItem("token"));
      console.log("token get from local and updated in setToken()", token);
      setloginserverStatus(data.message);
      setTimeout(() => {
        setloginserverStatus("");
      }, 3000);
      console.log("TOKENNN>>>", data.token);
    };
  
    const handleForget = async () => {
      try {
        if (LoginEmailid == "") {
          setloginStatus("Please enter the E-mail id of forgetted password");
  
          setTimeout(() => {
            setloginStatus("");
          }, 3000);
  
          return;
        }
  
        const forgetFetch = await fetch(
          "https://notes-intern-backend.onrender.com/api/resetpassword",
          {
            method: "post",
            headers: {
              "content-type": "application/json",
            },
            body: JSON.stringify({
              emailid: LoginEmailid,
            }),
          }
        );
  
        const responce = await forgetFetch.json();
  
        if (responce) {
          setresetMessage(responce.message);
  
          console.log(responce.message);
        }
  
        if (responce.message == "mail sent successfully to emailid") {
          setTimeout(() => {
            navigate("/Preset");
          }, 2000);
  
          console.log("reset msg>>", resetMessage);
        }
  
        setTimeout(() => {
          setresetMessage("");
        }, 5000);
      } catch (error) {
        console.log(error);
      }
    };
  
    useEffect(() => {
      fetchdata();
    }, [token]);
  
    const fetchdata = async () => {
      try {
        setToken(localStorage.getItem("token"));
        console.log("token get from local and updated in setToken()", token);
  
        const responce = await fetch(
          "https://notes-intern-backend.onrender.com/api/getuser",
          {
            method: "get",
            headers: {
              "content-type": "application/json",
              authorization: token,
            },
          }
        );
  
        const data = await responce.json();
  
        if (data.username) {
          console.log("user found__Log in auth successfull", data);
  
          setUserdetails(data);
        dispatch(setUsername(data.username))
       
        dispatch(setEmailid(data.emailid))
          // setUsername(data.username);
          // setemailid(data.emailid);\
          dispatch(setLogin(true))
          console.log("LLGG",loggedin);

          
          // setLoggedin(true);
        }
      } catch (error) {
        console.log("errorrr>>>>>", error);
      }
    };
    // console.log("user name>>", username);
    // console.log("email id>>", emailid);
  
    const handleLogout =()=>{
      localStorage.removeItem("token");
      dispatch(setLogin(false))

      // setLoggedin(false);
    }

  return (
    <div className=" mainbox contaiiner-fluid">
       


      <div>
          <Modal show={!loggedin && (showLogin || showSignup)} onHide={handleClose}>
            <Modal.Header closeButton>
              <Modal.Title>{showLogin ? "Login" : "Signup"}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Form>
                {showSignup && (
                  <Form.Group controlId="formBasicEmail">
                    <Form.Label>User name</Form.Label>
                    <Form.Control
                      type="text"
                      value={RegUserName}
                      onChange={handleRegUserInp}
                      placeholder="Enter username"
                    />
                    <Form.Text className="text-muted"></Form.Text>
                  </Form.Group>
                )}
                {showSignup && (
                  <Form.Group controlId="formBasicEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control
                      type="email"
                      value={RegEmailId}
                      onChange={handleRegEmailInp}
                      placeholder="Enter email"
                      required
                    />
                    <Form.Text className="text-muted">
                      We'll never share your email with anyone else.
                    </Form.Text>
                  </Form.Group>
                )}
                {showSignup && (
                  <Form.Group controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                      type="password"
                      value={RegPassword}
                      onChange={handleRegPasswordInp}
                      placeholder="Password"
                    />
                  </Form.Group>
                )}
                {showLogin && (
                  <Form.Group controlId="formBasicEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control
                      type="email"
                      value={LoginEmailid}
                      onChange={handleLoginEmailInp}
                      placeholder="Enter email"
                      required
                    />
                    <Form.Text className="text-muted">
                      We'll never share your email with anyone else.
                    </Form.Text>
                  </Form.Group>
                )}
                {showLogin && (
                  <Form.Group controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                      type="password"
                      value={LoginPassword}
                      onChange={handleLoginPasswordInp}
                      placeholder="Password"
                    />
                  </Form.Group>
                )}
                {showLogin ? (
                  <>
                    <Button
                      className="m-3"
                      variant="primary"
                      type="submit"
                      onClick={(e) => {
                        handleLoginBtn(e);
                      }}
                    >
                      Login
                    </Button>
                    <a className="mx-2 forget" onClick={handleForget}>
                      {" "}
                      Forget password?{" "}
                    </a>
                  </>
                ) : (
                  <Button
                    className="m-3"
                    variant="dark"
                    type="submit"
                    onClick={(e) => {
                      handleRegBtn(e);
                    }}
                  >
                    Signup
                  </Button>
                )}
              </Form>
            </Modal.Body>
            <Modal.Footer>
              {<p className="logmsg">{regStatus}</p>}
              {<p className="logmsg">{loginStatus}</p>}
              {<p className="logmsg">{loginserverStatus}</p>}
              {<p className="logmsg">{resetMessage}</p>}
            </Modal.Footer>
          </Modal>
        </div>






      <div className="row">
        <div className="col-3 sidebox  ">
          <nav className="sidebarm  p-2  mlg">
            <div className="my-5 li  con">
             
            <header>
       

          <div className="logreg ">
            {loggedin ? (
              <>              <h3 className="brand-name ">
                <FontAwesomeIcon icon={faUserLarge} className="mx-3" />
              {username}
              </h3>

             <Button
             className="mx-2"
             variant="primary"
             onClick={handleLogout}
           >
             Logout
           </Button>
           </>

            ) : (
              <div className="logregbtn">
                <Button
                  className=" my-2 mx-2"
                  variant="primary"
                  onClick={handleShowLogin}
                >
                  Login
                </Button>
                <Button
                  className="mx-2"
                  variant="secondary"
                  onClick={handleShowSignup}
                >
                  Signup
                </Button>
              </div>
            )}
          </div>
              </header>
             
             
             
            </div>

            <hr className="text dark " />

            <div className="lsit-group list-group-flush lg ">
              <div className="list1 ">
                {" "}
                <Link to="/" className=" fs-4  list-group-item  py2">
                  <AiFillHome />{" "}
                  <span className="` d-none mx-3 d-md-inline d-sm-inline d-lg-inline d-xl-inline">
                    {"Home"}
                  </span>
                </Link>
                {/* <Link
                  to="/SearchPage"
                  className="mt-5 fs-4   list-group-item  py2"
                >
                  <AiOutlineSearch />
                  <span className="d-none fs-4  mx-3 d-md-inline d-sm-inline d-lg-inline d-xl-inline">
                    {"Search"}
                  </span>{" "}
                </Link>
                <Link
                  to="/NotesPage"
                  className=" mt-5 fs-4 list-group-item  py2"
               
                >
                  <FontAwesomeIcon icon={faNoteSticky} />
                  <span className="d-none fs-4  mx-3 d-md-inline d-sm-inline d-lg-inline d-xl-i nline">
                    {"Notes"}
                  </span>
                </Link> */}
               {loggedin&& <Link
                  to="/TasksPage"
                  className=" mt-5 fs-4 list-group-item  py2"
                  active
                >
                  <FontAwesomeIcon icon={faListCheck} />
                  <span className="d-none fs-4  mx-3 d-md-inline d-sm-inline d-lg-inline d-xl-inline">{`Tasks`}</span>
                </Link>}
                {/* <a href="/" className=" mt-5 fs-4 list-group-item  py2">

                                    <FontAwesomeIcon icon={faBoxArchive} />
                                    <span className='d-none fs-4  mx-3 d-md-inline d-sm-inline d-lg-inline d-xl-inline' >{"Archive"}</span></a>

                                <a href="/" className="mt-5 fs-4 list-group-item  py2">

                                    <FontAwesomeIcon icon={faTrashCan} />
                                    <span className='d-none fs-4  mx-3 d-md-inline d-sm-inline d-lg-inline d-xl-inline' >{"Bin"}</span></a> */}
              </div>
            </div>
          </nav>
        </div>

        <div className="container-fluid notesmainbox  col-9 ">
     
            <Routes>

              <Route path="/NotesPage" element={<NotesPage />} />
              <Route path="/TasksPage" element={<TasksPage />} />
              <Route path="/SearchPage" element={<SearchPage />} />
              <Route path="/" element={<HomePage />} />
              <Route path="/Preset" element={<ResetPasswordpage />} />
            </Routes>
       
        </div>
      </div>
    </div>
  );
}

export default App;
