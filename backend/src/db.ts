import mongoose , {model , Schema} from 'mongoose';

const UserSchema = new Schema({
    username: {type:String, unique:true},
    password:{type:String}
});
const ContentSchema = new Schema({
    title: String,
    link: String,
    type:String,
    tags: [{type: mongoose.Types.ObjectId, ref: 'Tag'}],
    userId: {type: mongoose.Types.ObjectId, ref: 'User', required: true },
});
const LinkSchema = new Schema({
    hash:String,
    userId:{
        type:mongoose.Types.ObjectId,
        ref:'User',
        required:true,
        unique:true
    }
});

export const LinkModel = model('Link',LinkSchema);

export const ContentModel = model('content', ContentSchema);

export const UserModel = model('User', UserSchema);
