import { useEffect, useRef, useState } from 'react';
import {Link} from 'react-router-dom';
import request from '../../services/http' // TODO boshlang'ich url http olinyapti
import './Auth.scss'

const Login = ({setToken}) => {

    const emailInputRef = useRef(null);
    const passInputRef = useRef(null);
    const [hasError, setHasError] = useState(false) // TODO Xato bo'lgan holatda shu chiqadi

    const handleSubmit = (e) => {
       e.preventDefault();

       request.post('/login', {    // TODO submit bo'lgan holatda input valulari olinib serverga jo'natilyapti
           email: emailInputRef.current.value,
           password: passInputRef.current.value
       })
       .then((response) => { // TODO Javob kelmoqda post jo'atilgandan keyingi holat
           alert('Success')

           window.localStorage.setItem('sessionToken', response.data.token); // TODO LocalStorega token qo'yilmoqda
            setToken(response.data.token) // TODO Bu yerda token olinmoqda
       })
       .catch(() => {
           setHasError(true); // TODO Xato chiqganda alert chiqadi ya'ni  xatoni ko'rsatuvchi element
       })
    }


    return (
        <div classNameName="container">
            <div classNameName="row">
                <div classNameName="col-md-3" />

                <div classNameName="col-md-6">
                    <div classNameName="card">
                        <div classNameName="card-header">
                            <h1>Login</h1>
                        </div>
                        <div classNameName="card-body">

                            {
                                hasError ? (      
                                    <div className="alert alert-danger" role="alert">
                                        A simple danger alert—check it out!
                                    </div>
                                ) : (
                                    <></>
                                )
                            } 
                            <form onSubmit={handleSubmit}> // TODO submit bo'lganda ishlaydigan funksiya pastginada
                                <div className="mb-3">
                                    <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
                                    <input ref={emailInputRef} type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
                                    <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                                    <input ref={passInputRef} type="password" className="form-control" id="exampleInputPassword1" />
                                </div>
                                
                                <button type="submit" onClick={handleSubmit} className="btn btn-primary">Submit</button>
                            </form>
                        </div>
                        <div classNameName="card-footer">
                            <Link to="/register">Parol esdan chiqdimi?</Link> // TODO Registerga o'tkazib yuboradi
                        </div>
                    </div>
                </div>

                <div classNameName="col-md-3" />


            </div>
        </div>

    )
}


export default Login;