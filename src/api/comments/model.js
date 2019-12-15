const Mongoose = require('mongoose');
const AutoIncrement = require('mongoose-sequence')(Mongoose);
const Schema = Mongoose.Schema;


const CommentSchema = new Schema({
    //Comment id:
    comment_id: {type: Number},
    //user_id:
    user_id: {type: Number},
    //Form id
    form_id: {type: Number},
    //username:
    username: {type: String},
    //Comment
    text: {type: String, required: true, minlength: 4, maxlength: 512},
    //Timestamp
    timestamp: {type: Date}
});

CommentSchema.plugin(AutoIncrement, {inc_field: 'comment_id'});

module.exports = {
    CommentSchema,
    Comment: Mongoose.model('Comment', CommentSchema)
};