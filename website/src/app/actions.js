"use server";

import { connectDB } from "@/utils/db";

import Participant from "@/utils/models/participant";
import { sha256 } from "js-sha256";

connectDB();

export const participate = async (formData) => {
    try {
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

        await newParticipant.save();

        return JSON.stringify(newParticipant);
    } catch (err) {
        return JSON.stringify({ error: err.message });
    }
}