const express = require('express')
const app = express()
const port = 3000;
const path = require('path');
const {readFileSync} = require("fs");


function getMain(_, res, urlpath) {
  res.contentType("text/html");

  try {
    res.status(200);
    const html = res.send(
      readFileSync(path.resolve(__dirname, urlpath), {
        encoding: "utf8",
      })
    );
    return res.send(html);
  } catch (e) {
    res.status(500);
    return res.send(
      readFileSync(path.resolve(__dirname, "../frontend/dist/pages/500.html"), {
        encoding: "utf8",
      })
    );
  }
}


app.get(
    /\.(js|css|map|png|jp[2g]|webp|tiff|jfif|jpeg(2000)?|ico|bem|gif|svg)$/,
    express.static("frontend/public")
  );
  

app.get('/', (req, res) => {
  getMain(req, res, "../frontend/dist/index.html");
})



app.get('/pages/another', (req, res) => {
  getMain(req, res,  "../frontend/dist/pages/another/index.html");
})


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})