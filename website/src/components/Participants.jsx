"use client";

import vrfArtifact from "@/utils/artifacts/VRFGiveaway.json"
import constants from "@/utils/constants";
import { ethers } from "ethers";
import { useEffect, useState } from "react";

const provider = new ethers.JsonRpcProvider(process.env.NEXT_PUBLIC_RPC);
const contract = new ethers.Contract(constants.contractAddress, vrfArtifact.abi, provider);



export function Participants() {

    const [hashes, setHashes] = useState();

    const fetchHashes = async () => {
        const newHashes = await contract.getAllParticipants();
        setHashes(newHashes);

    }

    useEffect(() => {
        fetchHashes();

    }, [])


    return (<>

        <div className="bg-white dark:bg-gray-800 rounded-md p-4 space-y-2">
            <h2 className="text-lg font-medium">Participants</h2>
            <ul className="space-y-1 text-sm">
                {(hashes && !hashes.error) ? hashes.map((hash) =>
                    <li key={hash}>{hash}</li>
                ) : "Fetching mail hashes..."
                }
            </ul>
        </div>

    </>);
}
