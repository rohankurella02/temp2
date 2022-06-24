import React, { useEffect } from 'react'
import './Login.scss'
import { useForm } from 'react-hook-form'
import { useSelector, useDispatch } from 'react-redux'
import { Form, Button } from "react-bootstrap"
import { MdLogin } from 'react-icons/md';
import { FormField } from 'react-form-input-fields'
import loginPhoto from '../../Assets/loginPhoto.svg'
import { NavLink, useNavigate } from 'react-router-dom'
import { userLogin } from '../../slices/userSlice'
import {
    AwesomeButton,
    AwesomeButtonProgress,
    AwesomeButtonSocial,
} from 'react-awesome-button';

function Login() {

    let dispatch = useDispatch();
    let navigate = useNavigate();

    const d = useSelector(state => state.user);

    const { register, handleSubmit, formState: { errors } } = useForm();

    const onFormSubmit = (data) => {
        console.log(data)
        dispatch(userLogin(data))
    }

    useEffect(() => {
        if (d.isLoggedIn) {
            navigate('/')
        }
    }, [d.isLoggedIn])

    return (
        <div className='container'>
            <div className="left">
                <img src={loginPhoto} alt="" />
            </div>
            <div className="right">
                <h1>Login <div style={{ display: "inline", fontWeight: "150", textTransform: "none", fontSize: "22px" }}>your account</div> </h1>

                <Form className='w-50 mx-auto' onSubmit={handleSubmit(onFormSubmit)}>
                    <Form.Group className="group" controlId="formBasicEmail">

                        <Form.Label style={{ display: "block" }} className='label'>User Name</Form.Label>
                        <Form.Control className='input' type="text" placeholder="Enter email" {...register("emailID", { required: true })} />
                        {/* validation error message for username */}
                        {errors.username && <p style={{ color: "red", fontWeight: "250" }} className='text-danger'>Username is Required</p>}
                    </Form.Group>

                    <Form.Group className="group" controlId="formBasicPassword">
                        <Form.Label style={{ display: "block" }} className='label' >Password</Form.Label>
                        <Form.Control type="password" placeholder="Password" {...register("password", { required: true })} />
                        {/* validation error message for password */}
                        {errors.password && <p style={{ color: "red", fontWeight: "250" }} className='text-danger'>Password is Required</p>}
                    </Form.Group>

                    <Button variant="primary" type="submit">
                        Login <MdLogin />
                    </Button>

                    {d.isLoading && <p style={{ color: "#EEE", marginBottom: "23px" }}>Loading ....</p>}
                    <Form.Group style={{ display: "block" }} className="group" controlId="formBasicText">
                        <Form.Label style={{ display: "block" }} className='label'>Don't have an account? <NavLink to='/signup' style={{ display: "inline", color: "blue" }} >Click Here</NavLink> to create an account</Form.Label>
                    </Form.Group>
                </Form>
            </div>
        </div>
    )
}

export default Login