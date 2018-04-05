import React, { Component } from 'react';
import { connect } from 'react-redux';
import { addCurrentList, addCurrentPost } from '../../actions';
import { bindActionCreators } from 'redux';
import axios from 'axios';
// import { GridList, GridTile } from 'material-ui/GridList';
// import Subheader from 'material-ui/Subheader';
import DropDownMenu from 'material-ui/DropDownMenu';
import MenuItem from 'material-ui/MenuItem';
import { geocodeByAddress, getLatLng } from 'react-places-autocomplete';
import Geolocation from '../Map/geolocation.jsx';
import { getDistance } from 'geolib';
import Avatar from 'material-ui/Avatar';
import Chip from 'material-ui/Chip';

const { REST_SERVER_URL } = process.env;
const geolib = require('geolib');

const styles = {
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
  },
  gridList: {
    width: 500,
    height: 450,
    overflowY: 'auto',
  },
};

class HomePostList extends Component {
  constructor(props) {
    super(props);
    this.state = { value: 1 };
  }

  async componentWillMount() {
    try {
      const { data } = await axios.get(`${REST_SERVER_URL}/api/posts`);
      data.sort((a, b) => b.id - a.id);
      // const modifiedData = await this.getDistance(data);
      this.props.addCurrentList(data);
      const testData = this.props.current_list;
      this.runGetDistance(testData);
    } catch (err) {
      console.log('Error on componentWillMount - homePostList', err);
    }
  }
  runGetDistance = (data) => {
    // const data = this.props.current_list;
    let counter = 0;
    for (let i = 0; i < data.length && counter < 10; i++) {
      if (!data[i].distance) {
        this.getDistance(data[i]);
        counter++;
      }
    }
    setTimeout(() => this.runGetDistance(data), 30000);
  };
  getDistance = async (data) => {
    // console.log('reached data', data);
    // for (let i = 0; i < data.length; i++) {
    // console.log('reached here 4');
    // if (i === 8) break;
    const address = data.location;
    const results = await geocodeByAddress(address);
    const latLng = await getLatLng(results[0]);
    // console.log('reached here 5');
    const lat1 = parseFloat(localStorage.getItem('usersLat')) || 33;
    const lon1 = parseFloat(localStorage.getItem('usersLng')) || -118;
    const lat2 = latLng.lat;
    const lon2 = latLng.lng;
    // console.log('reached here 6');
    const radlat1 = Math.PI * lat1 / 180;
    const radlat2 = Math.PI * lat2 / 180;
    const theta = lon1 - lon2;
    const radtheta = Math.PI * theta / 180;
    let dist =
      Math.sin(radlat1) * Math.sin(radlat2) +
      Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
    dist = Math.acos(dist);
    dist = dist * 180 / Math.PI;
    dist = dist * 60 * 1.1515;
    // const distance = geolib.getDistance(
    //   {
    //     latitude: parseFloat(localStorage.getItem('usersLat')) || 33,
    //     longitude: parseFloat(localStorage.getItem('usersLng')) || -118
    //   },
    //   latLng
    // );
    data.distance = Math.round(dist * 0.8684);
    // console.log('the result is ', data);
    // }
    return data;
  };
  switchToSinglePost = async (post) => {
    try {
      this.props.addCurrentPost(post);
      this.props.history.push(`/post/${post.id}`);
    } catch (err) {
      console.log('homepostswitch', err);
    }
  };

  switchToProfile = async (userId) => {
    try {
      if (this.props.active_user) {
        userId === this.props.active_user.id
          ? this.props.history.push('/profile/selling')
          : this.props.history.push(`/othersprofile/${userId}`);
      } else {
        this.props.history.push('/login');
      }
    } catch (err) {
      console.log('error on switchToProfile - homePostList', err);
    }
  };

  handleChange = async (event, index, value) => {
    this.setState({ value });
    if (value === 1) {
      const { data } = await axios.get(`${REST_SERVER_URL}/api/posts`);
      data.sort((a, b) => b.id - a.id);
      this.props.addCurrentList(data);
    } else if (value === 2) {
      const { data } = await axios.get(`${REST_SERVER_URL}/api/posts`);
      // UNCOMMENT THIS CODE WHEN DANIEL FINISHES DISTANCE CALCULATION
      // data.sort((a, b) => a.distance - b.distance);

      // this is sorting by alphabetical order (placeholder until distance is setup)
      data.sort((a, b) => {
        if (a.title < b.title) {
          return -1;
        }
        return 1;
      });
      this.props.addCurrentList(data);
    }
  };

  render() {
    return (
      <div className="homepost">
        <div>
          {' '}
          <DropDownMenu
            value={this.state.value}
            onChange={this.handleChange}
            openImmediately={false}
            style={{ float: 'right' }}
          >
            <MenuItem value={1} primaryText="Sort by Newest" />
            <MenuItem value={2} primaryText="Sort by Distance" />
          </DropDownMenu>
        </div>

        <div className="containerr">
          <div className="columnss">
            {this.props.current_list &&
              this.props.current_list.filter(post => post.status !== 'SWAPPED').map(post => (
                <div className="card" key={post.id} onClick={() => this.switchToSinglePost(post)}>
                  <div className="card-image centered">
                    <img src={post.main_photo} className="img-responsive" />
                    <div className="overlay">
                      <div className="overlaytext">
                        <strong>Description: </strong>
                        <br />
                        {post.description}
                        <Chip
                          style={{
                            margin: 'auto',
                            width: '100%',
                            bottom: '0',
                            position: 'absolute',
                            backgroundColor: 'rgb(5, 102, 220)',
                          }}
                          onClick={(e) => {
                            e.stopPropagation();
                            this.switchToProfile(post.user_id);
                          }}
                        >
                          <Avatar src={post.photo_url} />
                          <div style={{ color: 'white', fontWeight: 'bold' }}>{post.username}</div>
                        </Chip>
                      </div>
                    </div>
                  </div>
                  <div className="bottomhalf">
                    <div className="card-header centered">
                      <div className="card-title h5 centered">{post.title}</div>
                      <div className="card-subtitle centered">
                        {post.distance ? post.distance : null} miles away
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            <Geolocation />
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    current_list: state.current_list,
    active_user: state.active_user,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      addCurrentList,
      addCurrentPost,
    },
    dispatch,
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(HomePostList);

{
  /* <div>
<figure className="avatar avatar-lg float-left">
  <img src={post.photo_url} />
</figure>
<div style={{ color: 'white' }}>{post.username}</div>
</div> */
}
