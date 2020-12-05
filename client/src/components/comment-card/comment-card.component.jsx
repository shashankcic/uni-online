import React from 'react';
import { Link } from 'react-router-dom';
import Moment from 'react-moment';

import { connect } from 'react-redux';

import { deleteComment } from '../../redux/post/post-actions';

import './comment-card.styles.scss';

const CommentCard = ({
    postId,
    comment: { _id, text, name, avatar, user, date },
    auth,
    deleteComment
  }) => {
    return (
    <div className='comment-card row '>
    <div className='col-lg-2 first'>
      <Link to={`/profile/${user}`}>
        <img className='round-img' src={avatar} alt='' />
        <h4>{name}</h4>
      </Link>
        {!auth.loading && user === auth.user._id && (
            <button
                onClick={() => deleteComment(postId, _id)}
              type='button'
              className='btn-danger'
            >
              <i className="far fa-trash-alt" />
            </button>
        )}
    </div>

    <div className='col-lg-8 mt-4'>
      <p className='mb-4'>{text}</p>
    </div>

    <div className='col-lg-2 third'>
      <p className='post-date'>
        Posted on <Moment format='YYYY/MM/DD'>{date}</Moment>
      </p>
    </div>

  </div>
    )
}

const mapStateToProps = state => ({
    auth: state.user
  });

export default connect(mapStateToProps, {deleteComment} )(CommentCard);