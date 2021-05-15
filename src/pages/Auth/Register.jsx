import { useEffect, useRef, useState } from 'react';
import {Link} from 'react-router-dom';
import request from '../../services/http'
import './Auth.scss'

const Register = () => {

    const emailInputRef = useRef(null);
    const passInputRef = useRef(null);
    const [hasError, setHasError] = useState(false)

    const handleSubmit = (e) => { // TODO Submit bo'lganda shu funksiya ishlaydii
       e.preventDefault();

       request.post('/register', { // TODO input valuelari olinib serverga jo'natilyapti
           email: emailInputRef.current.value,
           password: passInputRef.current.value
       })
       .then(() => {
           alert('Success')
       })
       .catch(() => {
           setHasError(true);
       })
    }


    return (
        <div className="container">
            <div className="row">
                <div className="col-md-3" />

                <div className="col-md-6">
                    <div className="card">
                        <div className="card-header">
                            <h1>Register</h1>
                        </div>
                        <div className="card-body">

                            {
                                hasError ? (
                                    <div class="alert alert-danger" role="alert">
                                        A simple danger alert—check it out!
                                    </div>
                                ) : (
                                    <></>
                                )
                            }
                            <form onSubmit={handleSubmit}>
                                <div class="mb-3">
                                    <label for="exampleInputEmail1" class="form-label">Email address</label>
                                    <input ref={emailInputRef} type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
                                    <div id="emailHelp" class="form-text">We'll never share your email with anyone else.</div>
                                </div>
                                <div class="mb-3">
                                    <label for="exampleInputPassword1" class="form-label">Password</label>
                                    <input ref={passInputRef} type="password" class="form-control" id="exampleInputPassword1" />
                                </div>
                                
                                <button type="submit" class="btn btn-primary">Submit</button>
                            </form>
                        </div>
                        <div className="card-footer">
                            <Link to="/">Uje akkauntiz bormi?</Link>
                        </div>
                    </div>
                </div>

                <div className="col-md-3" />


            </div>
        </div>

    )
}


export default Register;