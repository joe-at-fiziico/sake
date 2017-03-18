var util = require('util');

module.exports = function(Budget) {

    add(Budget);
    get(Budget);
    edit(Budget);
};

function add(Budget) {
    Budget.add = function(type, amount, callback) {

        return callback(null, {});
    };

    Budget.remoteMethod(
        'add',
        {
            description: 'Add one budget item',
            accepts: [
            ],
            returns: {type: 'object', root: true},
            http: [
                {verb: 'post', path: '/'}
            ]
        }
    );
}

function get(Budget) {
    Budget.get = function(callback) {

        var sql = ' SELECT * FROM "budget" ORDER BY tid ';
        Budget.app.dataSources['postgres'].connector.query(sql, function(err, results) {
            if (err) {
                return callback(err);
            }

            return callback(null, results);
        });
    };

    Budget.remoteMethod(
        'get',
        {
            description: 'Get Budgets',
            accepts: [
            ],
            returns: {type: 'object', root: true},
            http: [
                {verb: 'get', path: '/'}
            ]
        }
    );
}

function edit(Budget) {
    Budget.edit = function(id, amount, callback) {
        var sql = ' UPDATE "budget" SET "amount" = $1 ';
        var params = [ amount ];
        Budget.app.dataSources['postgres'].connector.query(sql, params, function(err) {
            if (err) {
                return callback(err);
            }

            return callback();
        });
    };

    Budget.remoteMethod(
        'edit',
        {
            description: 'Modify budget',
            accepts: [
                //{ arg: 'req', type: 'object',
                //    http: function(ctx) {
                //        return ctx.req;
                //    }
                //},
                {arg: 'id', type: 'number', description: 'Budget id', required: true},
                {arg: 'amount', type: 'number', description: 'Amount', required: false}
            ],
            returns: {type: 'object', root: true},
            http: [
                {verb: 'put', path: '/:id'}
            ]
        }
    );
}

