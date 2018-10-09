const randomatic = require('randomatic');

exports.randomString = function(length = 12)
{
	return randomatic('a', length);
};

exports.clone = function(obj)
{
	return JSON.parse(JSON.stringify(obj));
};
