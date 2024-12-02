"use client";
import { RootState } from "@/redux/store";
import { useSelector, useDispatch } from "react-redux";
import { Card } from "@/components/card";
export default function Home() {
    const deckList = useSelector((state: RootState) => state.deckList.list);
    return (
        <main className="flex px-16 pt-8 gap-4 flex-wrap justify-center">
            {deckList.map((item) => (
                <Card item={item} key={item.id} />
            ))}
        </main>
    );
}
