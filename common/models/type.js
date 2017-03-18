module.exports = function(Type) {

    add(Type);
    get(Type);
};

function add(Type) {
    Type.add = function(typename, callback) {
        return callback(null, {});
    };

    Type.remoteMethod(
        'add',
        {
            description: 'Add a new Type',
            accepts: [
                {arg: 'typename', type: 'string', description: 'typename', required: true}
            ],
            returns: {type: 'object', root: true},
            http: [
                {verb: 'post', path: '/'}
            ]
        }
    );
}

function get(Type) {
    Type.get = function(callback) {

        var sql = ' SELECT id, name, description FROM "type" ORDER BY id ';
        Type.app.dataSources['postgres'].connector.query(sql, function(err, results) {
            if (err) {
                return callback(err);
            }

            return callback(null, results);
        });
    };

    Type.remoteMethod(
        'get',
        {
            description: 'Get Types',
            accepts: [
            ],
            returns: {type: 'object', root: true},
            http: [
                {verb: 'get', path: '/'}
            ]
        }
    );
}
