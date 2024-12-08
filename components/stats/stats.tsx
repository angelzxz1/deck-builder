"use client";

// import { CardType, CardTypeFaces } from "@/redux/features/deckListSlice";
import { color_identity_type, ColorKeys } from "@/redux/features/statsSlice";
import { RootState } from "@/redux/store";
import Image from "next/image";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { Separator } from "../ui/separator";
import { CommanderCard } from "../card/commander-card";
import { CommanderForm } from "./commander-form";
type imagesListType = { name: ColorKeys; src: string; alt: string }[];

const colorless = {
    name: "colorless",
    src: "/colorless.svg",
    alt: "colorless_logo",
};
const getIcons = (color_identity: color_identity_type): imagesListType => {
    if (color_identity.length === 0)
        return [
            {
                name: "C",
                src: "/C.svg",
                alt: "C_logo",
            },
        ];
    const list = color_identity.map((color) => {
        return {
            name: color,
            src: `/${color}.png`,
            alt: `/${color}_logo`,
        };
    });

    console.log(list);

    return list;
};

export const Stats = () => {
    const commander = useSelector((state: RootState) => state.state.commander);
    const color_identity = useSelector(
        (state: RootState) => state.state.color_identity
    );
    let mana_generated = useSelector(
        (state: RootState) => state.state.mana_generated
    );
    useEffect(() => {
        console.log(commander);
    }, [commander]);

    // const { B, U, G, R, W, C } = mana_generated;
    return (
        <div
            className="flex flex-col gap-2"
            key={commander[0] ? commander[0].name : Math.random() * 1000}
        >
            <div className="w-full ">
                <div className="w-full flex justify-center">Commander</div>
                <Separator className="my-2" />
                {commander.length === 0 ? (
                    <CommanderForm />
                ) : (
                    <CommanderCard item={commander[0]} />
                )}
            </div>
            {getIcons(color_identity).map((image) => (
                <div className="flex items-center gap-2">
                    <Image
                        src={image.src}
                        alt={image.alt}
                        width={25}
                        height={25}
                        key={image.alt}
                    />
                    <div>
                        {image.name in mana_generated
                            ? mana_generated[image.name]
                            : ""}
                    </div>
                </div>
            ))}
        </div>
    );
};
