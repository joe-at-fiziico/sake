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
            tid: 1
        }, function(err, record) {
            return callback(err);
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
    Record.get = function(type, from, to, callback) {
        return callback(null, [

        ]);
    };

    Record.remoteMethod(
        'get',
        {
            description: 'Get record',
            accepts: [
                {arg: 'type', type: 'number', description: 'Type id', required: false},
                {arg: 'from', type: 'date', description: 'Date from', required: false},
                {arg: 'to', type: 'date', description: 'Date to', required: false}
            ],
            returns: {type: 'object', root: true},
            http: [
                {verb: 'get', path: '/'}
            ]
        }
    );
}

function edit(Record) {
    Record.edit = function(id, amount, type, location, comment, photo, callback) {
        return callback(null, {

        });
    };

    Record.remoteMethod(
        'edit',
        {
            description: 'Modify a new record',
            accepts: [
                { arg: 'req', type: 'object',
                    http: function(ctx) {
                        return ctx.req;
                    }
                },
                {arg: 'id', type: 'number', description: 'Record id', required: true},
                {arg: 'amount', type: 'number', description: 'Amount', required: true},
                {arg: 'type', type: 'number', description: 'Type id', required: true},
                {arg: 'location', type: 'string', description: 'Location', required: true},
                {arg: 'comment', type: 'string', description: 'Comment', required: true},
                {arg: 'photo', type: 'string', description: 'Photos', required: true}
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
