import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import PostCard from '../../components/post-card/post-card.component';
import PostForm from '../../components/post-form/post-form.component';
import { getPosts } from '../../redux/post/post-actions';

import './posts.styles.scss';

const Posts = ({ getPosts, post: { posts } }) => {
  useEffect(() => {
    getPosts();
  }, [getPosts]);

  return (
    <div className='posts mt-3'>
      <h1 className="large text-primary">Discussions</h1>
      <p className="lead mb-4">
        <i className="fas fa-user" /> Welcome to the communnity
      </p>
      <hr className='mb-5'/>
      <PostForm />

      <div className="posts">
        {posts.map((post) => (
            <PostCard key={post._id} post={post} />
        ))}
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  post: state.post
});

export default connect(mapStateToProps, { getPosts })(Posts);
