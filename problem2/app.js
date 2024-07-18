const express = require('express');
const productRoutes = require('./routes/products');

const app = express();

app.use(express.json());

app.use('/categories', productRoutes);

app.use((err, req, res, next) => {
    // console.log(err);
});

app.listen(3000, () => {
    console.log('server listening on port 3000');
});
