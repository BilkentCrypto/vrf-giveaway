import vrfArtifact from "@/utils/artifacts/VRFGiveaway.json"
import constants from "@/utils/constants";
import { connectDB } from "@/utils/db";
import Participant from "@/utils/models/participant";
import { ethers } from "ethers";

const provider = new ethers.JsonRpcProvider(process.env.NEXT_PUBLIC_RPC);
const contract = new ethers.Contract(constants.contractAddress, vrfArtifact.abi, provider);


const WINNER_NO = 2;

export async function Winners() {

    const winners = [];
    connectDB();
    const isDone = await contract.giveawayDone();
    if (isDone) {
        for (let i = 1; i < WINNER_NO; i++) {
            let winnerIndex = await contract.getPrize(i)
            console.log("index:", winnerIndex);
            let winnerHash = await contract.participants(winnerIndex);
            console.log("winner:", winnerHash)

            const participant = await Participant.findOne({ emailHash: winnerHash.toString() });
            winners.push(participant);
        }
    }

    return (<>

        <div className="bg-gray-800 rounded-md p-4 px-8 space-y-2 overflow-auto max-h-64">
            <h2 className="text-lg font-medium text-white text-center">Winners</h2>
            {isDone ?
                <ul className="space-y-1 text-sm text-center text-white">
                    {winners.map((participant) =>
                        <li key={participant.emailHash}>{`${participant.name} - ${participant.emailHash.toString().substring(0, 20)}...`}</li>
                    )}
                </ul>
                :
                <p className="space-y-1 text-sm text-center text-white">Giveaway is not finished yet.</p>
            }
        </div>

    </>);
}
