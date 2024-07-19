const express = require('express');
const numbersRoutes = require('./routes/numbers');

const app = express();

app.use(express.json());

app.use('/numbers', numbersRoutes);

app.use((err, req, res, next) => {
    console.log(err.message);
});

app.listen(3000, () => {
    console.log('server listening on port 3000');
});
