import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import { connect } from 'react-redux';
import { addExperience } from '../../redux/profile/profile-actions';

import './experience.styles.scss';

const Experience = ({ addExperience, history }) => {
    const [ formData, setFormData ] = useState({
        company: '',
        title: '',
        location: '',
        from: '',
        to: '',
        current: false,
        description: ''
    });

    const { company, title, location, from, to, current, description } = formData;

    const onChange = e =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

    return (
        <div className='experience'>
            <Link className="btn btn-light my-1 go-back" to="/dashboard">
                &#8678; Return
            </Link>
            <h1>Add your Experience details</h1>
            <p className="lead">
                <i className="fas fa-code-branch" /> 
                Add Experience or Positions that you held or currently hold
            </p>
            <form onSubmit={ e => {
                e.preventDefault(); 
                addExperience(formData, history);
                }}
            >
                <div className='row justify-content-lg-center'>
                    <div className='grid-input col-lg-8'>
                        <input 
                            type="text"
                            placeholder="Position"
                            name="title"
                            value={title}
                            onChange={onChange}
                            required   
                        />
                    </div>
                    <div className='grid-input col-lg-8'>
                        <input 
                            type="text" 
                            placeholder="Worked for" 
                            name="company"
                            value={company}
                            onChange={onChange}
                            required
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
                        <h4>Start Date</h4>
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
                            cols="30" rows="5"
                            placeholder="Descrição" 
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
    )
};

export default connect(null, { addExperience })(Experience);