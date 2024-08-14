import { model, Schema } from 'mongoose';

const WalletsSchema: Schema = new Schema({
    wallet_adress: {
        type: String, default: "", unique: true
    },
    streaks: {
        type: Number, default: 0
    },
},
    { timestamps: true }
);


const Wallets = model('wallets', WalletsSchema);

export default Wallets;