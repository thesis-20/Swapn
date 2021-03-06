import http from 'http';

import express from 'express';
import bodyParser from 'body-parser';
import morgan from 'morgan';
import helmet from 'helmet';
import cors from 'cors';
import fileUpload from 'express-fileupload';
import router from './router';

const app = express();
app.use(helmet());
app.use(fileUpload());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(morgan('dev'));
app.use(cors({
  allowedHeaders: 'Content-Type, authorization',
  methods: ['GET, POST, PUT, DELETE', 'OPTIONS'],
}));

app.use('/s3/api', router);

const server = http.createServer(app);
const PORT = process.env.PORT || 2859;

server.listen(PORT, (err) => {
  if (err) console.error(err);
  console.log('successfully connected S3-server to port', PORT);
});
