const mongoose = require('mongoose');

require('dotenv').config({ path: './config.env' });
const app = require('./app')

const db = process.env.DB;

mongoose.connect(db, {
    useNewUrlParser: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
    useCreateIndex: true
}).then(() => {
    console.log('Database Connected');
}).catch((err) => {
    console.log('Something is wrong with the database', err)
})

const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
    console.log(`App listening at PORT ${PORT}`);
});