"use client";
import Image from "next/image";
import { Button } from "../ui/button";
import { ArrowRight } from "lucide-react";
import { useRouter } from "next/navigation";
import { User } from "@supabase/supabase-js";
import { PlanNoPay } from "../payment/Plans";
import { AnimatedTooltipPreview } from "./tooltip";
import { ContainerScroll } from "../ui/container-scroll-animation";

interface HeroProps {
  user: User | null;
}

export function Hero({ user }: HeroProps) {
  const router = useRouter();
  return (
    <div className="flex flex-col font-gilroy items-center justify-center w-full  p-2 mt-5 mb-5">
      <div className="flex  flex-col items-center justify-center w-[100%]  text-center px-2 font-gilroy">
        <h1 className="text-6xl font-bold w-[100%]">
          Manage your AI <span className="block">Conversational Agents</span>
        </h1>
      </div>
      <div className="flex text-xl text-gray-400 leading-tight flex-col items-center justify-center w-full mt-5 mb-5">
        <p>Simulation & evals for voice and chat agents</p>
      </div>

      <Button
        className="w-[300px] flex justify-around text-xl px-8 h-[40px] bg-white text-black font-base rounded-lg shadow-lg mt-5 mb-5"
        onClick={() => {
          router.push("/dashboard");
        }}
      >
        Book a free demo
        <ArrowRight className="-rotate-45 mt-[3px]" size={16} />
      </Button>
      <ContainerScroll
        titleComponent={<h1 className="text-xl font-bold"></h1>}
        children={
          <img
            src="https://framerusercontent.com/images/rvvJ07ek8eiNF6CW7e9vshgrK1I.png?scale-down-to=2048"
            alt="Hero"
            className="w-full h-full object-cover rounded-2xl"
          />
        }
      />
    </div>
  );
}
