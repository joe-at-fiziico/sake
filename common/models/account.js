module.exports = function(Account) {

    login(Account);
    logout(Account);
};

function login(Account) {
    Account.login = function(name, password, callback) {
        return callback(null, {
            id: 'EEDDAABB'
        })
    };

    Account.remoteMethod(
        'login',
        {
            description: 'Account login',
            accepts: [
                {arg: 'name', type: 'string', description: 'User name', required: true},
                {arg: 'password', type: 'string', description: 'Password', required: true}
            ],
            returns: {type: 'object', root: true},
            http: [
                {verb: 'post', path: '/login'}
            ]
        }
    );
}

function logout(Account) {
    Account.logout = function(callback) {
        return callback();
    };

    Account.remoteMethod(
        'logout',
        {
            description: 'Account logout',
            accepts: [
            ],
            returns: {type: 'object', root: true},
            http: [
                {verb: 'post', path: '/logout'}
            ]
        }
    );
}
