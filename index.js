import express from 'express';
const app = express();
app.use(express.static('public', {
    maxAge: 2592000
})).listen(3005);
