import {
  fetchAllPhotosQuery,
  addPhotosQuery,
  removePhotosQuery,
  removeAllPhotosQuery,
} from '../photos/photosQueries';

export const fetchAllPhotosController = async (req, res) => {
  const payload = req.params;
  try {
    const data = await fetchAllPhotosQuery(payload);
    return res.status(200).send(data);
  } catch (err) {
    console.log(err);
  }
};

export const addPhotosController = async (req, res) => {
  const payload = req.params;
  try {
    const { url } = req.body;
    const data = await addPhotosQuery(payload, url);
    return res.status(200).send(data);
  } catch (err) {
    console.log(err);
  }
};

export const removePhotosController = async (req, res) => {
  const payload = req.params;
  try {
    const data = await removePhotosQuery(payload);
    return res.status(200).send(data);
  } catch (err) {
    console.log(err);
  }
};

export const removeAllPhotosController = async (req, res) => {
  console.log('FIRES FIRST ----------------');
  console.log(req.params);
  const payload = req.params;
  try {
    const data = await removeAllPhotosQuery(payload);
    return res.status(200).send(data);
  } catch (err) {
    console.log(err);
  }
};
