// eslint-disable-next-line @typescript-eslint/no-var-requires
const proxy = require('http-proxy-middleware');

module.exports = function (app) {
    app.use(
        proxy('/api/getaway', {
            target: 'http://10.0.50.203:8008/',
            secure: false,
            changeOrigin: true,
            pathRewrite: {
                '^/api/getaway': '/',
            },
        }),
    );
};
