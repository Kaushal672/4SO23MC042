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

    const response = await Promise.race([
        axios.get(url, {
            headers: {
                Authorization:
                    'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJNYXBDbGFpbXMiOnsiZXhwIjoxNzIxMjk0ODc1LCJpYXQiOjE3MjEyOTQ1NzUsImlzcyI6IkFmZm9yZG1lZCIsImp0aSI6ImZlN2E0ZDY4LTMyODMtNDZmYi04OTQwLWU0MDhkYjFmZDVkNiIsInN1YiI6IjIzY2EwNDIua2F1c2hhbEBzamVjLmFjLmluIn0sImNvbXBhbnlOYW1lIjoiZ29NYXJ0IiwiY2xpZW50SUQiOiJmZTdhNGQ2OC0zMjgzLTQ2ZmItODk0MC1lNDA4ZGIxZmQ1ZDYiLCJjbGllbnRTZWNyZXQiOiJpcHVhcGNVUmNKRXl3dlJ5Iiwib3duZXJOYW1lIjoiS2F1c2hhbCBLIEJoYW5kYXJ5Iiwib3duZXJFbWFpbCI6IjIzY2EwNDIua2F1c2hhbEBzamVjLmFjLmluIiwicm9sbE5vIjoiNFNPMjNNQzA0MiJ9.GUfIL9ZJQg0BoQLrk0A9AuAL7NVAqugbvw1F5L6eJy0',
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
