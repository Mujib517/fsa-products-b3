const get = (req, res) => {
    res.status(200);
    res.send('FSA API');
};

const health = (req, res) => {
    res.status(200);
    res.json({ status: 'Up' });
};

module.exports = { get, health };
