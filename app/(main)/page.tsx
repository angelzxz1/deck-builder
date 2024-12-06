"use client";
import { RootState } from "@/redux/store";
import { useSelector } from "react-redux";
import { Card } from "@/components/card";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { cardTypes } from "@/lib/cardsUtils";
export default function Home() {
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const deckList = useSelector((state: RootState) => state.deckList.list);
    useEffect(() => setIsLoading(true), [deckList]);
    const ListofTypes = Object.keys(deckList) as Array<cardTypes>;

    if (!isLoading) return;
    return (
        <main className="flex px-8 pt-8 gap-4 justify-evenly relative items-start">
            {ListofTypes.map((type) => {
                return { name: type, list: deckList[type] };
            }).map((listByType, i) => (
                <div
                    className="flex flex-wrap w-[12%] h-full "
                    key={`container_${i}`}
                >
                    <div className="w-full flex justify-center">
                        {listByType.name}
                    </div>
                    <div className="w-full h-full">
                        {listByType.list.map((item) => (
                            <Card item={item} key={item.id} />
                        ))}
                    </div>
                </div>
            ))}

            {/* {deckList .map((item) => (
                <Card item={item} key={item.id} />
            ))} */}
        </main>
    );
}
