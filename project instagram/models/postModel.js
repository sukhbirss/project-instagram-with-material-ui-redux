const mongoose = require('mongoose');
const validator = require('validator');
const postSchema = new mongoose.Schema({
	text:{
		type:String,
		required:[ true, '']
	},
	photo:{
		type:String,
		required:[true,"photo pls"]
	},
	role:{
		type:String,
		enum:['public','private','friends'],
		default:'public'
	},
	likes:[{type:mongoose.Schema.ObjectId,ref:"User"}],
	postedAt:{
		type:Date,
		default:Date.now()
	},
	postedBy:{
       type:mongoose.Schema.ObjectId,
       ref:"User"
    }
  

},
{
	toJSON: {virtuals: true},
	toObject: {virtuals:true}
});
// Virtual populate
postSchema.virtual('comment', {
  ref: 'Comment',
  foreignField: 'post',
  localField: '_id'
});

postSchema.pre(/^find/, function(next) {
  this.populate({
    path: 'comment',
    select:'text user photo Like username'
  });
  this.populate({
    path: 'postedBy',
    select:'name photo'
  });

  next();
});


const Post = mongoose.model('Post',postSchema);

module.exports = Post;
