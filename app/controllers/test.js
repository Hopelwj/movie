/*var bcrypt = require('bcrypt');
var SALT_WORK_FACTOR = 10;

exports.test = function (req, res) {
    var password = bcrypt.hashSync('123456', bcrypt.genSaltSync(SALT_WORK_FACTOR));
    
    res.send(bcrypt.compareSync('123456', password));
};

var bcrypt = require('bcrypt');
var SALT_WORK_FACTOR = 10;

exports.testHash = function (req, res) {
    var password = '';
    bcrypt.genSalt(SALT_WORK_FACTOR, function (err, salt) {
        if (err) return next(err);
        bcrypt.hash('123456', salt, function (err, hash) {
            if (err) return next(err);
            password = hash;
        })
    });
    bcrypt.compare('123456', password, function (err, isMatch) {
        if (err) return console.log(err);
        res.send(isMatch);
    })
};
*/