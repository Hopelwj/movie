var mongoose =require('mongoose');
var CategorySchema = require('../schemas/categorySchema.js');


var Category = mongoose.model('category', CategorySchema);

module.exports = Category;