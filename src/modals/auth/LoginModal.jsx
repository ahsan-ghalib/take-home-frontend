import React, {useState} from 'react';
import {Button, Modal} from "react-bootstrap";
import axios from "axios";
import RegisterModal from "./RegisterModal.jsx";

const LoginModal = (props) => {
    const baseUrl = import.meta.env.VITE_APP_BASE_URL;
    const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [isDisabled, setIsDisabled] = useState(false);

    const handleCloseRegisterModal = () => setIsRegisterModalOpen(false);
    const handleShowRegisterModal = () => {
        props.onClose();
        setIsRegisterModalOpen(true);
    };

    const initialState = {
        email: '',
        password: ''
    }

    const [errors, setErrors] = useState();
    const [errorMessage, setErrorMessage] = useState();

    const [login, setLogin] = useState(initialState);

    const handleChange = (event) => {
        const {name, value} = event.target;
        setLogin((prevState) => ({
            ...prevState,
            [name]: value
        }));
    };
    const handleSubmit = (event) => {
        setIsLoading(true);
        setIsDisabled(true);
        event.preventDefault();
        axios.post(baseUrl + '/login', login)
            .then((response) => {
                setIsLoading(false)
                setIsDisabled(false)
                localStorage.setItem('user', JSON.stringify(response.data.data));
                props.onClose();
            })
            .catch((error) => {
                setIsLoading(false)
                setIsDisabled(false)
                setErrors(error.response.data.errors)
                setErrorMessage(error.response.data.message)
            });
    }
    return (
        <>
            <Modal show={props.show} onHide={props.onClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Login</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="mb-3">
                        <label htmlFor="email" className="col-form-label">Email</label>
                        <input type="text" name={'email'} onChange={handleChange} className="form-control" id="email"/>
                        <ul>
                            {errors?.email && (
                                Object.entries(errors.email).map((error, index) => (
                                    <li className={'text-danger'} key={index}> {errors.email[index]}</li>
                                ))
                            )}
                        </ul>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="password" className="col-form-label">Password</label>
                        <input type="password" name={'password'} onChange={handleChange} className="form-control"
                               id="password"/>
                        <ul>
                            {errors?.password && (
                                Object.entries(errors.password).map((error, index) => (
                                    <li className={'text-danger'} key={index}> {errors.password[index]}</li>
                                ))
                            )}
                        </ul>
                    </div>
                    <p> Don't Have Account? <strong onClick={handleShowRegisterModal}>Register</strong></p>
                </Modal.Body>
                <Modal.Footer>
                    <Button className={'d-flex align-items-center'} type={'submit'} onClick={handleSubmit} disabled={isDisabled} variant="primary">
                        {isLoading && (
                            <div className="spinner-border spinner-border-sm text-light" role="status">
                                <span className="visually-hidden">Loading...</span>
                            </div>
                        )}&nbsp; Login
                    </Button>
                    <Button variant="secondary" onClick={props.onClose}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
            <RegisterModal show={isRegisterModalOpen} onClose={handleCloseRegisterModal}/>
        </>
    );
}

export default LoginModal;