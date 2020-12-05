import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';

import { getMessage, sendMessage } from '../../redux/message/message-actions';

import Message from '../../components/message/message.component';

import './message.styles.scss';

const MessagePage = ({ getMessage, user, messages: { message }, match, sendMessage }) => {

    useEffect(() => {
        getMessage(match.params.id);
    }, [getMessage, match.params.id]);

    const [messageForm, setMessageForm] = useState('');

    const handleSubmit = (event) => {
        event.preventDefault();
        sendMessage(messageForm, match.params.id);
        setMessageForm('');
        getMessage(match.params.id);
      }

      // console.log('haa');
      
    if(message.message && message.message.length > 0)
    return (
        <div className='message-page'>
            {
                message.message.map( (message, i) => (
                    <Message key={i} message={message} username={user.user.name}/>
                ))
            }
            <form className='form' onSubmit={handleSubmit}>
                <textarea 
                    className='mt-3'
                    rows='5'
                    cols='80'
                    placeholder="Type a Message..."
                    name="messageForm"
                    value={messageForm}
                    onChange={ e => setMessageForm(e.target.value)} 
                    required
                />
                <div>
                    <button className='button-send'>Send</button>
                </div>
            </form>
        </div>
    )
    else
        return(<div>You have no messages</div>)
}

const mapStateToProps = (state) => ({
    messages: state.messages,
    user: state.user
});

export default connect(mapStateToProps, { getMessage, sendMessage })(MessagePage);