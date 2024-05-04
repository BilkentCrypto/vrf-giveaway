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
              Welcome to MAYFEST!
            </h1>
            <h1 className="text-white mt-10 text-sm font-medium">
              We are launching a verifiable and transparent giveaway by using the potential of the blockchain technology. 
              Conventional giveaway systems do not provide a way to three important things:
            </h1>
            <h1 className="text-white text-sm font-medium">
              Is source of randomness can be manipulated?
            </h1>
            <h1 className="text-white text-sm font-medium">
              Is the provided results are really first execution of the giveaway?
            </h1>
            <h1 className="text-white text-sm font-medium">
              Is participants list manipulated?
            </h1>
            <h1 className="text-white mt-2 text-sm font-medium">
              We solve this problems via using some blockchain methods. 
              Firstly, we use verifiable randommness source from Chainlink VRF.
              Secondly, we have deployed a smart contrat resistant to change.
              And finally, execution of the giveaway is only executed once and results are transparent to everyone.
              To not leak any personal data, we store only the hashes of the mails on Ethereum blockchain.
              But to provide the results mail and user name will be stored in the database, and winners will be announced after the giveaway.
            </h1>
            <h1 className=" text-white mt-10 flex text-sm font-medium ">
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
            <h1 className="text-white mt-2 text-sm font-medium">
             Good luck!
             </h1>
          </div>
        </div>
        <div className=" mt-10 lg:mt-10 ">

          <div className="text-center space-y-2">
            <h1 className="text-3xl font-bold"> Join Our Giveaway</h1>
            <p className="text-gray-500 text-sm dark:text-gray-400">
              Enter your name and Bilkent email to participate.
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
