const express = require('express');
require('dotenv').config();
const schoolRoutes = require('./routes/schoolRoutes');
const  bodyParser = require('body-parser');
const cors = require('cors');
const Path = require('path');
const app = express();

app.use(bodyParser.json());
app.use(cors());
app.use('/api', schoolRoutes);
app.use('/uploads', express.static( Path.join(__dirname, 'uploads') ));



const PORT = process.env.DB_PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})