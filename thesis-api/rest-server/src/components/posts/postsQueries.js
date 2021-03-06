import db from '../../config/database';

import {
  fetchUserPostsHelper,
  fetchAllPostsHelper,
  fetchSinglePostsHelper,
  updatePostsHelper,
  deletePostsHelper,
  addPostsHelper,
  increaseWCountHelper,
  decreaseWCountHelper
} from './postsSQLHelpers';

export const fetchAllPostsQuery = async payload => {
  try {
    const queryString = fetchAllPostsHelper(payload);
    const data = await db.queryAsync(queryString);
    console.log('fetchAllPostsQuery - successfully retrieved data');
    return data.rows;
  } catch (err) {
    console.log(err);
  }
};

export const fetchUserPostsQuery = async payload => {
  try {
    const queryString = fetchUserPostsHelper();
    const data = await db.queryAsync(queryString, [payload.user_id]);
    console.log('fetchUserPostsQuery - successfully retrieved data');
    return data.rows;
  } catch (err) {
    console.log(err);
  }
};

export const fetchSinglePostsQuery = async payload => {
  try {
    const queryString = fetchSinglePostsHelper();
    const data = await db.queryAsync(queryString, [payload.post_id]);
    console.log('fetchSinglePostsQuery - successfully retrieved data');
    return data.rows;
  } catch (err) {
    console.log(err);
  }
};

export const addPostsQuery = async (user, payload) => {
  try {
    const queryString = addPostsHelper();
    const data = await db.queryAsync(queryString, [
      user.user_id,
      payload.title,
      payload.description,
      payload.condition,
      payload.location,
      payload.category,
      payload.demand,
      payload.status
    ]);
    console.log('addPostsQuery - successfully retrieved data');
    return data;
  } catch (err) {
    console.log(err);
  }
};

export const deletePostsQuery = async payload => {
  try {
    const queryString = deletePostsHelper();
    const data = await db.queryAsync(queryString, [
      payload.user_id,
      payload.post_id
    ]);
    console.log('deletePostsQuery - successfully retrieved data');
    return data;
  } catch (err) {
    console.log(err);
  }
};

export const updatePostsQuery = async (user, payload) => {
  try {
    const queryString = updatePostsHelper();
    const data = await db.queryAsync(queryString, [
      user.user_id,
      user.post_id,
      payload.title,
      payload.description,
      payload.condition,
      payload.location,
      payload.demand,
      payload.status,
      payload.main_photo,
      payload.tradingWith
    ]);
    console.log('updatePostsQuery - successfully retrieved data');
    return data;
  } catch (err) {
    console.log(err);
  }
};

export const increaseWCountQuery = async payload => {
  try {
    const queryString = increaseWCountHelper();
    const data = await db.queryAsync(queryString, [payload.post_id]);
    console.log('fetchSinglePostsQuery - successfully retrieved data');
    return data.rows;
  } catch (err) {
    console.log(err);
  }
};

export const decreaseWCountQuery = async payload => {
  try {
    const queryString = decreaseWCountHelper();
    const data = await db.queryAsync(queryString, [payload.post_id]);
    console.log('fetchSinglePostsQuery - successfully retrieved data');
    return data.rows;
  } catch (err) {
    console.log(err);
  }
};
