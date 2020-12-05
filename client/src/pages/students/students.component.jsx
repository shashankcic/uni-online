import React, { Fragment, useEffect, useState } from 'react';

import StudentCard from '../../components/student-card/student-card.component';
import Spinner from '../../components/Spinner/Spinner.component';

import { connect } from 'react-redux';
import { getProfiles } from '../../redux/profile/profile-actions';

import './students.styles.scss';

const SearchStudentsPage = ({ getProfiles, profile: { profiles, loading} }) => {

    useEffect(() => {
        getProfiles();
      }, [getProfiles]);

    const [search, setSearch] = useState('');

    //filter the profiles from the database with the search bar
    const filteredProfiles = profiles.filter(profile =>
        profile.user.name.toLowerCase().includes(search.toLowerCase()));

      

    return (
        <Fragment>
            {loading ? (
                <Spinner />
            ) : (
        

        <div className="search">
            <div className='header row'>
                <p className='title col-md-6 col-lg-6'>
                    <i><span>Search</span></i> and <i><span>connect with</span></i> professionals in the area
                    </p>
                <div className='form col-md-5 col-md-4'>
                    <form onSubmit={e => { e.preventDefault();}}>
                        <input 
                            type="text"
                            name="search"
                            value={search}
                            placeholder="Search"
                            onChange={ e => setSearch(e.target.value)}
                        />
                    </form>
                </div>
            </div>

            <div className='row justify-content-center'>

            {filteredProfiles.length > 0 ? (
                filteredProfiles.map(profile => (
                    <StudentCard key={profile._id} profile={profile} />
                ))
            ) : (
                <h4>No profiles found...</h4>
            )}

            </div>

        </div>
        )}
        </Fragment>
    )
};

const mapStateToProps = state => ({
    profile: state.profile
  });

export default connect(mapStateToProps, { getProfiles })(SearchStudentsPage);