import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { getExperience ,updateExperience } from '../../redux/profile/profile-actions';

import Spinner from '../../components/Spinner/Spinner.component';

import './edit-experience.styles.scss';

const initialState = {
    title: '',
    company: '',
    location: '',
    from: '',
    to: '',
    current: false,
    description: ''
}

const EditExperience = ({ match, experience, getExperience, updateExperience, history }) => {
    const [formData, setFormData] = useState(initialState);

    useEffect(() => {
        if(!experience){
            getExperience(match.params.exp_id);
        }
        

        const profileData = { ...initialState };

        for (const key in experience) {
            if (key in profileData) profileData[key] = experience[key];
          }

        setFormData(profileData);

      }, [getExperience, match.params.exp_id, experience]);

    const { title, company, location, from, to, current, description } = formData;

    const onChange = e =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

    const onSubmit = e => {
        e.preventDefault();
        updateExperience(formData, experience._id, history);
    };

    return(
        <div className='edit-experience'>
            {experience ? (
            <div>
                <form onSubmit={onSubmit}>
                <Link className="btn btn-light my-1 go-back" to="/dashboard">
                    &#8678; Return
                </Link>
                <h1>Edit Experience</h1>
                    <div className='row justify-content-lg-center'>  
                    
                        <div className='grid-input col-lg-8'>
                            <input
                            type="text"
                            placeholder="Title"
                            name="title"
                            value={title}
                            onChange={onChange}
                            />
                        </div>

                        <div className='grid-input col-lg-8'>
                            <input
                            type="text"
                            placeholder="Company"
                            name="company"
                            value={company}
                            onChange={onChange}
                            />
                        </div>

                        <div className='grid-input col-lg-8'>
                            <input
                            type="text"
                            placeholder="Location"
                            name="location"
                            value={location}
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
    experience: state.profile.experience,
    user: state.user
  });

export default connect( mapStateToProps, { updateExperience, getExperience })(EditExperience);