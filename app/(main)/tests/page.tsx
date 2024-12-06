"use client";
import { Button } from "@/components/ui/button";
// import { remove } from "@/redux/features/deckListSlice";
import { Minus, Plus, RefreshCw, X } from "lucide-react";
import Image from "next/image";
import type { JSX } from "react";
import { useDispatch } from "react-redux";

export default function Page() {
    const dispatch = useDispatch();
    const divs = [
        "Lands",
        "Creatures",
        "Artifacts",
        "Enchantments",
        "Instants",
        "Sorceries",
        "Battles",
    ];
    const card = (
        <Image
            src="https://cards.scryfall.io/large/front/c/1/c1a31d52-a407-4ded-bfca-cc812f11afa0.jpg?1673149384"
            alt="mv"
            width={170}
            height={100}
            className="w-full transition-transform peer-hover:scale-125 rounded-xl absolute top-0 z-30 peer-hover:z-[51]"
        />
    );
    const arrArr: JSX.Element[] = [];
    for (let i = 0; i < 96; i++) {
        arrArr.push(card);
    }
    return (
        <main className="flex justify-evenly pt-8">
            {divs.map((type, i) => (
                <div className="flex flex-wrap w-[12%]" key={`container_${i}`}>
                    <div className="w-full flex justify-center ">{type}</div>
                    <div className="w-full flex justify-center flex-wrap ">
                        {arrArr.map((item, j) => (
                            <div className="w-full h-20 flex justify-center relative">
                                <div className="h-full w-full flex justify-center items-center overflow-visible z-50 hover:z-[52] peer group">
                                    <div className="absolute left-0 hidden group-hover:flex flex-wrap gap-1">
                                        <div className="flex w-full justify-center bg-background rounded-full border dark:border-white border-black">
                                            10
                                        </div>
                                        <div className="flex w-full justify-center">
                                            <Button className="h-auto rounded-l-3xl border p-2 hover:scale-110 active:scale-100">
                                                {/* {item.amount < 10
                                            ? `0${item.amount}`
                                            : item.amount} */}
                                                <Minus />
                                            </Button>
                                            <Button className="h-auto rounded-r-3xl border p-2 hover:scale-110 active:scale-100">
                                                {/* {item.amount < 10
                                            ? `0${item.amount}`
                                            : item.amount} */}
                                                <Plus />
                                            </Button>
                                        </div>
                                    </div>

                                    <Button
                                        className="absolute right-0 h-auto w-auto p-1 hidden group-hover:flex hover:scale-110 active:scale-100 transition-transform"
                                        variant="destructive"
                                        size="icon"
                                        onClick={() => {
                                            // funciona
                                            // dispatch(remove(item));
                                        }}
                                    >
                                        <X />
                                    </Button>
                                    <Button
                                        variant="empty"
                                        size="icon"
                                        className="absolute bottom-1/2 right-1/2 translate-x-1/2 hidden group-hover:flex translate-y-1/2 bg-background/70 hover:scale-110 active:scale-100 transition-transform"
                                        onClick={() => {
                                            // setIsFront((prev) => !prev)}
                                        }}
                                    >
                                        <RefreshCw />
                                    </Button>
                                </div>
                                {item}
                            </div>
                        ))}
                    </div>
                </div>
            ))}
        </main>
    );
}
