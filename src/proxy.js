// proxy.js
const express = require('express');
const cors = require('cors');
const { Storage } = require('@google-cloud/storage');
const stream = require('stream');
const app = express();
const port = 3001;

const storage = new Storage();
const bucketName = '<your-firebase-storage-bucket-name>';

app.use(cors());

app.get('/file/:filename', async (req, res) => {
  const filename = req.params.filename;
  const file = storage.bucket(bucketName).file(filename);

  file.createReadStream()
    .on('error', (err) => {
      res.status(500).send(err);
    })
    .pipe(res);
});

app.listen(port, () => {
  console.log(`Proxy server running at http://localhost:${port}`);
});
