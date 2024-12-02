import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface CardType {
    id: string;
    name: string;
    url: string;
    mana_cost: string;
    type_line: string;
    amount: number;
    color_identity: string;
}
export interface CardTypeFaces {
    id: string;
    name: string;
    mana_cost: string;
    type_line: string;
    amount: number;
    color_identity: string;
    card_faces: [{ name: string; url: string }, { name: string; url: string }];
}

export interface DeckListsState {
    commander: Array<CardType | CardTypeFaces>;
    lands: {
        basic: CardType[];
        land: Array<CardType | CardTypeFaces>;
    };
}

export interface DeckListState {
    list: Array<CardType | CardTypeFaces>;
}

const initialState: DeckListState = {
    list: [],
};

export const deckListSlice = createSlice({
    name: "deck list",
    initialState,
    reducers: {
        add: (
            { list },
            { payload }: PayloadAction<CardType | CardTypeFaces>
        ) => {
            const card = list.find((item) => {
                return item.id === payload.id;
            });
            if (!card) {
                list.push(payload);
            } else {
                card.amount++;
            }
        },
        remove: (
            { list },
            { payload }: PayloadAction<CardType | CardTypeFaces>
        ) => {
            let index = -1;
            list.forEach((value, i) => {
                if (value.name === payload.name) {
                    index = i;
                }
            });
            console.log(index);
            if (index !== -1) {
                list.splice(index, 1); // Elimina 1 elemento desde el índice encontrado
            }
        },
    },
});

export const { add, remove } = deckListSlice.actions;

export default deckListSlice.reducer;
