const { v4 } = require('uuid');
const axios = require('axios');
const { URL } = require('url');

const companies = ['AZO', 'AMZ'];
const categories = [
    'Phone',
    'Computer',
    'Tv',
    'Earphone',
    'Tablet',
    'Charger',
    'Mouse',
    'Keyboard',
    'Bluetooth',
    'Pendrive',
    'Remote',
    'Speaker',
    'Headset',
    'Laptop',
    'PC',
];

const BASE_TEST_URL = 'http://20.244.56.144/test/';

exports.getProducts = async (req, res) => {
    const { categoryname } = req.params;
    const { n, minprice, maxprice, page, sortBy, order } = req.query;

    const token = await getToken();

    if (!categories.includes(categoryname))
        return res.status(405).json({ message: 'Invalid category' });

    const requests = companies.map((item) => {
        let tempUrl = BASE_TEST_URL;

        const url = new URL(BASE_TEST_URL);
        url.pathname += `companies/${item}/categories/${categoryname}/products`;
        url.searchParams.append('top', n);
        url.searchParams.append('minPrice', minprice);
        url.searchParams.append('maxPrice', maxprice);

        return axios.get(url, {
            headers: { Authorization: 'Bearer ' + token },
        });
    });

    const responses = await Promise.all(requests);

    let data = [];

    responses.forEach((item) =>
        item.data.forEach((p) => {
            data.push(p);
        })
    );

    if (sortBy)
        data.sort((a, b) => {
            if (order === 'asc') return a[sortBy] - b[sortBy];
            else return b[sortBy] - a[sortBy];
        });

    data.forEach((item) => generateUniqueId(item));
    let pageProducts;
    if (page) pageProducts = data.slice((page - 1) * 5, page * 5);
    else {
        return res.status(200).json({ products: data });
    }

    res.status(200).json({
        products: pageProducts,
        page,
        totalPages: Math.floor(data.length / 5),
    });
};

exports.getProduct = async (req, res) => {};

async function getToken() {
    const res = await axios.post(BASE_TEST_URL + 'auth', {
        companyName: 'goMart',
        clientID: 'fe7a4d68-3283-46fb-8940-e408db1fd5d6',
        clientSecret: 'ipuapcURcJEywvRy',
        ownerName: 'Kaushal K Bhandary',
        ownerEmail: '23ca042.kaushal@sjec.ac.in',
        rollNo: '4SO23MC042',
    });

    return res.data.access_token;
}

function generateUniqueId(obj) {
    obj.id = v4();
}
