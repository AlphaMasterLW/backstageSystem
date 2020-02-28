
const express = require('express');
const mongoose = require('mongoose');
const app = express();

// 引入user.js
const users  =require('./routes/api/users')

// DB config
const db = require('./config/keys').mongoURI;
// connect to mongodb
mongoose.connect(db,{
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log('MongoDB connect')
})
.catch((err) => {
    console.log(err)
});

const hostname = '127.0.0.1';
const port = process.env.PORT || 3000;

app.get('/', (req, res) => res.send('Hello World a2!'));

// 使用routes
app.use('/api/users', users);
app.listen(port, hostname, () => {
    console.log(`服务器运行在 http://${hostname}:${port}/`);
});