import { CardType, CardTypeFaces } from "@/redux/features/deckListSlice";
import { AxiosResponse } from "axios";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export function hasCardFaces(data: CardType | CardTypeFaces): boolean {
    return "card_faces" in data;
}
export function hasString(str: string, substring: string): boolean {
    return str.toLowerCase().includes(substring.toLowerCase());
}
export const CreateCardFormat = (
    res: AxiosResponse
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

type ManaInfo = {
    colors: Record<string, number>;
    total: number;
};

// Función para convertir números escritos como palabras a dígitos
function wordToNumber(word: string): number {
    const wordsToNumbers: Record<string, number> = {
        one: 1,
        two: 2,
        three: 3,
        four: 4,
        five: 5,
        six: 6,
        seven: 7,
        eight: 8,
        nine: 9,
        ten: 10,
    };
    return wordsToNumbers[word.toLowerCase()] || 0;
}

// Función para analizar la propiedad "oracle_text"
export function parseOracleText(
    oracleText: string
): ManaInfo | { total: number } {
    const manaRegex = /{([WUBRGC])}/g;
    const anyManaRegex = /Add (\w+|\d+) mana of any color/;
    let totalMana = 0;

    const manaMatches = oracleText.match(manaRegex);
    if (manaMatches) {
        let totalMana = 0;
        const newMatches = manaMatches
            .map((value) => {
                totalMana++;
                return value.replaceAll("{", "").replaceAll("}", "");
            })
            .reduce((accumulator, letter) => {
                // Si la letra ya existe en el objeto, incrementa su valor
                if (accumulator[letter]) {
                    accumulator[letter] += 1;
                } else {
                    // Si no existe, inicialízala con el valor 1
                    accumulator[letter] = 1;
                }
                return accumulator;
            }, {} as Record<string, number>);
        console.log(newMatches);
        return { colors: newMatches, total: totalMana };
    }

    const anyManaMatch = oracleText.match(anyManaRegex);
    if (anyManaMatch) {
        const value = anyManaMatch[1];
        const count = isNaN(Number(value))
            ? wordToNumber(value)
            : Number(value);
        totalMana += count;
    }
    return {
        total: totalMana,
    };
}
export function propsChecker(res: AxiosResponse): boolean {
    return "produced_mana" in res.data && "oracle_text" in res.data;
}
