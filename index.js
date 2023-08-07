import 'dotenv/config';
import './config'
// import './models'
import express from 'express';
import router from './routes';
import cors from 'cors'
const app = express();
app.use(cors());
app.use(express.json());
app.use('/v1', router);
const PORT=5000;
app.listen(PORT, () => {
  console.log(`app is listening to port ${PORT}`);
});