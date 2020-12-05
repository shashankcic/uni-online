import React, { useState } from 'react';
import { connect } from 'react-redux';
import { addComment } from '../../redux/post/post-actions';

import './comment-form.styles.scss';

const CommentForm = ({ postId, addComment }) => {
  const [text, setText] = useState('');

  return (
    <div className='comment-form'>
      <form
        className='form my-1'
        onSubmit={e => {
          e.preventDefault();
          addComment(postId, { text });
          setText('');
        }}
      >
        <textarea
          name='text'
          cols='30'
          rows='5'
          placeholder='Leave a comment'
          value={text}
          onChange={e => setText(e.target.value)}
          required
        />
        <button>Reply <i className="fas fa-reply ml-3" /></button>
      </form>
    </div>
  );
};

export default connect( null, { addComment } )(CommentForm);
