import React, { Component } from 'react';
import Post from './post.jsx';
// post list will need to render all post for all feeds by rendering stuff from store
// best to have three way conditional rendered views due to styling
// main feed,
//watching feed, barttering feed
// selling list --> needs aditional button to create listing and delete listings and render if it was bartered or not

class PostList extends Component {
  constructor() {
    super();
  }
  render() {
    return (
      <div>
        Hello from Postlist
        <Post />
      </div>
    );
  }
}

export default PostList;
