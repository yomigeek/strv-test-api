import express from 'express';
import cors from 'cors';
import apiRoutes from './routes';

require('dotenv').config({path: '../.env'});

// Setting up the express app
const app = express();
const port = process.env.PORT;

app.use(cors());

app.use(express.json()); 
app.use(express.urlencoded({extended: true}));

app.use('/api/v1/', apiRoutes);

// catch un-available routes
app.all('*', (req, res) => {
  res.status(404).json({
    status: 'error',
    message: 'Oops! The resource you requested does not exist.',
  });
});

app.listen(port, () => {
  console.log(`server started at: ${port}`);
});

export default app;