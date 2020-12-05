import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { getEducation , updateEducation } from '../../redux/profile/profile-actions';

import Spinner from '../../components/Spinner/Spinner.component';

import './edit-education.styles.scss';

const initialState = {
    school: '',
    degree: '',
    fieldofstudy: '',
    from: '',
    to: '',
    current: false,
    description: ''
}

const EditEducation = ({ match, education, getEducation, updateEducation, history }) => {
    const [formData, setFormData] = useState(initialState);

    useEffect(() => {
        if(!education){
            getEducation(match.params.edu_id);
        }
        

        const profileData = { ...initialState };

        for (const key in education) {
            if (key in profileData) profileData[key] = education[key];
          }

        setFormData(profileData);

      }, [getEducation, match.params.edu_id, education]);

    const { school, degree, fieldofstudy, from, to, current, description } = formData;

    const onChange = e =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

    const onSubmit = e => {
        e.preventDefault();
        updateEducation(formData, education._id, history);
    };

    return(
        <div className='edit-education'>
            {education ? (
            <div>
                <form onSubmit={onSubmit}>
                <Link className="btn btn-light my-1 go-back" to="/dashboard">
                    &#8678; Return
                </Link>
                <h1>Edit Education</h1>
                    <div className='row justify-content-lg-center'>  
                    
                        <div className='grid-input col-lg-8'>
                            <input
                            type="text"
                            placeholder="school"
                            name="school"
                            value={school}
                            onChange={onChange}
                            />
                        </div>

                        <div className='grid-input col-lg-8'>
                            <input
                            type="text"
                            placeholder="degree"
                            name="degree"
                            value={degree}
                            onChange={onChange}
                            />
                        </div>

                        <div className='grid-input col-lg-8'>
                            <input
                            type="text"
                            placeholder="field of study"
                            name="fieldofstudy"
                            value={fieldofstudy}
                            onChange={onChange}
                            />
                        </div>

                        <div className='date-input col-lg-8'>
                            <input
                            type="date"
                            name="from"
                            value={from}
                            onChange={onChange}
                            />
                        </div>

                        <div className='col-lg-8 checkbox'>
                            <input 
                                type="checkbox"
                                name="current"
                                checked={current}
                                value={current}
                                onChange={() => {
                                    setFormData({...formData, current: !current });
                                }}
                            />{' '}
                            <span> Till Present </span>
                        </div>

                        <div className='date-input col-lg-8'>
                            <input
                            type="date"
                            name="to"
                            value={to}
                            onChange={onChange}
                            disabled={current}
                            />
                        </div>

                        <div className='grid-input col-lg-8'>
                            <textarea
                            rows="7"
                            cols="37"
                            name="description"
                            value={description}
                            onChange={onChange}
                            />
                        </div>

                        <div className='col-lg-8'>
                            <button className='button-send'>Add</button>
                        </div>
                    </div>
                    
                </form>
                </div>
            ) : (
                <Spinner />
            )}
        </div>
    )   
};

const mapStateToProps = state => ({
    education: state.profile.education,
    user: state.user
  });

export default connect( mapStateToProps, { updateEducation, getEducation })(EditEducation);