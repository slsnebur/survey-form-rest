const Mongoose = require('mongoose');
const AutoIncrement = require('mongoose-sequence')(Mongoose);
const Schema = Mongoose.Schema;


const UserSchema = new Schema({
    //User id:
    user_id: {type: Number},
    //username:
    username: {type: String, required: true},
    //hashed password (bcrypt)
    password: {type: String, required: true},
    //email address:
    email: {type: String, required: true, minlength: 3, maxlength: 256},
    //User group
    group: {
        type: String,
        enum: ['user', 'admin'],
        default: 'user'
    }
});

UserSchema.plugin(AutoIncrement, {inc_field: 'user_id'});

module.exports = {
    UserSchema,
    User: Mongoose.model('User', UserSchema)
};