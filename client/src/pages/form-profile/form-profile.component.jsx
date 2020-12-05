import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { createProfile, getCurrentProfile } from '../../redux/profile/profile-actions';

import './form-profile.styles.scss';

const initialState = {
  company: '',
  website: '',
  location: '',
  phone: '',
  email: '',
  status: '',
  skills: '',
  githubusername: '',
  bio: '',
  twitter: '',
  facebook: '',
  linkedin: '',
  youtube: '',
  instagram: ''
};

const FormProfile = ({ profile: { profile, loading }, createProfile, getCurrentProfile, history }) => {
  const [formData, setFormData] = useState(initialState);

  const [displaySocialInputs, toggleSocialInputs] = useState(false);

  useEffect(() => {
    if (!profile){
      getCurrentProfile();
    } 
    if (!loading && profile) {
      const profileData = { ...initialState };
      // Check if there is a key for each element of profileData, if so it'll receive the value from redux(profile)
      for (const key in profile) {
        if (key in profileData) profileData[key] = profile[key];
      }

      // same thing here with social profile
      for (const key in profile.social) {
        if (key in profileData) profileData[key] = profile.social[key];
      }

      //Check if is the obj is an array, if so it'll split the code by a comma.
      if (Array.isArray(profileData.skills))
        profileData.skills = profileData.skills.join(', ');

    // updated inputs with profileData
      setFormData(profileData);
    }
  }, [loading, getCurrentProfile, profile]);

  const {
    company,
    website,
    phone,
    email,
    location,
    status,
    skills,
    githubusername,
    bio,
    twitter,
    facebook,
    linkedin,
    youtube,
    instagram
  } = formData;

  const onChange = e =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = e => {
    e.preventDefault();
    createProfile(formData, history, profile ? true : false);
  };

  return (
    <div className='main-container'>
      {/*console.log('lol')*/}
      <Link className="btn btn-light my-1 go-back" to="/dashboard">
        &#8678; Return
      </Link>
      {profile ? <h1>Edit your profile</h1> : <h1>Create your profile</h1>}
      <form onSubmit={onSubmit}>
        
        <div className='form-profile row justify-content-between'>
          <div className='grid-input col-lg-5 '>
            <select name="status" value={status} onChange={onChange}>
              <option>Professional Status</option>
              <option value="Student">Student</option>
              <option value="Professor">Professor</option>
              <option value="Developer">Developer</option>
              <option value="Designer">Designer</option>
              <option value="Engineer">Engineer</option>
              <option value="Architect">Architect</option>
              <option value="Other">Other</option>
            </select>
          </div>

          <div className='grid-input col-lg-5'>
            <input
              type="text"
              placeholder="Company"
              name="company"
              value={company}
              onChange={onChange}
            />
          </div>

          <div className='grid-input col-lg-5'>
            <input
              type="text"
              placeholder="Website"
              name="website"
              value={website}
              onChange={onChange}
            />

          </div>
          <div className='grid-input col-lg-5'>
            <input
              type="text"
              placeholder="email"
              name="email"
              value={email}
              onChange={onChange}
            />  
          </div>

          <div className='grid-input col-lg-5'>
            <input
              type="text"
              placeholder="Phone"
              name="phone"
              value={phone}
              onChange={onChange}
            />
          </div>

          <div className='grid-input col-lg-5'>
            <input
              type="text"
              placeholder="Locality"
              name="location"
              value={location}
              onChange={onChange}
            />
          </div>

          <div className='grid-input col-lg-5'>
            <input
              type="text"
              placeholder="Skills"
              name="skills"
              value={skills}
              onChange={onChange}
            />
          </div>

          <div className='grid-input col-lg-5'>
            <input
              type="text"
              placeholder="Github Username"
              name="githubusername"
              value={githubusername}
              onChange={onChange}
            />
          </div>
        
        <div className='col-lg-5'>
          <textarea
              placeholder="Give a brief description about your professional life"
              rows="7"
              cols="37"
              name="bio"
              value={bio}
              onChange={onChange}
            />
        </div>
          
        

        <div className='col-lg-5'>
          <button
            className='btn btn-outline-info'
            onClick={() => toggleSocialInputs(!displaySocialInputs)}
            type="button"
          >
            Add Social Network Handles
          </button>
          {displaySocialInputs && (
          <div>
            <div className='social-network'>
              <i className="fab fa-twitter fa-2x" />
              <input
                type="text"
                placeholder="Twitter URL"
                name="twitter"
                value={twitter}
                onChange={onChange}
              />
            </div>

            <div className='social-network'>
              <i className="fab fa-facebook fa-2x" />
              <input
                type="text"
                placeholder="Facebook URL"
                name="facebook"
                value={facebook}
                onChange={onChange}
              />
            </div>

            <div className='social-network'>
              <i className="fab fa-youtube fa-2x" />
              <input
                type="text"
                placeholder="YouTube URL"
                name="youtube"
                value={youtube}
                onChange={onChange}
              />
            </div>

            <div className='social-network'>
              <i className="fab fa-linkedin fa-2x" />
              <input
                type="text"
                placeholder="Linkedin URL"
                name="linkedin"
                value={linkedin}
                onChange={onChange}
              />
            </div>

            <div className='social-network'>
              <i className="fab fa-instagram fa-2x" />
              <input
                type="text"
                placeholder="Instagram URL"
                name="instagram"
                value={instagram}
                onChange={onChange}
              />
            </div>
          </div>
        )}
        </div>
          
        <div className='col-lg-8'>
          <button className='button-send'>Submit</button>
        </div>

        </div>

        
      </form>
    </div>
  );
};

const mapStateToProps = state => ({
  profile: state.profile
});

export default connect(mapStateToProps, { createProfile, getCurrentProfile })(FormProfile);
