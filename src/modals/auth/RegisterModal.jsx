import {Button, Modal} from "react-bootstrap";
import React, {useState} from "react";
import axios from "axios";

const RegisterModal = (props) => {
    const baseUrl = import.meta.env.VITE_APP_BASE_URL;
    const [isLoading, setIsLoading] = useState(false);
    const [isDisabled, setIsDisabled] = useState(false);
    const initialState = {
        name: '',
        email: '',
        password: '',
        password_confirmation: ''
    }

    const [errors, setErrors] = useState();
    const [errorMessage, setErrorMessage] = useState();

    const [register, setRegister] = useState(initialState);

    const handleChange = (event) => {
        const {name, value} = event.target;
        setRegister((prevState) => ({
            ...prevState,
            [name]: value
        }));
    };
    const handleSubmit = (event) => {
        setIsLoading(true);
        setIsDisabled(true);
        event.preventDefault();
        axios.post(baseUrl + '/register', register)
            .then((response) => {
                setIsLoading(false)
                setIsDisabled(false)
                localStorage.setItem('user', JSON.stringify(response.data.data));
                props.onClose();
                window.location.reload();
            })
            .catch((error) => {
                setIsLoading(false)
                setIsDisabled(false)
                setErrors(error.response.data.errors)
                setErrorMessage(error.response.data.message)
            });
    }
  return(
      <Modal show={props.show} onHide={props.onClose}>
          <Modal.Header closeButton>
              <Modal.Title>Register</Modal.Title>
          </Modal.Header>
          <Modal.Body>
              <div className="mb-3">
                  <label htmlFor="name" className="col-form-label">Name</label>
                  <input type="text" name={'name'} onChange={handleChange} className="form-control" id="name"/>
                  <ul>
                      {errors?.name && (
                          Object.entries(errors.name).map((error, index) => (
                              <li className={'text-danger'} key={index}> {errors.name[index]}</li>
                          ))
                      )}
                  </ul>
              </div>
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
              <div className="mb-3">
                  <label htmlFor="password_confirmation" className="col-form-label">Confirm Password</label>
                  <input type="password_confirmation" name={'password_confirmation'} onChange={handleChange} className="form-control"
                         id="password_confirmation"/>
                  <ul>
                      {errors?.password_confirmation && (
                          Object.entries(errors.password_confirmation).map((error, index) => (
                              <li className={'text-danger'} key={index}> {errors.password_confirmation[index]}</li>
                          ))
                      )}
                  </ul>
              </div>
          </Modal.Body>
          <Modal.Footer>
              <Button type={'submit'} onClick={handleSubmit} disabled={isDisabled} variant="primary">
                  {isLoading && (
                      <div className="spinner-border spinner-border-sm text-light" role="status">
                          <span className="visually-hidden">Loading...</span>
                      </div>
                  )} &nbsp;Register
              </Button>
              <Button variant="secondary" onClick={props.onClose}>
                  Close
              </Button>
          </Modal.Footer>
      </Modal>
  );
}

export default RegisterModal;