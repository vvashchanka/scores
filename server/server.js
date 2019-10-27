const express = require('express');
const app = express();
const dotenv = require('dotenv');
const authRoute = require('./routes/auth');
const usersRoute = require('./routes/users');
const teamsRoute = require('./routes/teams');
const gamesRoute = require('./routes/games');
const loggedInRoute = require('./routes/logged');
const cors = require('cors');
const db = require('./models/');
const config = require('config');
const PORT = config.get('server.port');
const formData = require('express-form-data');

dotenv.config();

db.sequelize.authenticate()
    .then(() => {
        console.log('Connected to DB');
        app.listen(PORT, () => console.log(`Server is up on port ${PORT}`));
    })
    .catch(err => {
        console.error('Unable to connect to the database:', err);
    });

app.use(formData.parse());
app.use(express.json());
app.use(cors({
    exposedHeaders: 'authToken',
}));
app.use('/api/', authRoute);
app.use('/api/', loggedInRoute);
app.use('/api/users/', usersRoute);
app.use('/api/games/', gamesRoute);
app.use('/api/teams/', teamsRoute);
