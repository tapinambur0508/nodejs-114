import cors from 'cors';
import express from 'express';

const app = express();

app.use(cors());

app.get('/movies', (req, res) => {
  res.json([
    { id: 1, name: 'Movie 1' },
    { id: 2, name: 'Movie 2' },
  ]);
});

app.listen(8080, (error) => {
  if (error) {
    throw error;
  }

  console.log('Server started on port 8080');
});
