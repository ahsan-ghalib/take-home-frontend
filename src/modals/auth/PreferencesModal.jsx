import React, {useEffect, useState} from 'react';
import {Button, Modal} from "react-bootstrap";
import axios from "axios";
import settingIcon from '../../assets/settings.svg';
import MultiSelect from "react-multiselect-dropdown-bootstrap";

const LoginModal = (props) => {
    const baseUrl = import.meta.env.VITE_APP_BASE_URL;
    const [isLoading, setIsLoading] = useState(false);
    const [isDisabled, setIsDisabled] = useState(false);
    const user = JSON.parse(localStorage.getItem('user'));
    const token = user?.token;

    const headers = {
        'Accept': "application/json",
        'Authorization': `Bearer ${token}`,
    };
    const initialState = {
        categories: '',
        sources: '',
        author: '',
    }

    const [errors, setErrors] = useState();
    const [errorMessage, setErrorMessage] = useState();

    const [categories, setCategories] = useState([]);
    const [sources, setSources] = useState([]);
    const [preferences, setPreferences] = useState(initialState);


    useEffect(() => {
        axios.get(baseUrl + '/dropdowns')
            .then((response) => {
                let responseCategories = response.data.data.categories;
                setCategories(responseCategories.map((key, index) => {
                    return {key: key, label: key};
                }));
                setSources(response.data.data.sources);
            })
            .catch((error) => {
                console.log(error)
            })
    }, []);

    const handleChange = (event) => {
        const {name, value} = event.target;
        setPreferences((prevState) => ({
            ...prevState,
            [name]: value
        }));
    };
    const [selectedOptions, setSelectedOptions] = useState([]);
    const handleMultiSelectChange = (selected) => {
        setSelectedOptions(selected);
    };
    const handleSubmit = (event) => {
        setIsLoading(true);
        setIsDisabled(true);
        event.preventDefault();
        axios.put(baseUrl + '/news-feed-preferences', preferences, {headers})
            .then((response) => {
                setIsLoading(false)
                setIsDisabled(false)
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
                    <Modal.Title><img style={{width: '25px'}} src={settingIcon}/> Preferences</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="mb-3">
                        <label className="col-form-label">Categories</label>
                        <MultiSelect
                            name="categories"
                            options={categories}
                            value={selectedOptions}
                            onChange={handleMultiSelectChange}
                        />
                        <ul>
                            {errors?.email && (
                                Object.entries(errors.email).map((error, index) => (
                                    <li className={'text-danger'} key={index}> {errors.email[index]}</li>
                                ))
                            )}
                        </ul>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="password" className="col-form-label">Sources</label>
                        <MultiSelect
                            options={sources}
                            name="sources"
                            onChange={handleChange}
                        />
                        <ul>
                            {errors?.password && (
                                Object.entries(errors.password).map((error, index) => (
                                    <li className={'text-danger'} key={index}> {errors.password[index]}</li>
                                ))
                            )}
                        </ul>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="author" className="col-form-label">Author <small>e.g (john, Gadot)</small></label>
                        <input type="text" name={'author'} placeholder={'Enter Author names'} onChange={handleChange} className="form-control"
                               id="author"/>
                        <ul>
                            {errors?.password && (
                                Object.entries(errors.password).map((error, index) => (
                                    <li className={'text-danger'} key={index}> {errors.password[index]}</li>
                                ))
                            )}
                        </ul>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button className={'d-flex align-items-center'} type={'submit'} onClick={handleSubmit}
                            disabled={isDisabled} variant="primary">
                        {isLoading && (
                            <div className="spinner-border spinner-border-sm text-light" role="status">
                                <span className="visually-hidden">Loading...</span>
                            </div>
                        )}&nbsp; Update
                    </Button>
                    <Button variant="secondary" onClick={props.onClose}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default LoginModal;