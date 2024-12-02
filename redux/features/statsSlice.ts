import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { DeckListState, CardType, CardTypeFaces } from "./deckListSlice";
export interface ManaGenerated {
    white: number;
    black: number;
    red: number;
    green: number;
    blue: number;
    non_colored: number;
}
export interface StatsState {
    mana_generated: ManaGenerated;
    color_identity: string;
    lands: {
        land: number;
        basic_land: number;
        mana_generated: ManaGenerated;
    };
    creatures: {
        amount: number;
        mana_generated: ManaGenerated;
    };
    artifacts: {
        amount: number;
        mana_generated: ManaGenerated;
    };
    enchantmets: number;
    battle: number;
    planeswalker: number;
    instant: number;
    sorcery: number;
}

const get_Mana = (mana: ManaGenerated) => {
    const { black, blue, green, red, white, non_colored } = mana;
    return black + blue + green + red + white + non_colored;
};

const createManaGenerated = (): ManaGenerated => ({
    black: 0,
    blue: 0,
    green: 0,
    red: 0,
    white: 0,
    non_colored: 0,
});

const initialMana: ManaGenerated = createManaGenerated();

const initialState: StatsState = {
    mana_generated: initialMana,
    color_identity: "",
    lands: {
        land: 0,
        basic_land: 0,
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
    enchantmets: 0,
    battle: 0,
    planeswalker: 0,
    instant: 0,
    sorcery: 0,
};
export const StatsSlice = createSlice({
    name: "state",
    initialState,
    reducers: {
        manaGenerated: ({ mana_generated, creatures, artifacts, lands }) => {
            const totalCreaturesMana = get_Mana(creatures.mana_generated);
            const totalArtifactsMana = get_Mana(artifacts.mana_generated);
            const totalLandsMana = get_Mana(lands.mana_generated);
            mana_generated.black =
                creatures.mana_generated.black +
                artifacts.mana_generated.black +
                lands.mana_generated.black;
            mana_generated.blue =
                creatures.mana_generated.blue +
                artifacts.mana_generated.blue +
                lands.mana_generated.blue;
            mana_generated.green =
                creatures.mana_generated.green +
                artifacts.mana_generated.green +
                lands.mana_generated.green;
            mana_generated.red =
                creatures.mana_generated.red +
                artifacts.mana_generated.red +
                lands.mana_generated.red;
            mana_generated.white =
                creatures.mana_generated.white +
                artifacts.mana_generated.white +
                lands.mana_generated.white;
            mana_generated.non_colored =
                creatures.mana_generated.non_colored +
                artifacts.mana_generated.non_colored +
                lands.mana_generated.non_colored;
        },
    },
});

export const { manaGenerated } = StatsSlice.actions;

export default StatsSlice.reducer;
