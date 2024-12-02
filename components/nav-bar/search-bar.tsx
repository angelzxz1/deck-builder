"use client";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { useDispatch } from "react-redux";

import axios from "axios";
import { add, CardType, CardTypeFaces } from "@/redux/features/deckListSlice";
import { hasCardFaces } from "@/lib/utils";
const formSchema = z.object({
    cardName: z.string().min(1),
});
export const CreateCardFormat = (
    res: axios.AxiosResponse
): CardTypeFaces | CardType => {
    let cardData: CardTypeFaces | CardType;
    const { name, id, mana_cost, type_line, color_identity } = res.data;
    if (hasCardFaces(res.data)) {
        const { card_faces } = res.data;
        cardData = {
            name,
            id,
            mana_cost,
            type_line,
            color_identity,
            amount: 1,
            card_faces: [
                {
                    name: card_faces[0].name,
                    url: card_faces[0].image_uris.large,
                },
                {
                    name: card_faces[1].name,
                    url: card_faces[1].image_uris.large,
                },
            ],
        };
    } else {
        const { image_uris } = res.data;
        cardData = {
            name,
            url: image_uris.large,
            id,
            mana_cost,
            type_line,
            amount: 1,
            color_identity,
        };
    }
    return cardData;
};

export const SearchBarNav = () => {
    const dispatch = useDispatch();
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            cardName: "",
        },
    });
    async function onSubmit(values: z.infer<typeof formSchema>) {
        try {
            const nombre = values.cardName.replaceAll(" ", "+");
            const url = `https://api.scryfall.com/cards/named?fuzzy=${nombre}`;
            const res = await axios.get(url);
            dispatch(add(CreateCardFormat(res)));
            form.resetField("cardName");
        } catch (error) {
            console.log(error);
        }
    }
    return (
        <Form {...form}>
            <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="flex gap-2 w-full"
            >
                <FormField
                    control={form.control}
                    name="cardName"
                    render={({ field }) => (
                        <FormItem className="w-full">
                            <FormControl>
                                <Input
                                    className="bg-background/50"
                                    placeholder="Write a card name here..."
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <Button type="submit" variant="outline">
                    <Search />
                </Button>
            </form>
        </Form>
    );
};
