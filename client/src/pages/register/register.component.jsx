import React, { useState } from 'react';

import { Redirect } from 'react-router-dom';

import { connect } from 'react-redux';
import { register } from '../../redux/user/user-actions';
import { setAlert } from '../../redux/alert/alert-actions';

import './register.styles.scss';

const RegisterPage = ({ register, isAuthenticated, setAlert }) => {
    const [file, setFile] = useState('');
    const [previewSource, setPreviewSource] = useState('');
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        univId: '',
        password: '',
        confirmPassword: ''
    });

    const { name, email, univId, password, confirmPassword } = formData;

    const onChange = (e) => {
        setFormData({...formData, [e.target.name]: e.target.value });
    }

    const onSubmit = async(e) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            setAlert("Passwords don't match!", 'danger');
        } else {
            register({ name, email, univId, password, previewSource });
        }
    }

    const handleFileInputChange = e => {
        const file = e.target.files[0];
        setFile(file);
        previewFile(file);
    }

        //get the file info and set previewSource to be seen as image
    const previewFile = (file) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend = () => {
        setPreviewSource(reader.result);
        }
    }

    if (isAuthenticated) {
        return <Redirect to="/dashboard" />;
    }

    return (
        <div className='register'>
            <img src="./undraw_community_8nwl.svg" alt=""/>
            <h1>Welcome</h1>
            <form onSubmit={onSubmit}>
                <div>
                    <input
                        className='input-form'
                        type='text'
                        placeholder='Name'
                        name='name'
                        value={name}
                        onChange={onChange}
                        required
                    />
                </div>
                <div>
                    <input
                        className='input-form'
                        type="email"
                        placeholder="Email Address"
                        name="email"
                        value={email}
                        onChange={onChange}
                        required
                    />
                </div>  
                <div className='form-group mt-3'>
                    <label>Choose a profile photo</label>
                    <input
                        className='form-control-file'
                        type='file'
                        name='file'
                        onChange={handleFileInputChange}
                        required 
                    />
                </div> 
                <div>
                    {previewSource && (
                        <img className='img-profile' src={previewSource} alt='chosen' />
                    )}
                </div>             
                <div>
                    <input
                        className='input-form'
                        type="text"
                        placeholder="Registration Number"
                        name="univId"
                        value={univId}
                        onChange={onChange}
                        minLength="9"
                        required
                    />
                </div>
                <div>
                    <input
                        className='input-form'
                        type="password"
                        placeholder="Password"
                        name="password"
                        value={password}
                        onChange={onChange}
                        minLength="8"
                        required
                    />
                </div>
                <div>
                    <input
                        className='input-form'
                        type="password"
                        placeholder="Confirm Password"
                        name="confirmPassword"
                        value={confirmPassword}
                        onChange={onChange}
                        minLength="8"
                        required
                    />
                </div>
                <button>Register</button>
            </form>
        </div>
    )
};

const mapStateToProps = (state) => ({
    isAuthenticated: state.user.isAuthenticated
});

export default connect(mapStateToProps, { register, setAlert } )(RegisterPage);