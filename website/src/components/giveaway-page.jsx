import GiveawayForm from "./GiveawayForm";
import vrfArtifact from "@/utils/artifacts/VRFGiveaway.json"
import constants from "@/utils/constants";
import { ethers } from "ethers";
import { Button } from "@/components/ui/button"

import { Participants } from "./Participants";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

const provider = new ethers.JsonRpcProvider(process.env.NEXT_PUBLIC_RPC);
const contract = new ethers.Contract(constants.contractAddress, vrfArtifact.abi, provider);

export async function GiveawayPage() {

  return (<>
    <div className="flex flex-col items-center justify-center min-h-[100dvh] bg-gray-100 dark:bg-gray-900 p-2">
      <div className=" px-20 py-16 my-auto grid  grid-cols-1 mx-auto md:grid-cols-2 ">
        {/* Sağ Bölüm */}
        <div className=" flex justify-center items-center ">
          <div className=" grid items-start md:justify-center">
            <h1 className="text-white text-5xl font-bold">
              Welcome to MAYFEST.
            </h1>
            <h1 className="text-white mt-10 text-sm font-medium">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
            </h1>
            <h1 className=" text-white mt-10 flex text-sm font-medium ">
              Follow Us:


              <a className=" ml-1 underline" href=" https://twitter.com/blkntblockchain">
                https://twitter.com/blkntblockchain
              </a>

            </h1>
          </div>
        </div>
        <div className=" mt-10 lg:mt-10 ">

          <div className="text-center space-y-2">
            <h1 className="text-3xl font-bold"> Join Our Giveaway</h1>
            <p className="text-gray-500 text-sm dark:text-gray-400">
              Enter your name and email to participate.
            </p>
            <p className="text-gray-500 dark:text-gray-400">
              Smart Contract URL:
            </p>

            <CardFooter className="flex justify-center">
              <div className="rounded-md border px-4 py-3 font-mono text-sm">

                <a className="text-blue-500 underline" href="https://sepolia.etherscan.io/address/0xc1FbE5097832220f7D7D721a7449850d1E4ca220#code">
                  https://sepolia.etherscan.io/
                  address/0xc1FbE5097832220f7D7D721a7449850d1E4ca220#code
                </a>


              </div>
            </CardFooter>
            <p className="text-gray-500 dark:text-gray-400">
              Check SHA256:
            </p>
            <CardFooter className="flex justify-center">
              <div className="rounded-md border px-5 py-3 font-mono text-sm">


                <a className="text-blue-500 underline" href="https://emn178.github.io/online-tools/sha256.html">
                  https://emn178.github.io/online-tools/sha256.html
                </a>


              </div>
            </CardFooter>
            <div className=" px-10">
              <GiveawayForm />
            </div>


          </div>
        </div>
      </div>
      <Participants />
      
      <div className=" text-3xl mt-4 text-white font-bold">
        Winners
      </div>
      <div className="  gap-2  mt-4 text-sm flex text-white">
        <p>$P$C&9pTYDSA/2bP1xpLbmN.Z4Mdk82.Y1</p>
        <p>$100</p>
      </div>
      <footer
        className="bg-gray-100 dark:bg-gray-900 text-center py-4 text-sm text-gray-500 dark:text-gray-400">
        Created by Bilkent Blockchain Society
      </footer>


    </div>

  </>);
}
