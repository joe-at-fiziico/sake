var util = require('util');

module.exports = function(Record) {

    add(Record);
    get(Record);
    edit(Record);
    remove(Record);
};

function add(Record) {
    Record.add = function(amount, type, location, comment, photo, callback) {
        Record.create({
            uid: 1,
            amount: amount,
            tid: type,
            comment: comment,
            createdAt: Date.now()
        }, function(err, record) {
            return callback(err, record);
        });
    };

    Record.remoteMethod(
        'add',
        {
            description: 'Add a new record',
            accepts: [
                {arg: 'amount', type: 'number', description: 'Amount', required: true},
                {arg: 'type', type: 'number', description: 'Type id', required: true},
                {arg: 'location', type: 'string', description: 'Location', required: false},
                {arg: 'comment', type: 'string', description: 'Comment', required: false},
                {arg: 'photo', type: 'string', description: 'Photo', required: false}
            ],
            returns: {type: 'object', root: true},
            http: [
                {verb: 'post', path: '/'}
            ]
        }
    );
}

function get(Record) {
    Record.get = function(type, from, to, count, callback) {

        var sql = ' SELECT * FROM "record" ORDER BY "createdAt" DESC ';

        var params = [];
        var iParam = 1;
        var options = '';
        if (count) {
            options = ' LIMIT $1 ';
            params.push(count);
        }
        sql += options;

        Record.app.dataSources['postgres'].connector.query(sql, params, function(err, results) {
            if (err) {
                return callback(err);
            }

            return callback(null, results);
        });
    };

    Record.remoteMethod(
        'get',
        {
            description: 'Get record',
            accepts: [
                {arg: 'type', type: 'number', description: 'Type id', required: false},
                {arg: 'from', type: 'date', description: 'Date from', required: false},
                {arg: 'to', type: 'date', description: 'Date to', required: false},
                {arg: 'count', type: 'number', description: 'Record counts', required: false}
            ],
            returns: {type: 'object', root: true},
            http: [
                {verb: 'get', path: '/'}
            ]
        }
    );
}

function generateUpdateSql(id, data) {
    var updatePairs = '';
    var prefix = '';

    [ 'amount', 'tid', 'comment'].forEach(function(property) {
        if (data[property] !== undefined) {
            updatePairs += util.format(" %s \"%s\" = %s", prefix, property,
                (data[property] === null) ? 'null' : '\'' + data[property] + '\'');
            prefix = ',';
        }
    });

    return util.format(" UPDATE record SET %s WHERE \"id\"='%s' ", updatePairs, id);
}

function edit(Record) {
    Record.edit = function(id, amount, type, location, comment, photo, callback) {
        var sql = generateUpdateSql(id, {
            amount: amount,
            tid: type,
            comment: comment
        });
        Record.app.dataSources['postgres'].connector.query(sql, function(err) {
            if (err) {
                return callback(err);
            }

            return callback();
        });
    };

    Record.remoteMethod(
        'edit',
        {
            description: 'Modify a record',
            accepts: [
                //{ arg: 'req', type: 'object',
                //    http: function(ctx) {
                //        return ctx.req;
                //    }
                //},
                {arg: 'id', type: 'number', description: 'Record id', required: true},
                {arg: 'amount', type: 'number', description: 'Amount', required: false},
                {arg: 'type', type: 'number', description: 'Type id', required: false},
                {arg: 'location', type: 'string', description: 'Location', required: false},
                {arg: 'comment', type: 'string', description: 'Comment', required: false},
                {arg: 'photo', type: 'string', description: 'Photos', required: false}
            ],
            returns: {type: 'object', root: true},
            http: [
                {verb: 'put', path: '/:id'}
            ]
        }
    );
}

function remove(Record) {
    Record._remove = function(id, callback) {
        return callback();
    };

    Record.remoteMethod(
        '_remove',
        {
            description: 'Delete a record',
            accepts: [
                {arg: 'id', type: 'number', description: 'Record id', required: true}
            ],
            returns: {type: 'object', root: true},
            http: [
                {verb: 'delete', path: '/:id'}
            ]
        }
    );
}
