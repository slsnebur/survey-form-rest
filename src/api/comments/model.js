const Mongoose = require('mongoose');
const AutoIncrement = require('mongoose-sequence')(Mongoose);
const Schema = Mongoose.Schema;


const CommentSchema = new Schema({
    //Comment id:
    comment_id: {type: Number},
    //user_id:
    user_id: {type: Number},
    //username:
    username: {type: String},
    //Form id
    form_id: {type: Number},
    //Comment
    text: {type: String, required: true},
    //Timestamp
    timestamp: {type: Date}
});

CommentSchema.plugin(AutoIncrement, {inc_field: 'comment_id'});

module.exports = {
    CommentSchema,
    Comment: Mongoose.model('Comment', CommentSchema)
};