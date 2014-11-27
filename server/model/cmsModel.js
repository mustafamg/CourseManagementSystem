
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
    to: {type: Date, required: false},
    users: [{type: mongoose.Schema.Types.ObjectId, ref: 'User'}]
});

var UserSchema = new Schema({
	name: {type: String, required: true },
	email: {type: String, required: true },
	altEmail: {type: String, required: false },
	company: {type: String, required: false },
	jobTitle: {type: String, required: false },
	mobile: {type: String, required: false }
	
});

module.exports={
		Course: mongoose.model('Course', CourseSchema),
		Event: mongoose.model('Event', EventSchema),
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