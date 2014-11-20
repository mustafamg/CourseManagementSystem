
var mongoose= require('mongoose');
var Schema = mongoose.Schema;

var CourseSchema = new Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    cost: {type: Number, required: false},
	rounds : [{type: mongoose.Schema.Types.ObjectId, ref: 'Event'}]
});

var EventSchema = new Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    cost: {type: Number, required: false},
    from: {type: Date, required: false},
    to: {type: Date, required: false}
});
var CourseRegistrationRequestSchema = new Schema({
	event : [{type: mongoose.Schema.Types.ObjectId, ref: 'Event'}],
    user: [{type: mongoose.Schema.Types.ObjectId, ref: 'User'}]
});

var UserSchema = new Schema({
	name: {type: String, required: true },
	email: {type: String, required: true },
	altEail: {type: String, required: true },
	company: {type: String, required: true },
	jobTitle: {type: String, required: true },
	mobile: {type: String, required: true }
	
});

module.exports={
		Course: mongoose.model('Course', CourseSchema),
		CourseRegistrationRequest: mongoose.model('CourseRegistrationRequest', CourseRegistrationRequestSchema),
		User: mongoose.model('User', UserSchema)
};
/*
 *   user.put("name", name);
            user.put("email",email);
            user.put("altemail", altmail);
            user.put("company", company);
            user.put("jobtitle", jobtitle);
            user.put("mobile", mobile);
 */