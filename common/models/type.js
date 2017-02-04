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
        return callback(null, [{
            id: 1,
            name: 'Eat',
            description: ''
        }]);
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
