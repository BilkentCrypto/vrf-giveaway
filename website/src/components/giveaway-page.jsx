"use client";

import GiveawayForm from "./GiveawayForm";


export function GiveawayPage() {



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
              https://example.com/giveaway-contract
            </a>
        </div>
        <GiveawayForm />
        <div className="bg-white dark:bg-gray-800 rounded-md p-4 space-y-2">
          <h2 className="text-lg font-medium">Participants</h2>
          <ul className="space-y-1 text-sm">
            <li>example@email.com</li>
            <li>another@example.com</li>
            <li>participant@giveaway.com</li>
            <li>winner@contest.org</li>
            <li>lucky@draw.net</li>
          </ul>
        </div>
      </div>
    </div>
    <footer
      className="bg-gray-100 dark:bg-gray-900 text-center py-4 text-sm text-gray-500 dark:text-gray-400">
      Created by Bilkent Blockchain Society
    </footer>
  </>);
}
