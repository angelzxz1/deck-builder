import { cardTypes, parseStringToTypes } from "@/lib/cardsUtils";
import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface CardType {
    id: string;
    name: string;
    url: string;
    mana_cost: string;
    type_line: string;
    type: cardTypes;
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
    card_faces: [
        { name: string; url: string; type: cardTypes },
        { name: string; url: string; type: cardTypes }
    ];
}

export interface DeckListsState {
    commander: Array<CardType | CardTypeFaces>;
    lands: {
        basic: CardType[];
        land: Array<CardType | CardTypeFaces>;
    };
}

// export interface DeckListState {
//     list: Array<CardType | CardTypeFaces>;
// }
export interface DeckListState {
    list: {
        Land: Array<CardType | CardTypeFaces>;
        Creature: Array<CardType | CardTypeFaces>;
        Artifact: Array<CardType | CardTypeFaces>;
        Enchantment: Array<CardType | CardTypeFaces>;
        Instant: Array<CardType | CardTypeFaces>;
        Sorcery: Array<CardType | CardTypeFaces>;
        Battle: Array<CardType | CardTypeFaces>;
    };
}
const initialState: DeckListState = {
    list: {
        Land: [],
        Creature: [],
        Artifact: [],
        Enchantment: [],
        Instant: [],
        Sorcery: [],
        Battle: [],
    },
};

export const deckListSlice = createSlice({
    name: "deck list",
    initialState,
    reducers: {
        add: (
            { list },
            { payload }: PayloadAction<CardType | CardTypeFaces>
        ) => {
            let card: CardType | CardTypeFaces | undefined;
            let type: cardTypes;
            if ("type" in payload) {
                type = payload.type;
                card = list[type].find((item) => item.id === payload.id);
            } else {
                const { card_faces } = payload;
                type = card_faces[0].type;
                card = list[type].find((item) => item.id === payload.id);
            }
            if (!card) {
                list[type].push(payload);
            } else {
                card.amount++;
            }
        },
        addList: (
            { list },
            { payload }: PayloadAction<Array<CardType | CardTypeFaces>>
        ) => {
            // const tempArr: Array<CardType | CardTypeFaces> = [];
            payload.forEach((itemP) => {
                let card: CardType | CardTypeFaces | undefined;
                let type: cardTypes;
                if ("type" in itemP) {
                    type = itemP.type;
                    card = list[type].find((item) => {
                        return item.id === itemP.id;
                    });
                } else {
                    const { card_faces } = itemP;
                    type = card_faces[0].type;
                    card = list[type].find((item) => item.id === itemP.id);
                }

                if (!card) {
                    list[type].push(itemP);
                } else {
                    card.amount++;
                }
            });
        },
        remove: (
            { list },
            { payload }: PayloadAction<CardType | CardTypeFaces>
        ) => {
            let index = -1;
            let type: cardTypes;
            if ("type" in payload) {
                type = payload.type;
                list[type].forEach((value, i) => {
                    if (value.name === payload.name) {
                        index = i;
                    }
                });
            } else {
                type = payload.card_faces[0].type;
                list[type].forEach((value, i) => {
                    if (value.name === payload.name) {
                        index = i;
                    }
                });
            }
            if (index !== -1) {
                list[type].splice(index, 1); // Elimina 1 elemento desde el índice encontrado
            }
        },
    },
});

export const { add, remove, addList } = deckListSlice.actions;

export default deckListSlice.reducer;
