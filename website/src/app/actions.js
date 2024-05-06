"use server";

import Participant from "@/utils/models/participant";
import { sha256 } from "js-sha256";
import { ethers } from "ethers";
import constants from "@/utils/constants";
import vrfArtifact from "@/utils/artifacts/VRFGiveaway.json"
import { connectDB } from "@/utils/db";


const provider = new ethers.JsonRpcProvider(process.env.NEXT_PUBLIC_RPC);
const wallet = new ethers.Wallet(process.env.ETH_PRIVATE_KEY, provider);
const contract = new ethers.Contract(constants.contractAddress, vrfArtifact.abi, wallet);
console.log("eth address: ", wallet.address)

export const participate = async (formData) => {
    try {
        await connectDB();
        const name = formData.get("name");
        const email = formData.get("email");

        if (!(name && email)) return JSON.stringify({ error: "There is empty inputs!" })

        const mails = email.match(/[A-Za-z0-9\.]+@([A-Za-z]+\.)?bilkent\.edu\.tr/g);
        if (mails == null) return JSON.stringify({ error: "Mail is not a valid Bilkent mail!" })

        const already = await Participant.findOne({ email: mails[0] });

        if(already) return JSON.stringify({ error: "Already participated!" });

        const emailHash = "0x" + sha256(mails[0]);

        const newParticipant = new Participant({
            name: name,
            email: email,
            emailHash: emailHash,
        });

        const receipt = await contract.addParticipant(emailHash);
        await newParticipant.save();


        return JSON.stringify({
            newParticipant,
            receipt,
            });
    } catch (err) {
        if(err.message.includes("giveaway executed") || err.message.includes("giveaway finished"))
            return JSON.stringify({ error: "Giveaway is finished!" });
        return JSON.stringify({ error: err.message });
    }
}

export const getHashes = async () => {
    try {
        await connectDB();
        const hashes = await contract.getAllParticipants();
        return JSON.stringify(hashes);
    } catch (err) {
        return JSON.stringify({ error: err.message });
    }
}

export const test = async(number) => {
    let text = "abc";
    for(let i = 0; i < number; text += "abc", i++) {
        let hash = "0x" + sha256(text);
        const receipt = await contract.addParticipant(hash);
        console.log("i:", i, receipt)
    }
}