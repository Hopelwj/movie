var mongoose =require('mongoose');
var CommentSchema = require('../schemas/CommentSchema.js');


var Comment = mongoose.model('Comment', CommentSchema);

module.exports = Comment;