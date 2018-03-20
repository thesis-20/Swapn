import React, { Component } from 'react';
import RaisedButton from 'material-ui/RaisedButton';

//edit post should reopen addPost but with the info already filled out including photos
//should render chats if there are ongoing offers

// COMMENTS FROM EDDIE
// maybe we could create a EDIT button that will render the editPost.jsx
// this component renders when the SELLER goes to their POST
// - need to link in follows
// - ADD more images
// - COMPLETED TRANSACTION = button that marks item as SOLD

class SellerPost extends Component {
  constructor(props) {
    super(props);
    this.state = {
      post: '',
      photos: []
    };
  }

  async componentWillMount() {
    this.getPost();
    this.getPhotos();
  }

  async getPost() {
    let postId = this.props.post.id;
    const { data } = await axios.get(
      `http://localhost:3396/api/posts/${postId}`
    );
    this.setState({
      post: data
    });
  }

  async getPhotos() {
    let postId = this.props.post.id;
    const { data } = await axios.get(
      `http://localhost:3396/api/photos/${postId}`
    );
    this.setState({
      photos: data
    });
  }

  async removePost() {
    let postId = this.props.post.id;
    const { data } = await axios.delete(
      `http://localhost:3396/api/photos/${postId}`
    );
  }

  render() {
    return (
      <div>
        <p>Post info</p>
        {this.state.post}
        <p>Photo</p>
        {this.state.photos}
        <RaisedButton
          label="Complete Transaction"
          secondary={true}
          style={{ margin: 12 }}
          onClick={() => this.removePost()}
        />
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    post: state.current_post
  };
}

export default connect(mapStateToProps)(SellerPost);
