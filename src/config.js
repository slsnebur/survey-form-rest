const env = process.env.NODE_ENV || 'dev';

const dev = {
    env: "development",
    port: 3001,
    ip: '127.0.0.1',
    apiRoot: '/api',
    mongo: {
        host: 'mongodb://localhost/ii2019',
        options: {
            useNewUrlParser: true,
            useCreateIndex: true,
            useUnifiedTopology: true,
            useFindAndModify: false,
            debug: true
        }
    }
};

const test = {
    env: 'test',
    port: 3001,
    ip: '127.0.0.1',
    apiRoot: '/api',
    mongo: {
        host: 'mongodb://localhost/ii2019',
        options: {
            useNewUrlParser: true,
            useCreateIndex: true,
            useUnifiedTopology: true,
            useFindAndModify: false,
            debug: true
        }
    }
};

const config = {
    dev,
    test
};

module.exports = config[env];