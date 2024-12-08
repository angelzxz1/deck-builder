import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import axios from "axios";
import { z } from "zod";
import { useState } from "react";

import {
    CreateCardFormat,
    propsChecker,
    parseOracleText,
} from "@/lib/cardsUtils";
import { Button } from "@/components/ui/button";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { setCommander } from "@/redux/features/statsSlice";
import { Loader, Search } from "lucide-react";

const formSchema = z.object({
    commander: z.string().min(2).max(100),
});

export const CommanderForm = () => {
    const dispatch = useDispatch();

    const [isFetching, setIsFetching] = useState<boolean>(false);
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            commander: "",
        },
    });

    async function onSubmit({ commander }: z.infer<typeof formSchema>) {
        setIsFetching(true);
        try {
            const formatedForSearch = commander.toLowerCase().replace(" ", "+");
            const res = await axios.get(
                `https://api.scryfall.com/cards/named?fuzzy=${formatedForSearch}`
            );
            const cardData = CreateCardFormat(res);
            if (propsChecker(res)) {
                const text = parseOracleText(res.data.oracle_text);
                console.log("ignore this from commander form: ", text);
            }
            dispatch(setCommander([cardData]));
        } catch (error) {
            console.log(error);
        }

        form.reset();
        setIsFetching(false);
    }

    return (
        <Form {...form}>
            <form
                onSubmit={form.handleSubmit(onSubmit)}
                className=" flex gap-2"
            >
                <FormField
                    control={form.control}
                    name="commander"
                    render={({ field }) => (
                        <FormItem>
                            <FormControl>
                                <Input
                                    placeholder="Your commander name here"
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <Button type="submit" disabled={isFetching} variant="outline">
                    {isFetching ? (
                        <Loader className="animate-spin" />
                    ) : (
                        <Search />
                    )}
                </Button>
            </form>
        </Form>
    );
};
