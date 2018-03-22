import React, { Component } from 'react';
import { connect } from 'react-redux';
import { addCurrentList } from '../../actions';
import { bindActionCreators } from 'redux';
import axios from 'axios';
import { GridList, GridTile } from 'material-ui/GridList';
import Subheader from 'material-ui/Subheader';
import IconButton from 'material-ui/IconButton';
import Delete from 'material-ui/svg-icons/action/delete';

const styles = {
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around'
  },
  gridList: {
    width: 500,
    height: 450,
    overflowY: 'auto'
  }
};

class WatchingPostList extends Component {
  constructor(props) {
    super(props);
  }

  async componentWillMount() {
    //grab data from db, update store
    try {
      let id = this.props.active_user.id;
      console.log('the id is', this.props.active_user);
      const { data } = await axios.get(
        `http://localhost:3396/api/watchers/${id}`
      );
      this.props.addCurrentList(data);
    } catch (err) {
      console.log('err fetching posts', err);
    }
  }

  async removeFromWatchList(userId, postId) {
    try {
      const { data } = await axios.delete(
        `http://localhost:3396/api/watchers/${userId}/${postId}`
      );
      this.props.addCurrentList(data);
      console.log('successfully deleted post from watch list!');
    } catch (err) {
      console.log('err deleting a post from your watch list');
    }
  }

  render() {
    return (
      <div style={styles.root}>
        <GridList cellHeight={200} style={styles.gridList}>
          {this.props.current_list &&
            this.props.current_list.map(post => (
              <GridTile
                key={post.id}
                title={post.title}
                subtitle={
                  <span>
                    <b>{post.username}</b>
                  </span>
                }
                onClick={e => {
                  e.preventDefault();
                  console.log('Clicked post id:', post.id);
                }}
                actionIcon={
                  <IconButton
                    onClick={e => {
                      e.stopPropagation();
                      this.removeFromWatchList(
                        this.props.active_user.id,
                        post.id
                      );
                    }}
                  >
                    <Delete color="white" />
                  </IconButton>
                }
              >
                <img src={post.main_photo} />
              </GridTile>
            ))}
        </GridList>
      </div>
    );
  }
}
function mapStateToProps(state) {
  return {
    current_list: state.current_list,
    active_user: state.active_user
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      addCurrentList
    },
    dispatch
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(WatchingPostList);
