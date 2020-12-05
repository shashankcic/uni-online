import React, { useState } from 'react';

import { connect } from 'react-redux';
import { addPost } from '../../redux/post/post-actions';

import './post-form.styles.scss';

const PostForm = ({ addPost }) => {
  const [title, setTitle] = useState('');
  const [text, setText] = useState('');

  return (
    <div className='post-form'>

      <form
        className='form my-1'
        onSubmit={e => {
          e.preventDefault();
          addPost({ title, text });
          setTitle('');
          setText('');
        }}
      >
        <input 
          className='input-title'
          type="text" 
          placeholder='Topic' 
          name="title"
          value={title}
          onChange={e => setTitle(e.target.value)}
          required/>

        <textarea
          className='input-desc'
          type="text"
          rows="10"
          cols="50"
          placeholder='Description'
          name='text'
          value={text}
          onChange={e => setText(e.target.value)}
          required
        />
        
        <button> Submit <i className="fas fa-chevron-circle-right"></i></button>
      </form>
    </div>
  );
};

export default connect( null, { addPost })(PostForm);
