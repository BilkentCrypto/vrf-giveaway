"use client";


import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { participate } from "@/app/actions";

import { useToast } from "./ui/use-toast";
import { useTheme } from "next-themes";


//maybe add recaptcha?
export default function GiveawayForm() {

    const { toast } = useToast()
const {setTheme} = useTheme();
    async function handleParticipate(e) {
        setTheme("dark")
        const res = JSON.parse(await participate(e));
        if(res.error) {
            toast({
                variant: "destructive",
                title: "Error",
                description: res.error,
            })   
        } else {
            toast({
                title: "Success",
                description: "Participated successfully!\nYour hash: " + res.newParticipant.emailHash,
            })   
        }
      }

    return (
    <form action={handleParticipate} className="space-y-4">
        <div>
            <Label htmlFor="name" className="text-white">Name</Label>
            
            <Input className="mt-2" id="name" name="name" placeholder="Enter your name" required />
        </div>
        <div>
            <Label htmlFor="email" className="text-white">Email</Label>
            <Input className="mt-2" id="email" name="email" placeholder="Enter your email" required type="email" />
        </div>
        <div />
        <Button className="w-full" variant="outline" type="submit">
            Join Giveaway
        </Button>
    </form>
    )
}