"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import axios from "axios";
import { useState } from "react";
import { Loader } from "lucide-react";
import {
    CreateCardFormat,
    parseOracleText,
    propsChecker,
} from "@/lib/cardsUtils";
import { useDispatch /*useSelector*/ } from "react-redux";
import {
    addList,
    CardType,
    CardTypeFaces,
} from "@/redux/features/deckListSlice";

const formSchema = z.object({
    deckList: z.string().min(2, {
        message: "There has to be a card to search",
    }),
});

export function SearchList() {
    // 1. Define your form.
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            deckList: "",
        },
    });
    // const deckList = useSelector((state: RootState) => state.deckList.list);
    const dispatch = useDispatch();
    const [isFetching, setIsFetching] = useState<boolean>(false);
    // const [missingCards, setMissingCards] = useState<{ cardName: string }[]>(
    //     []
    // );

    // 2. Define a submit handler.
    async function onSubmit(values: z.infer<typeof formSchema>) {
        const list = values.deckList.split("\n");
        let stringOfMissing = "";
        setIsFetching(true);
        const provArr: Array<CardTypeFaces | CardType> = [];
        for (let i = 0; i < list.length; i++) {
            try {
                const formatedForSearch = list[i]
                    .toLowerCase()
                    .replace(" ", "+");
                const res = await axios.get(
                    `https://api.scryfall.com/cards/named?fuzzy=${formatedForSearch}`
                );
                const cardData = CreateCardFormat(res);
                if (propsChecker(res)) {
                    const text = parseOracleText(res.data.oracle_text);
                    console.log(text);
                }
                provArr.push(cardData);
                setTimeout(() => {}, 200);
            } catch (error) {
                console.log(error);
                stringOfMissing += list[i] + "\n";
                // setMissingCards((prev) => [...prev, { cardName: list[i] }]);
            }
        }
        dispatch(addList(provArr));
        form.reset();
        form.setValue("deckList", stringOfMissing);
        setIsFetching(false);
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                <FormField
                    control={form.control}
                    name="deckList"
                    render={({ field }) => (
                        <FormItem>
                            <FormControl>
                                <Textarea
                                    placeholder="Paste your whole decklist here..."
                                    {...field}
                                    rows={30}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <Button type="submit" disabled={isFetching}>
                    {!isFetching ? (
                        "Search"
                    ) : (
                        <Loader className="animate-spin" />
                    )}
                </Button>
            </form>
        </Form>
    );
}
