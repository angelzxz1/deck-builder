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
import { add } from "@/redux/features/deckListSlice";
import { CreateCardFormat, parseOracleText, propsChecker } from "@/lib/utils";
const formSchema = z.object({
    cardName: z.string().min(1),
});

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
            console.log(res.data);
            dispatch(add(CreateCardFormat(res)));
            if (propsChecker(res)) {
                const text = parseOracleText(res.data.oracle_text);
            }
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

/*

*/
