import React from 'react';
import { Link } from 'react-router-dom';

import './dashboard-actions.styles.scss';

const DashboardActions = () => {
    return (
        <div className='dashboard-actions'>
            <Link className='dashboard-item' to='edit-profile'>
                <i className='fas fa-user-circle text-primary mr-2' /> Edit Profile
            </Link>
            <Link className='dashboard-item' to='/add-experience'>
                <i className='fab fa-black-tie text-primary mr-2' /> Add Experience
            </Link>
            <Link className='dashboard-item' to='/add-education'>
                <i className='fas fa-graduation-cap text-primary mr-2' /> Add Education
            </Link>
        </div>
    )
};

export default DashboardActions;