const config = {
    // env variables
    // dbConStr: 'mongodb://localhost:27017/fsa-b3'
    dbConStr: process.env.dbConStr,
    jwtSecret: process.env.jwtSecret
};

module.exports = config;