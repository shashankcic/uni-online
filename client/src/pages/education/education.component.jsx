import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import { connect } from 'react-redux';
import { addEducation } from '../../redux/profile/profile-actions';

import './education.styles.scss';

const AddEducationPage = ({ addEducation, history }) => {

    const [formData, setFormData] = useState({
        school: '',
        degree: '',
        fieldofstudy: '',
        from: '',
        to: '',
        current: false,
        description: ''
    });

    const {
        school,
        degree,
        fieldofstudy,
        from,
        to,
        description,
        current
    } = formData;

    const onChange = e =>
    setFormData({ ...formData, [e.target.name]: e.target.value });



    return (
        <div className='education'>
            <Link className="btn btn-light my-1 go-back" to="/dashboard">
                &#8678; Return
            </Link>
            <h1>Add your Education details</h1>
            <p>
                <i className="fas fa-code-branch" /> 
                Add Schools, Former Education, Bootcamps, Courses
            </p>
            <form 
                onSubmit={ e => {
                    e.preventDefault();
                    addEducation(formData, history);
                }}
            >
                <div className='row justify-content-lg-center'>
                    <div className='grid-input col-lg-8'>
                        <input 
                            type="text"
                            placeholder="Institute"
                            name="school"
                            value={school}
                            onChange={onChange}
                            required
                        />
                    </div>
                    <div className='grid-input col-lg-8'>
                        <input 
                            type="text"
                            placeholder="Degree"
                            name="degree"
                            value={degree}
                            onChange={onChange}
                            required
                        />
                    </div>
                    <div className='grid-input col-lg-8'>
                        <input 
                            type="text" 
                            placeholder="Field of Study"
                            name="fieldofstudy"
                            value={fieldofstudy}
                            onChange={onChange} 
                        />
                    </div>
                    <div className='date-input col-lg-8'>
                        <h4>Start Date</h4>
                        <input 
                            type="date"
                            name="from"
                            value={from}
                            onChange={onChange}
                        />
                    </div>
                    <div className='checkbox col-lg-8'>
                            <input 
                                type="checkbox"
                                name="current"
                                checked={current}
                                value={current}
                                onChange={() => 
                                    setFormData({...formData, current: !formData.current})
                                }
                            />{' '}
                            <span>Till Present</span>
                    </div>
                    <div className='date-input col-lg-8'>
                        <h4>End Date</h4>
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
                            name="description" 
                            cols="30" 
                            rows="5" 
                            placeholder="Descrição"
                            value={description}
                            onChange={onChange}
                        />
                    </div>
                    <div className='col-lg-8'>
                        <button className='button-send'>Submit</button>
                    </div>
                </div>
            </form>
        </div>
    )
};

export default connect(null, { addEducation })(AddEducationPage);