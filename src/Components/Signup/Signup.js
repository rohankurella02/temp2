import React from 'react'
import './Signup.scss'
import signUpPhoto from '../../Assets/signUpPhoto.svg'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom';
import { Form, Button } from "react-bootstrap"
import { MdLogin } from 'react-icons/md';
import { NavLink } from 'react-router-dom';
import axios from 'axios';


function Signup() {

    const { register, handleSubmit, formState: { errors } } = useForm();
    const navigate = useNavigate();

    const onFormSubmit = (async (data) => {
        
        let result = await axios.post('http://localhost:4000/user/signup', data)

        let status = result.data;
        if(status.message === "User Created Successfully") {
            alert("User Created Successfully, Please Login with your New credentials")
            navigate('/login')
        }
        if(status.message === "User Already Exists") {
            alert("User Already Exists, Please Login with your Credentials")
        }

        console.log(status)

        console.log(data)
    })

    return (
        <div className="signup">
            <div className='lcontainer'>
                <h1>Register</h1>
                <Form className='w-50 mx-auto' onSubmit={handleSubmit(onFormSubmit)}>
                    <Form.Group className="group" controlId="formBasicEmail">

                        <Form.Label style={{ display: "block" }} className='label'>First Name</Form.Label>
                        <Form.Control className='input' type="text" placeholder="First Name" {...register("firstName", { required: true })} />
                        {/* validation error message for username */}
                        {errors.username && <p style={{ color: "red", fontWeight: "250" }} className='text-danger'>First Name is Required</p>}
                    </Form.Group>

                    <Form.Group className="group" controlId="formBasicEmail">

                        <Form.Label style={{ display: "block" }} className='label'>Last Name</Form.Label>
                        <Form.Control className='input' type="text" placeholder="Last Name" {...register("lastName", { required: true })} />
                        {/* validation error message for username */}
                        {errors.username && <p style={{ color: "red", fontWeight: "250" }} className='text-danger'>Last Name is Required</p>}
                    </Form.Group>

                    <Form.Group className="group" controlId="formBasicEmail">

                        <Form.Label style={{ display: "block" }} className='label'>Email ID</Form.Label>
                        <Form.Control className='input' type="text" placeholder="Enter Email ID" {...register("emailID", { required: true })} />
                        {/* validation error message for username */}
                        {errors.username && <p style={{ color: "red", fontWeight: "250" }} className='text-danger'>Email ID is Required</p>}
                    </Form.Group>

                    <Form.Group className="group" controlId="formBasicPassword">
                        <Form.Label style={{ display: "block" }} className='label' >Password</Form.Label>
                        <Form.Control type="password" placeholder="Create Password" {...register("password", { required: true })} />
                        {/* validation error message for password */}
                        {errors.password && <p style={{ color: "red", fontWeight: "250" }} className='text-danger'>Password is Required</p>}
                    </Form.Group>

                    <Button variant="primary" type="submit">
                        Login <MdLogin />
                    </Button>
                    <Form.Group style={{ display: "block" }} className="group" controlId="formBasicText">
                        <Form.Label style={{ display: "block" }} className='label'>Already have an account? <NavLink to='/login' style={{ display: "inline", color: "blue" }} >Click Here</NavLink> to Sign In</Form.Label>
                    </Form.Group>
                </Form>
            </div>
            <div className="rcontainer">
                <img src={signUpPhoto} alt="" />
            </div>
        </div>
    )
}

export default Signup