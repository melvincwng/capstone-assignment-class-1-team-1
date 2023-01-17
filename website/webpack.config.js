//webpack.config.js
const { ProvidePlugin } = require('webpack');

module.exports = {
    entry: {
        App: '../server/model/databaseConfig.js',
    },
    output: {
        
        filename: '[name].js', // Retain original file name
    },
    mode: 'development',
    watch: true,
    plugins: [
        new ProvidePlugin({
            host: "localhost",
            user: "root", 
            password: "winwin888", 
            database: "bdd_assignment",
        }),
    ],
};