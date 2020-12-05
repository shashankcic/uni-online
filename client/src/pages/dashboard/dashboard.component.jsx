import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';

import DashboardActions from '../../components/dashboard-actions/dashboard-actions.component';
import Experience from '../../components/experience/experience.component';
import Education from '../../components/education/education.component';
//import EditExperience from '../../pages/edit-experience/edit-experience.component';

import { connect } from 'react-redux';
import { getCurrentProfile, deleteAccount } from '../../redux/profile/profile-actions';

import './dashboard.styles.scss';
import Spinner from '../../components/Spinner/Spinner.component';

const Dashboard = ({ getCurrentProfile, auth: { user }, profile: { profile, loading }}) => {
  useEffect(() => {
    getCurrentProfile();
  }, [getCurrentProfile]);

  if(loading) return <Spinner />
  else
  return (
    <div className='dashboard'>
      <DashboardActions />
      <h1>Dashboard</h1>
      
      {profile !== null ? (
        <div>
          <div className='info row justify-content-around'>
            
            <div className='col-lg-5 text-align'>
              <h4 className="my-4">Experience</h4>
                {
                  profile.experience && profile.experience.length > 0
                    ? 
                      profile.experience.map( exp => (
                        <Experience key={exp._id} experience={exp} displayButtons='true' />
                      )) 
                    : 
                      <p>You haven't added any Experience details yet. Click
                        <Link to='/add-experience'> here</Link> to add details.
                      </p>
                }
            </div>

            <div className='col-lg-5'>
              <h4 className='my-4'>Education</h4>
              {
                profile.education && profile.education.length > 0
                  ?
                    profile.education.map( edu => (
                      <Education key={edu._id} education={edu} displayButtons='true' />
                    ))
                  :
                  <p>You haven't added any Education details yet. Click 
                    <Link to='/add-education'> here</Link> to add details.
                  </p>
              }
            </div>

          </div>

        </div>
      ) : (
        <div>
          <p>You haven't created a profile yet. Create one now.</p>
          <Link to="/create-profile" className="btn btn-primary my-1 mb-5">
            Create Profile
          </Link>
        </div>
      )}
    </div>
  );
};


const mapStateToProps = (state) => ({
  auth: state.user,
  profile: state.profile
});

export default connect(mapStateToProps, { getCurrentProfile, deleteAccount })(Dashboard);
