import express from 'express';
import cors from 'cors';
import login_routes from './login_routes.js';

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());




app.use('/api', login_routes);


// listen on port 3000
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});