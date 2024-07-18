const { v4 } = require('uuid');
const axios = require('axios');

const companies = ['AZO', 'AMZ', 'FLP', 'SNP', 'MYN'];
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
    const { n, minprice, maxprice, ...sortBy } = req.query;

    const token = await getToken();

    const requests = companies.map((item) => {
        let tempUrl = BASE_TEST_URL;
        tempUrl += 'companies/';
        tempUrl += item;
        tempUrl += '/categories/';
        tempUrl += categoryname;
        tempUrl += '/products?top=' + n;
        tempUrl += '&minPrice=' + minprice;
        tempUrl += '&maxPrice=' + maxprice;

        return axios.get(tempUrl, {
            headers: { Authorization: 'Bearer ' + token },
        });
    });

    const responses = await Promise.all(requests);
    const data = [];

    responses.forEach((item) =>
        item.data.forEach((p) => {
            data.push(p);
        })
    );

    data.sort((a, b) => a.price - b.price);

    res.status(200).json({ data });
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
