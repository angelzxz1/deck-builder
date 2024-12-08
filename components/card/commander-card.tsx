"use client";
import { hasCardFaces } from "@/lib/cardsUtils";
import { CardType, CardTypeFaces } from "@/redux/features/deckListSlice";
import { useState } from "react";
import Image from "next/image";
export const CommanderCard = ({
    item,
}: Readonly<{ item: CardType | CardTypeFaces }>) => {
    // console.log(item);
    const [isFront, setIsFront] = useState<boolean>(true);
    const size = 300;
    console.log(hasCardFaces(item));
    if (hasCardFaces(item)) {
        return (
            <div className="w-full flex justify-center">
                {isFront ? (
                    <Image
                        src={(item as CardTypeFaces).card_faces[0].url}
                        alt={item.name}
                        width={size}
                        height={size}
                        className="rounded-xl"
                    />
                ) : (
                    <Image
                        src={(item as CardTypeFaces).card_faces[1].url}
                        alt={item.name}
                        width={size}
                        height={size}
                        className="rounded-xl"
                    />
                )}
            </div>
        );
    } else {
        return (
            <div className="w-full flex justify-center">
                <Image
                    src={(item as CardType).url}
                    alt={item.name}
                    width={size}
                    height={size}
                    className="rounded-xl"
                />
            </div>
        );
    }
};
