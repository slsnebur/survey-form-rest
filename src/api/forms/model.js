const Mongoose = require('mongoose');
const AutoIncrement = require('mongoose-sequence')(Mongoose);
const Schema = Mongoose.Schema;


const FormSchema = new Schema({
    //Form id:
    form_id: {type: Number,},
    //Form name
    name: {type: String, required: true},
    //Date of creation
    timestamp: {type: Date},
    //Owner's user_id
    user_id: {type: Number},
    //QR code link or in binary
    qr_code: {type: String},
    //Array of comments (ids) posted to this form
    comments_id: {type: Array},
    //Number of questions in form
    pages_count: {type: Number},
    //Pages object array
    pages: [{
        //Question id
        question_id: {type: Number},
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

FormSchema.plugin(AutoIncrement, {inc_field: 'form_id'});

module.exports = {
    FormSchema,
    Form: Mongoose.model('Form', FormSchema)
};