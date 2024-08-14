import { model, Schema } from 'mongoose';

const UserHashSchema: Schema = new Schema({
    userhash: {
        type: String, default: "", unique: true
    },
    streaks: {
        type: Number, default: 0
    },
},
    { timestamps: true }
);


const UserHash = model('userhashes', UserHashSchema);

export default UserHash;