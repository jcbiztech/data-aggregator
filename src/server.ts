import './config';

import app from './app';

const port = process.env.PORT || 8080;

app.get('/', (req, res) => {
  res.send('Preview - Biztech Aggregator');
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});