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
import { Winners } from "./Winners";
import { Suspense } from "react";

const provider = new ethers.JsonRpcProvider(process.env.NEXT_PUBLIC_RPC);
const contract = new ethers.Contract(constants.contractAddress, vrfArtifact.abi, provider);

export async function GiveawayPage() {


  return (<>
    <div className="dark flex flex-col items-center justify-center min-h-[100dvh] bg-gray-900 p-2">
      <h1 className="text-white text-5xl font-bold pt-12 text-center">
        Welcome to MAYFEST!
      </h1>
      <div className="px-20 pt-4 pb-16 my-auto grid grid-cols-1 mx-auto md:grid-cols-2 ">
        <div className=" flex justify-center items-center sm:order-last order-last md:order-first">
          <div className=" grid items-start md:justify-center">
            <h1 className="text-white text-3xl font-bold pt-12 md:pt-2 text-center">
              About Giveaway
            </h1>
            <p className="text-white mt-4 text-sm font-medium indent-8">
              We are launching a verifiable and transparent giveaway by using the potential of the blockchain technology.
              Conventional giveaway systems do not provide a solution to three important problems:
            </p>
            <ul className=" list-disc list-inside indent-8">
              <li className="text-white text-sm font-medium">
                Is the source of randomness is resistant to a manipulation?
              </li>
              <li className="text-white text-sm font-medium">
                Is the provided results are really first execution of the giveaway?
              </li>
              <li className="text-white text-sm font-medium">
                Is the participants list could be manipulated?
              </li>
            </ul>
            <h1 className="text-white mt-2 text-sm font-medium indent-8">
              We solve these problems via using some blockchain methods.
              Firstly, we use verifiable randommness source from Chainlink VRF.
              Secondly, we have deployed a smart contrat resistant to change.
              And finally, execution of the giveaway is only executed once and results are transparent to everyone.
              To not leak any personal data, we store only the hashes of the mails on Ethereum blockchain.
              But to provide the results mail and user name will be stored in the database, and winners will be announced after the giveaway.
            </h1>
            <h1 className=" text-white mt-4 flex text-sm font-medium ">
              Follow Us:


              <a className=" ml-1 underline" href=" https://twitter.com/blkntblockchain">
                https://twitter.com/blkntblockchain
              </a>

            </h1>
            <h1 className=" text-white mt-2 flex text-sm font-medium ">
              Github Repo:
              <a className=" ml-1 underline" href="  https://github.com/BilkentCrypto/vrf-giveaway">
                https://github.com/BilkentCrypto/vrf-giveaway
              </a>


            </h1>
            <h1 className="text-white mt-4 font-semibold text-sm font-medium">
              Good luck!
            </h1>
          </div>
        </div>
        <div className=" mt-4 lg:mt-10 ">


          <div className="text-center space-y-2">

            <h1 className="text-3xl font-bold text-white pt-4"> Join Our Giveaway</h1>
            <p className="text-gray-400">
              Enter your name and Bilkent email to participate.
            </p>
            <p className="text-gray-400">
              Smart Contract URL:
            </p>

            <CardFooter className="flex justify-center">
              <div className="flex rounded-md border px-4 py-3 font-mono text-sm">

                <a className="text-blue-500 underline break-words" href="https://sepolia.etherscan.io/address/0xc1FbE5097832220f7D7D721a7449850d1E4ca220#code">
                  https://sepolia.etherscan.io/
                  address/0xc1F...
                </a>


              </div>
            </CardFooter>
            <p className="text-gray-400">
              Check SHA256:
            </p>
            <CardFooter className="flex justify-center">
              <div className="rounded-md border px-5 py-3 font-mono text-sm">


                <a className="text-blue-500 underline" href="https://emn178.github.io/online-tools/sha256.html">
                  https://emn178.github.io/online-tools/sha256.html
                </a>


              </div>
            </CardFooter>
            <div className="md:px-10">
              <GiveawayForm />
            </div>


          </div>
        </div>
      </div>
      <div className="space-y-8">
        
        <Suspense fallback={<div className="bg-gray-800 rounded-md p-4 px-8 space-y-2 overflow-auto max-h-64">
          <h2 className="text-lg font-medium text-white text-center">Winners</h2>
 <p className="text-white text-center">Fetching winners...</p>
        </div>}>
          <Winners />
        </Suspense>
        <Participants />
      </div>

      <footer
        className="bg-gray-900 text-center py-4 text-sm text-gray-400">
        Created by Bilkent Blockchain Society
      </footer>


    </div>

  </>);
}
