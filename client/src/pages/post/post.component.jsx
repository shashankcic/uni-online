import React, { Fragment, useEffect } from 'react';
import { connect } from 'react-redux';
import Spinner from '../../components/Spinner/Spinner.component';
import PostCard from '../../components/post-card/post-card.component'
import CommentForm from '../../components/comment-form/comment-form.component';
import CommentCard from '../../components/comment-card/comment-card.component';
import { getPost } from '../../redux/post/post-actions';

const Post = ({ getPost, post: { post, loading }, match }) => {

  useEffect(() => {
    getPost(match.params.id);
  }, [getPost, match.params.id, post]);

  return loading || post === null ? (
    <Spinner />
  ) : (
    <Fragment>
      <PostCard post={post} />
      <CommentForm postId={post._id} />
      {post.comments.map(comment => (
        <CommentCard key={comment._id} comment={comment} postId={post._id} />
      ))}
    </Fragment>
  );
};

const mapStateToProps = (state) => ({
  post: state.post
});

export default connect(mapStateToProps, { getPost })(Post);
