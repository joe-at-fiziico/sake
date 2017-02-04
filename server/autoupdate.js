var loopback = require('loopback');
var boot = require('loopback-boot');

var app = module.exports = loopback();

// Bootstrap the application, configure models, datasources and middleware.
// Sub-apps like REST API are mounted via boot scripts.
boot(app, __dirname, function (err) {
    if (err) throw err;

    // start the server if `$ node server.js`
    if (require.main === module) {

        var ds = app.dataSources.postgres;
        ds.autoupdate(function (err, result) {
            if (err) {
                console.log(err);
                process.exit(0);
            }
            process.exit(1);
        });
    }
});
