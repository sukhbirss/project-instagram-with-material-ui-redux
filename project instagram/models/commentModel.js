const mongoose = require('mongoose');
const validator = require('validator');
const commentSchema = new mongoose.Schema({
	text:{
		type:String,
		required:[ true, '']
	},
	photo:{
		type:String
	},
	role:{
		type:String,
		enum:['public','private','friends'],
		default:'public'
	},
	Like:{
		type:Number,
		default:0,
	},

	postedAt:{
		type:Date,
		default:Date.now()
	},
	//PARENT CHILD REFRENCING
    post: {
      type: mongoose.Schema.ObjectId,
      ref: 'Post',
      required: [true, 'Review must belong to a post']
    },
    user: {
      type: mongoose.Schema.ObjectId,
      ref: 'User',
      required: [true, 'Review must belong to a user']
    },
   	username:{
		type:String,
		required:[ true, '']
	}

});


const Comment = mongoose.model('Comment',commentSchema);

module.exports = Comment;
