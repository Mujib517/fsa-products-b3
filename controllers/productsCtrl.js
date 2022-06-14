const get = (req, res) => {
    res.status(200);
    res.send("List of products");
};


module.exports = { get };
