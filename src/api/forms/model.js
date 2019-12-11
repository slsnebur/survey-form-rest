const Mongoose = require('mongoose');
const Schema = Mongoose.Schema;

const FormSchema = new Schema({
    //Form name
    name: {type: String, required: true},
    //Date of creation
    timestamp: {type: Date},
    //Owner's user_id
    user_id: {type: String},
    //QR code link or in binary
    qr_code: {type: String},
    //Array of comments (ids) posted to this form
    comments_id: {type: Array},
    //Number of questions in form
    pages_count: {type: Number},
    //Pages object array
    pages: [{
        //Question id
        question_id: {type: String},
        //Question
        question: {type: String},
        //Array of possible answers
        answers: [{
            //Answer
            answer: {type: String},
            //Answer count FOR THIS SPECIFIC ANSWER (to actually make this app somewhat useful)
            answer_count: {type: Number}
        }]
    }]

});

module.exports = {
    FormSchema,
    Form: Mongoose.model('Form', FormSchema)
};