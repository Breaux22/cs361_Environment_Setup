const express = require('express');
const app = express();
PORT = 4000;
app.use(express.json())
app.use(express.urlencoded({extended:true}))

app.post("/receive-data", (req, res) => {
  const rows = [];

  function traverse(obj, path = []) {
    if (Array.isArray(obj)) {
      obj.forEach((item, index) => traverse(item, [...path, index]));
    } else if (typeof obj === 'object' && obj !== null) {
      Object.entries(obj).forEach(([key, value]) => traverse(value, [...path, key]));
    } else {
      rows.push([...path, obj].join());
    }
  }

  traverse(req.body.data);

  res.send(rows.join('\n'));

});

app.listen(PORT,() =>{console.log(`listening on ${PORT}`)})

