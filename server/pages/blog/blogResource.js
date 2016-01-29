var Post = require('../../models/Post');

var promise = Post.find({}).sort({
    created: -1
}).limit(10).select('id title summary created author').populate('author', 'userid');

module.exports = promise;