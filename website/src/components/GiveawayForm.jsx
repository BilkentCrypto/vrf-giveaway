"use client";


import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { participate } from "@/app/actions";

import { useToast } from "./ui/use-toast";

export default function GiveawayForm() {

    const { toast } = useToast()

    async function handleParticipate(e) {
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
                description: "Participated successfully!",
            })   
        }
      }

    return (
    <form action={handleParticipate} className="space-y-4">
        <div>
            <Label htmlFor="name">Name</Label>
            <Input id="name" name="name" placeholder="Enter your name" required />
        </div>
        <div>
            <Label htmlFor="email">Email</Label>
            <Input id="email" name="email" placeholder="Enter your email" required type="email" />
        </div>
        <div />
        <Button className="w-full" type="submit">
            Join Giveaway
        </Button>
    </form>
    )
}