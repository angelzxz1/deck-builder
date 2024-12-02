"use client";
import { hasCardFaces } from "@/lib/utils";
import {
    CardType,
    CardTypeFaces,
    remove,
} from "@/redux/features/deckListSlice";
import { useDispatch } from "react-redux";
import { Button } from "@/components/ui/button";
import { RefreshCw, X } from "lucide-react";
import { useState } from "react";

export const Card = ({
    item,
}: Readonly<{ item: CardType | CardTypeFaces }>) => {
    // const deckList = useSelector((state: RootState) => state.deckList.list);
    const dispatch = useDispatch();
    const [isFront, setIsFront] = useState<boolean>(true);
    if (hasCardFaces(item)) {
        return (
            <div className="relative hover:scale-110 hover:z-10 z-0 cursor-pointer transition-all border">
                <div className="absolute top-9 left-0 bg-background h-auto rounded-r-3xl border p-2">
                    {item.amount < 10 ? `0${item.amount}` : item.amount}
                </div>
                <Button
                    className="absolute right-0 h-auto w-auto p-1"
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
                    className="absolute bottom-1/2 right-1/2 translate-x-1/2 translate-y-1/2 bg-background/70 hover:scale-110 active:scale-75"
                    onClick={() => setIsFront((prev) => !prev)}
                >
                    <RefreshCw />
                </Button>
                {isFront ? (
                    <img
                        src={(item as CardTypeFaces).card_faces[0].url}
                        alt={item.name}
                        className="w-56 rounded-xl border"
                    />
                ) : (
                    <img
                        src={(item as CardTypeFaces).card_faces[1].url}
                        alt={item.name}
                        className="w-56 rounded-xl"
                    />
                )}
            </div>
        );
    }
    return (
        <div className="relative hover:scale-110 hover:z-10 z-0 cursor-pointer transition-all">
            <div className="absolute top-9 left-0 bg-background h-auto rounded-r-3xl border p-2">
                {item.amount < 10 ? `0${item.amount}` : item.amount}
            </div>
            <Button
                className="absolute right-2 top-2 h-auto w-auto p-1 "
                variant="destructive"
                size="icon"
                onClick={() => {
                    dispatch(remove(item));
                }}
            >
                <X />
            </Button>

            <img
                src={(item as CardType).url}
                alt={item.name}
                className="w-56 rounded-xl"
            />
        </div>
    );
};
