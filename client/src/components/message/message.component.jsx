import React from 'react';

import './message.styles.scss';

const Message = ({ message, username }) => {
    const check = message.includes(`${username}:`);
    return (
        <div className={check ? 'user-message': 'message'}>
            {message}
        </div>
    )
}

export default Message;