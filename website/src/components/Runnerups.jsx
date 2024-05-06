import vrfArtifact from "@/utils/artifacts/VRFGiveaway.json"
import constants from "@/utils/constants";
import Participant from "@/utils/models/participant";
import { ethers } from "ethers";


const provider = new ethers.JsonRpcProvider(process.env.NEXT_PUBLIC_RPC);
const contract = new ethers.Contract(constants.contractAddress, vrfArtifact.abi, provider);


const WINNER_NO = 5;

export async function Runnerups() {

    const winners = [];

    const isDone = await contract.giveawayDone();
    if (isDone) {
        for (let i = 2; i < WINNER_NO; i++) {
            let winnerIndex = await contract.getPrize(i)
            let winnerHash = await contract.participants(winnerIndex);

            const participant = await Participant.findOne({ emailHash: winnerHash });
            winners.push(participant);
        }
    }

    return (<>

        <div className="bg-gray-800 rounded-md p-4 px-8 space-y-2 overflow-auto max-h-64">
            <h2 className="text-lg font-medium text-white text-center">Runner ups</h2>
            <p className="text-sm text-gray-450 pb-4">(Takes the reward if winner is not reachable)</p>
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
