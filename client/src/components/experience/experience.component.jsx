import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import Moment from 'react-moment';
import moment from 'moment';
import { connect } from 'react-redux';
import { deleteExperience } from '../../redux/profile/profile-actions';

import './experience.styles.scss';

const Experience = ({ experience, deleteExperience, displayButtons }) => {

  return (
    <div>
      <div className="experiences ml-2">
        <div className='row'>
          <div className='col-lg-6'>
            <h5>Organisation</h5>
            <p>{experience.company}</p>
          </div>
          <div className='col-lg-6'>
            <h5>Position</h5>
            <p>{experience.title}</p>
          </div>
          <div className='col-lg-6'>
            <h5>Location</h5>
            <p>{experience.location}</p>
          </div>
          <div className='col-lg-6'>
            <h5>Years</h5>
            <p>{<Moment format="YYYY/MM/DD">{moment.utc(experience.from)}</Moment>} - {experience.current ? 'till present' : <Moment format="YYYY/MM/DD">{moment.utc(experience.to)}</Moment>}</p>
          </div>
          <div className='col-lg-12 mb-3'>
            <h5>Description</h5>
            {experience.description}
          </div>
          {displayButtons ? (
            <Fragment>
              <div className='col-lg-6'>
                <Link to={`/edit-experience/${experience._id}`} className='edit-button'>
                  <i className="far fa-edit mr-2"></i>
                  Edit
                </Link>
              </div>
              <div className='col-lg-6'>
                <button className='delete-button' onClick={() => deleteExperience(experience._id)}>
                  <i className="far fa-trash-alt mr-2"></i>
                  Delete
                  </button>
              </div>
            </Fragment>) : null}
        </div>
      </div>
    </div>
  );
};

export default connect( null, { deleteExperience })(Experience);
