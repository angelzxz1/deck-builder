"use client";
import { hasCardFaces } from "@/lib/cardsUtils";

import Image from "next/image";
import {
    CardType,
    CardTypeFaces,
    remove,
} from "@/redux/features/deckListSlice";
import { useDispatch } from "react-redux";
import { Button } from "@/components/ui/button";
import { Minus, Plus, RefreshCw, X } from "lucide-react";
import { useState } from "react";

export const Card = ({
    item,
}: Readonly<{ item: CardType | CardTypeFaces }>) => {
    // const deckList = useSelector((state: RootState) => state.deckList.list);
    const dispatch = useDispatch();
    const [isFront, setIsFront] = useState<boolean>(true);
    if (hasCardFaces(item)) {
        return (
            <div className="w-full h-20 flex justify-center relative">
                <div className="absolute left-0 hidden group-hover:flex flex-wrap gap-1">
                    <div className="flex w-full justify-center bg-background rounded-full border dark:border-white border-black">
                        {item.amount < 10 ? `0${item.amount}` : item.amount}
                    </div>
                    <div className="flex w-full justify-center">
                        <Button className=" h-auto rounded-l-3xl border p-2 hover:scale-110 active:scale-100">
                            <Minus />
                        </Button>
                        <Button className="  h-auto rounded-r-3xl border p-2 hover:scale-110 active:scale-100">
                            <Plus />
                        </Button>
                    </div>
                </div>
                <Button
                    className="absolute right-0 h-auto w-auto p-1 hidden group-hover:flex hover:scale-110 active:scale-100 transition-transform"
                    variant="destructive"
                    size="icon"
                    onClick={() => {
                        dispatch(remove(item));
                    }}
                >
                    <X />
                </Button>
                <Button
                    variant="empty"
                    size="icon"
                    className="absolute bottom-1/2 right-1/2 translate-x-1/2 hidden group-hover:flex translate-y-1/2 bg-background/70 hover:scale-110 active:scale-100 transition-transform"
                    onClick={() => setIsFront((prev) => !prev)}
                >
                    <RefreshCw />
                </Button>
                {isFront ? (
                    <Image
                        src={(item as CardTypeFaces).card_faces[0].url}
                        alt={item.name}
                        width={170}
                        height={100}
                        className="w-full transition-transform peer-hover:scale-125 rounded-xl absolute top-0 z-30 peer-hover:z-[51]"
                    />
                ) : (
                    <Image
                        src={(item as CardTypeFaces).card_faces[1].url}
                        alt={item.name}
                        width={170}
                        height={100}
                        className="w-full transition-transform peer-hover:scale-125 rounded-xl absolute top-0 z-30 peer-hover:z-[51]"
                    />
                )}
            </div>
        );
    }
    return (
        <div className="w-full h-20 flex justify-center relative">
            <div className="absolute left-0 hidden group-hover:flex flex-wrap gap-1">
                <div className="flex w-full justify-center bg-background rounded-full border dark:border-white border-black">
                    {item.amount < 10 ? `0${item.amount}` : item.amount}
                </div>
                <div className="flex w-full justify-center">
                    <Button className=" h-auto rounded-l-3xl border p-2 hover:scale-110 active:scale-100">
                        <Minus />
                    </Button>
                    <Button className="  h-auto rounded-r-3xl border p-2 hover:scale-110 active:scale-100">
                        <Plus />
                    </Button>
                </div>
            </div>
            <Button
                className="absolute right-0 h-auto w-auto p-1 hidden group-hover:flex hover:scale-110 active:scale-100 transition-transform"
                variant="destructive"
                size="icon"
                onClick={() => {
                    dispatch(remove(item));
                }}
            >
                <X />
            </Button>

            <Image
                src={(item as CardType).url}
                alt={item.name}
                width={170}
                height={100}
                className="w-full transition-transform peer-hover:scale-125 rounded-xl absolute top-0 z-30 peer-hover:z-[51]"
            />
        </div>
    );
};
