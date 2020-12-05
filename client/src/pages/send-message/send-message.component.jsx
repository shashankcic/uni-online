import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { sendMessage } from '../../redux/message/message-actions';
import { getProfileById } from '../../redux/profile/profile-actions';

import Spinner from '../../components/Spinner/Spinner.component';

import './send-message.styles.scss';

const SendMessagePage = ({ sendMessage, user, match, getProfileById, profile }) => {
    const to = match.params.id;
    
    //const from = user.user._id;
    const [message, setMessage] = useState('');

    useEffect(() => {
        getProfileById(to);
    },[getProfileById, to]);

    const handleSubmit = (event) => {
        event.preventDefault();
        sendMessage(message,to);
        setMessage('');
      }
    
    if(profile)
    return (
        <div className='send-message mt-5'>
            <h3>Send a message to {profile.user.name}</h3>
            <img src={profile.user.avatar} alt="profile" className='mt-3'/>
            <h5 className='mt-3'>{profile.status}</h5>
            <p>{profile.email}</p>
            <form onSubmit={handleSubmit}>
                <textarea 
                    className='mt-3'
                    rows='5'
                    cols='80'
                    placeholder="Type a message..."
                    name="message"
                    value={message}
                    onChange={ e => setMessage(e.target.value)} 
                    required
                />
                <div>
                    <button className='button-send'>Send</button>
                </div>
            </form>
        </div>
    )
    else{
        return (
            <Spinner />
        )
    }
}

const mapStateToProps = state => ({
    user: state.user,
    profile: state.profile.profile
  });

export default connect(mapStateToProps, { sendMessage, getProfileById })(SendMessagePage);
