import React from 'react';
import { Link } from 'react-router-dom';

import './student-card.styles.scss';

const StudentCard = ({ profile: { user: { _id, name, avatar }, status, company, location, skills }}) => {
  return (
    <div className='student-card mx-3 my-2'>
        <img style={{width: "100px"}} src={avatar} alt=""/>
        <p className='name'>{name}</p>
        <p>{status}</p>

        <div className='row mx-2 mb-3'>
            {skills.slice(0, 4).map((skill, index) => (
                <span key={index} className='skill mx-1 mb-1 my-1'>
                    {skill.substring(0, 8)}
                </span>
            ))}
        </div>
        <Link className='mt-2 link' to={`/profile/${_id}`}>
            View Full Profile
        </Link>
    </div>
  );
};

export default StudentCard;
