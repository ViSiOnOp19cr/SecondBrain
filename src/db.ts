import mongoose , {model , Schema} from 'mongoose';


mongoose.connect('mongodb+srv://visionop192004:GhPUF7$y@mern.h89pu.mongodb.net/brainly');


const UserSchema = new Schema({
    username: {type:String, unique:true},
    password:String
})

export const UserModel = model('User', UserSchema);
