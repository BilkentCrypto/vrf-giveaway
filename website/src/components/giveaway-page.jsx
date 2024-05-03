import GiveawayForm from "./GiveawayForm";
import vrfArtifact from "@/utils/artifacts/VRFGiveaway.json"
import constants from "@/utils/constants";
import { ethers } from "ethers";
import { Participants } from "./Participants";

const provider = new ethers.JsonRpcProvider(process.env.NEXT_PUBLIC_RPC);
const contract = new ethers.Contract(constants.contractAddress, vrfArtifact.abi, provider);

export async function GiveawayPage() {

  return (<>
    <div
      className="flex flex-col items-center justify-center min-h-[100dvh] bg-gray-100 dark:bg-gray-900 p-4">
      <div className="max-w-md w-full space-y-6">
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-bold">Join Our Giveaway</h1>
          <p className="text-gray-500 dark:text-gray-400">
            Enter your name and email to participate.
          </p>
          <p className="text-gray-500 dark:text-gray-400">
            Smart Contract URL:
          </p>
          <a className="text-blue-500 underline" href="#">
          https://sepolia.etherscan.io/address/0xc1FbE5097832220f7D7D721a7449850d1E4ca220#code
          </a>
          <p className="text-gray-500 dark:text-gray-400">
            Check SHA256:
          </p>
          <a className="text-blue-500 underline" href="https://emn178.github.io/online-tools/sha256.html">
            https://emn178.github.io/online-tools/sha256.html
          </a>
        </div>
        <GiveawayForm />
        <Participants />
      </div>
    </div>
    <footer
      className="bg-gray-100 dark:bg-gray-900 text-center py-4 text-sm text-gray-500 dark:text-gray-400">
      Created by Bilkent Blockchain Society
    </footer>
  </>);
}
