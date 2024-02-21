import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './ResetPasswordpage.css'
function ResetPasswordpage(props) {

    const [token, setToken] = useState('');

    const [newPassword, setnewPassword] = useState('');
    const [confirmPassword, setconfirmPassword] = useState('');
    const [responce, setResponce] = useState('');


    const [error, setError] = useState('');


    const navigate = useNavigate();

    const handletoken = (e) => {


        setToken(e.target.value);


    }

    const handleNewPassword = (e) => {


        setnewPassword(e.target.value);


    }


    const handleConfirmPassword = (e) => {


        setconfirmPassword(e.target.value);


    }





    const handleChangePasswordBtn = async () => {


        if (confirmPassword !== newPassword) {


            setError("Password not match");

            setTimeout(() => {
                setError("");



            }, 3000)

            return

        }

        if (confirmPassword == "" || newPassword == "" || token == "") {


            setError("enter the required fields");
            setTimeout(() => {
                setError("");



            }, 3000)
            return

        }

        if (newPassword.length < 8) {


            setError("Enter minimum 8 characters for password");
            setTimeout(() => {
                setError("");



            }, 3000)
            return

        }


        const fetchpassword = await fetch('http://localhost:5000/api/resetpasswordpage', {


            method: 'post',

            headers: {

                "Content-Type": "application/json"

            },
            body: JSON.stringify({

                token: token,
                password: confirmPassword


            }
            )

        });

        const fetchResponce = await fetchpassword.json();

        console.log(fetchResponce);
        setResponce(fetchResponce.message);

        setTimeout(() => {
            setResponce("");



        }, 2000)

        setTimeout(() => {

  navigate('/loading')

    setTimeout(() => {
    
      navigate('/')

    }, 3000); 


        }, 3000)

    }
    return (
        <div className='resetmain'>


            <div className="resetpage container-fluid text-center d-flex flex-column align-items-center justify-content-center  ">
                <h3 className='changep mt-2'>CHANGE PASSWORD</h3>


                <div className="resetform form-group mt-4">
                    <div className="form-CONTROL ">
                        <input className='form-control ' type="password"
                            
                            value={newPassword}
                            onChange={handleNewPassword}
                            placeholder='enter new password' />
                    </div>
                    <div className="form-CONTROL mt-3">
                        <input className='form-control' type="password"
                            value={confirmPassword}
                            onChange={handleConfirmPassword}
                            placeholder='enter confirm password' />
                    </div>
                    <div className="form-CONTROL mt-3">
                        <input className='form-control' type="text"
                            value={token}
                            onChange={handletoken}
                            placeholder='Enter token' />
                    </div>
                    <button onClick={handleChangePasswordBtn} className='btn btn-primary mt-3 mb-3'>change password</button>
                    <br />
                    <div className='text-danger'>
                        {responce && <p>{responce} </p>}
                        {error && <p> {error} </p>}

                    </div>
                </div>

            </div>
        </div>
    );
}

export default ResetPasswordpage;


