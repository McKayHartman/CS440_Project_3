import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';


const app = express();
const PORT = 3000;

app.use(cors());
app.use(bodyParser.json());

// Health check
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'OK' });
});

// listen on port 3000
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});