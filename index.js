import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.static('public', {
    maxAge: 2592000
}));
app.use((req, res) => {
    res.status(404).sendFile(path.join(__dirname, 'error.html'));
});

app.listen(3005);