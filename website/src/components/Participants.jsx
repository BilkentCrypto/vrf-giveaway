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

        <div className="bg-gray-800 rounded-md p-4 px-8 space-y-2 overflow-auto max-h-64">
            <h2 className="text-lg font-medium text-white">Participants {hashes && `(${hashes.length} participants)`}</h2>
            <ul className="space-y-1 text-sm text-center text-white">
                {(hashes && !hashes.error) ? hashes.map((hash) =>
                    <li key={hash}>{`${hash.toString().substring(0,20)}...`}</li>
                ) : "Fetching mail hashes..."
                }
            </ul>
        </div>

    </>);
}
