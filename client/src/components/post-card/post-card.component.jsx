import React from 'react';
import { Link } from 'react-router-dom';
import Moment from 'react-moment';
import { connect } from 'react-redux';
import { addLike, removeLike, deletePost } from '../../redux/post/post-actions';

import './post-card.styles.scss';

const PostItem = ({
  addLike,
  removeLike,
  deletePost,
  auth,
  post: { _id, title, text, name, avatar, user, likes, comments, date }
}) => (
  <div className='post-card row '>
    
    <div className='col-lg-2 first'>
      <Link to={`/profile/${user}`}>
        <img className='round-img' src={avatar} alt='' />
        <h4>{name}</h4>
      </Link>
        {!auth.loading && user === auth.user._id && (
            <button
              onClick={() => deletePost(_id)}
              type='button'
              className='btn-danger'
            >
              <i className="far fa-trash-alt" />
            </button>
        )}
    </div>

    <div className='col-lg-8 align-self-end'>
      <h4>{title}</h4>
      <p className='mb-4'>{text}</p>
      <div className='discussion'>
      <Link to={`/posts/${_id}`}>
        View Discussion{' '}
        {comments.length > 0 && (
          <span className='comment-count'>{comments.length}</span>
        )}
      </Link>
      </div>
    </div>

    <div className='col-lg-2 third'>
      <p className='post-date'>
        Posted on <Moment format='YYYY/MM/DD'>{date}</Moment>
      </p>
      <div className='likes'>
      <button
        onClick={() => addLike(_id)}
        type='button'
        className='border-none mx-1'
      >
        <i className="fas fa-arrow-up" />{' '}
        <span>{likes.length > 0 && <span>{likes.length}</span>}</span>
      </button>
      <button
        onClick={() => removeLike(_id)}
        type='button'
        className='border-none mx-1'
      >
        <i className="fas fa-arrow-down" />
      </button>
      </div>
    </div>

  </div>
);



const mapStateToProps = state => ({
  auth: state.user
});

export default connect(
  mapStateToProps,
  { addLike, removeLike, deletePost }
)(PostItem);
