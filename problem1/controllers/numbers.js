const axios = require('axios');

const List = require('../model/LinkedList');
const BASE_TEST_URL = 'http://20.244.56.144/test/';
const list = new List();

exports.getNumbers = async (req, res) => {
    const { id } = req.params;
    let url = BASE_TEST_URL;

    if (id === 'p') url += 'primes';
    else if (id === 'f') url += 'fibo';
    else if (id === 'e') url += 'even';
    else if (id === 'r') url += 'rand';

    const token = await getToken();

    const response = await Promise.race([
        axios.get(url, {
            headers: {
                Authorization: 'Bearer ' + token,
            },
        }),

        new Promise((resolve, reject) => {
            setTimeout(() => {
                reject(new Error('Timeout'));
            }, 500);
        }),
    ]);

    const prevState = list.getArray();

    if (response.status === 200) {
        const data = [...new Set(response.data.numbers)];
        data.forEach((item) => {
            list.insert(item);
        });
    }

    const numbers = list.getArray();
    const avg = numbers.reduce((prev, cur) => prev + cur, 0) / numbers.length;

    res.status(200).json({
        numbers: response.data.numbers,
        windowPrevState: prevState,
        windowCurState: numbers,
        avg,
    });
};

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
