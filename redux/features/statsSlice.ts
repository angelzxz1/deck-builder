import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import {
    CardType as TypeCard,
    CardTypeFaces as TypeCardFaces,
} from "./deckListSlice";

export type ColorKeys = "W" | "B" | "G" | "R" | "U" | "C";
type CardType =
    | "artifacts"
    | "battle"
    | "creatures"
    | "enchantmets"
    | "instant"
    | "lands"
    | "planeswalker"
    | "sorcery";
export type ManaGenerated = {
    [key in ColorKeys]: number;
};
type countAndMana = {
    amount: number;
    mana_generated: ManaGenerated;
};

type countOnly = { amount: number };
export type imageNames = "W" | "B" | "G" | "R" | "U";
export type color_identity_type = Array<imageNames>;
export type StatsState = {
    commander: Array<TypeCard | TypeCardFaces>;
    mana_generated: ManaGenerated;
    color_identity: color_identity_type;
    lands: countAndMana;
    creatures: countAndMana;
    artifacts: countAndMana;
    enchantmets: countOnly;
    battle: countOnly;
    planeswalker: countOnly;
    instant: countOnly;
    sorcery: countOnly;
};

const get_Mana = (mana: ManaGenerated) => {
    const { B, U, G, R, W, C } = mana;
    return B + U + G + R + W + C;
};

const createManaGenerated = (): ManaGenerated => ({
    B: 0,
    U: 0,
    G: 0,
    R: 0,
    W: 0,
    C: 0,
});

const initialMana: ManaGenerated = createManaGenerated();

const initialState: StatsState = {
    commander: [],
    mana_generated: initialMana,
    color_identity: [],
    lands: {
        amount: 0,
        mana_generated: initialMana,
    },
    creatures: {
        amount: 0,
        mana_generated: initialMana,
    },
    artifacts: {
        amount: 0,
        mana_generated: initialMana,
    },
    enchantmets: {
        amount: 0,
    },
    battle: {
        amount: 0,
    },
    planeswalker: {
        amount: 0,
    },
    instant: {
        amount: 0,
    },
    sorcery: {
        amount: 0,
    },
};
export const StatsSlice = createSlice({
    name: "state",
    initialState,
    reducers: {
        creaturesData: (
            { creatures },
            { payload }: PayloadAction<ManaGenerated>
        ) => {
            creatures.mana_generated.B += payload.B;
            creatures.mana_generated.U += payload.U;
            creatures.mana_generated.C += payload.C;
            creatures.mana_generated.G += payload.G;
            creatures.mana_generated.R += payload.R;
            creatures.mana_generated.W += payload.W;
        },
        artifactsData: (
            { artifacts },
            { payload }: PayloadAction<ManaGenerated>
        ) => {
            artifacts.mana_generated.B += payload.B;
            artifacts.mana_generated.U += payload.U;
            artifacts.mana_generated.C += payload.C;
            artifacts.mana_generated.G += payload.G;
            artifacts.mana_generated.R += payload.R;
            artifacts.mana_generated.W += payload.W;
        },
        landsData: ({ lands }, { payload }: PayloadAction<ManaGenerated>) => {
            lands.mana_generated.B += payload.B;
            lands.mana_generated.U += payload.U;
            lands.mana_generated.C += payload.C;
            lands.mana_generated.G += payload.G;
            lands.mana_generated.R += payload.R;
            lands.mana_generated.W += payload.W;
        },
        addCard: (
            {
                artifacts,
                battle,
                creatures,
                enchantmets,
                instant,
                lands,
                planeswalker,
                sorcery,
            },

            { payload }: PayloadAction<CardType>
        ) => {
            if (payload === "artifacts") {
                artifacts.amount++;
                return;
            }
            if (payload === "battle") {
                battle.amount++;
                return;
            }
            if (payload === "creatures") {
                creatures.amount++;
                return;
            }
            if (payload === "enchantmets") {
                enchantmets.amount++;
                return;
            }
            if (payload === "instant") {
                instant.amount++;
                return;
            }
            if (payload === "lands") {
                lands.amount++;
                return;
            }
            if (payload === "planeswalker") {
                planeswalker.amount++;
                return;
            }
            if (payload === "sorcery") {
                sorcery.amount++;
                return;
            }
        },
        setCommander: (
            state,
            { payload }: PayloadAction<Array<TypeCard | TypeCardFaces>>
        ) => {
            state.commander = [...payload];
            console.log(payload[0].color_identity);
            state.color_identity = [...payload[0].color_identity];
        },
        // manaGenerated: ({ mana_generated, creatures, artifacts, lands }) => {
        //     mana_generated.black =
        //         creatures.mana_generated.black +
        //         artifacts.mana_generated.black +
        //         lands.mana_generated.black;
        //     mana_generated.blue =
        //         creatures.mana_generated.blue +
        //         artifacts.mana_generated.blue +
        //         lands.mana_generated.blue;
        //     mana_generated.green =
        //         creatures.mana_generated.green +
        //         artifacts.mana_generated.green +
        //         lands.mana_generated.green;
        //     mana_generated.red =
        //         creatures.mana_generated.red +
        //         artifacts.mana_generated.red +
        //         lands.mana_generated.red;
        //     mana_generated.white =
        //         creatures.mana_generated.white +
        //         artifacts.mana_generated.white +
        //         lands.mana_generated.white;
        //     mana_generated.colorless =
        //         creatures.mana_generated.colorless +
        //         artifacts.mana_generated.colorless +
        //         lands.mana_generated.colorless;
        // },
    },
});

export const {
    creaturesData,
    artifactsData,
    landsData,
    addCard,
    setCommander,
} = StatsSlice.actions;

export default StatsSlice.reducer;
