import { Response } from 'express';
import { Request } from '../types';
import UserHash from '../models/UserHashes';
import Wallets from '../models/Wallets';

function generateRandomString() {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    const charactersLength = characters.length;

    for (let i = 0; i < 20; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }

    return result;
}

function getGameResult() {
    const coin1 = Math.random() < 0.5 ? 'h' : 't';
    let coin2;

    // If coin1 is 'h', coin2 can be either 'h' or 't'
    if (coin1 === 'h') {
        coin2 = Math.random() < 0.5 ? 'h' : 't';
    } else {
        // If coin1 is 't', coin2 must also be 't'
        coin2 = 't';
    }
    const tossResult = `${coin1}${coin2}`;
    return tossResult;
}


export const getHash = async (req: Request, res: Response) => {
    try {
        const userhash = generateRandomString();

        const newDoc = new UserHash({ userhash })
        const newData = await newDoc.save()
        return res.json({ data: newData });
    } catch (error: any) {
        console.error(`error`, error);
        return res.status(400).json('Interanal server error');
    }
};

export const storeGameData = async (req: Request, res: Response) => {
    try {
        const { userhash, address } = req.body;
        if (!userhash || !address)
            return res.json({ result: "ERROR", error: "Missing required arguments" });

        const gameData = await UserHash.findOne({ userhash })
        if (gameData.streaks > 1) {
            return res.json({ result: "ERROR", error: "Minium streak point is 2" });
        }

        const isExist = await Wallets.find({ wallet_adress: address });
        if (isExist.length !== 0) {
            if (gameData.streaks > isExist[0].streaks) {
                const updatedData = await Wallets.findOneAndUpdate({ wallet_adress: address }, { streaks: gameData.streaks })
                return res.json({ data: updatedData });
            } else {
                return res.json({ result: "No update.", data: isExist[0] });
            }
        } else {
            const newDoc = new Wallets({ wallet_adress: address, streaks: gameData.streaks });
            const newData = await newDoc.save()
            return res.json({ data: newData });
        }
    } catch (error: any) {
        console.error(`error`, error);
        return res.status(400).json('Interanal server error');
    }
};

export const playGame = async (req: Request, res: Response) => {
    try {
        const { userhash, id } = req.body;
        if (!userhash || !id)
            return res.json({ result: "ERROR", error: "Missing required arguments" });


        const tossResult = getGameResult();
        if (tossResult === id) {
            const gameData = await UserHash.findOne({ userhash });
            await UserHash.updateOne({ userhash }, { streaks: gameData.streaks + 1 })
            return res.json({ result: tossResult, streaks: gameData.streaks + 1 });
        } else
            return res.json({ result: tossResult, streaks: 0 });

    } catch (error) {
        console.error(`error`, error);
        return res.status(400).json('Interanal server error');
    }
}
