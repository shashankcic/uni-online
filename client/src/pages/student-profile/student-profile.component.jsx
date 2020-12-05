import React, { useEffect, Fragment } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import ProfileGithub from '../../components/profile-github/profile-github.component';
import Experience from '../../components/experience/experience.component';
import Education from '../../components/education/education.component';
import Spinner from '../../components/Spinner/Spinner.component';

import { getProfileById } from '../../redux/profile/profile-actions';

import './student-profile.styles.scss';

const StudentProfile = ({ getProfileById, profile: { profile }, match }) => {

    useEffect(() => {
        getProfileById(match.params.id);
    }, [getProfileById, match.params.id]);
    

    return (
        <div className='student-profile'>
            {profile === null ? (
                <Spinner />
            ) : (
                <div>
                    <div className='profile-header'>
                        <Link className="btn btn-light my-1 go-back" to="/students">
                            &#8678; Return
                        </Link>
                        <img src={profile.user.avatar} alt=""/>
                        <h2 className='name'>{profile.user.name.charAt(0).toUpperCase() + profile.user.name.slice(1)}</h2>
                        <p className='status'>{profile.status}</p>
                        <p className='location'>{profile.location}</p>

                        <Link className='button-styled' to={`/send-message/${match.params.id}`}>Send Message</Link>
                        <div className='links'>
                        {profile.website && (
                            <a className='mx-2' href={profile.website} target='_blank' rel='noopener noreferrer'>
                                <i className='fas fa-globe fa-2x icon-web' />
                            </a>
                            )}
                            {profile.social && profile.social.twitter && (
                            <a className='mx-2' href={profile.social.twitter} target='_blank' rel='noopener noreferrer'>
                                <i className='fab fa-twitter fa-2x icon-tw' />
                            </a>
                            )}
                            {profile.social && profile.social.facebook && (
                            <a className='mx-2' href={profile.social.facebook} target='_blank' rel='noopener noreferrer'>
                                <i className='fab fa-facebook fa-2x icon-fc' />
                            </a>
                            )}
                            {profile.social && profile.social.linkedin && (
                            <a className='mx-2' href={profile.social.linkedin} target='_blank' rel='noopener noreferrer'>
                                <i className='fab fa-linkedin fa-2x icon-lk' />
                            </a>
                            )}
                            {profile.social && profile.social.youtube && (
                            <a className='mx-2' href={profile.social.youtube} target='_blank' rel='noopener noreferrer'>
                                <i className='fab fa-youtube fa-2x icon-yt' />
                            </a>
                            )}
                            {profile.social && profile.social.instagram && (
                            <a className='mx-2' href={profile.social.instagram} target='_blank' rel='noopener noreferrer'>
                                <i className='fab fa-instagram fa-2x icon-it' />
                            </a>
                            )}
                            </div>
                    </div>

                    <div className='row profile-top'>
                        <div className='col-lg-6'>
                            <h3>About</h3>
                            <p>{profile.bio}</p>
                        </div>
                        
                        <div className='col-lg-6'>
                            <h3>Skills </h3>
                            <div className='row mx-2 mb-3'>
                                {
                                    profile.skills.map( (skill, index) => (
                                        <span key={index} className='skill m-1'>{skill}</span>
                                    ))
                                }
                            </div>
                        </div>
                    </div>

                    <div className='row profile-mid'>
                        <div className='col-lg-6'>
                            <h3>Experience</h3>
                            {profile.experience.length > 0 ? (
                                <Fragment>
                                {profile.experience.map((experience) => (
                                    <Experience key={experience._id} experience={experience} />
                                ))}
                                </Fragment>
                            ) : (
                                <h4>No experience credentials</h4>
                            )}
                        </div>

                        <div className='col-lg-6'>
                            <h3>Education</h3>
                            {profile.education.length > 0 ? (
                                <Fragment>
                                    {profile.education.map((education) => (
                                        <Education key={education._id} education={education} />
                                    ))}
                                </Fragment>
                            ) : (
                                <h4>No education credentials</h4>
                            )}
                        </div>
                    </div>

                    
                    <div className='github-repos'>
                        {profile.githubusername && (
                            <ProfileGithub username={profile.githubusername} />
                        )}
                    </div>
                </div>
            )}
        </div>
    )
}

const mapStateToProps = (state) => ({
    profile: state.profile
  });

export default connect(mapStateToProps, { getProfileById })(StudentProfile);