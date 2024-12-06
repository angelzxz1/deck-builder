import { CardType, CardTypeFaces } from "@/redux/features/deckListSlice";
import { AxiosResponse } from "axios";

export function hasCardFaces(data: CardType | CardTypeFaces): boolean {
    return "card_faces" in data;
}
type ManaInfo = {
    colors: Record<string, number>;
    total: number;
};

export const CreateCardFormat = (
    res: AxiosResponse
): CardTypeFaces | CardType => {
    let cardData: CardTypeFaces | CardType;
    const { name, id, mana_cost, color_identity } = res.data;

    if (hasCardFaces(res.data)) {
        const { card_faces } = res.data;
        cardData = {
            name,
            id,
            mana_cost,
            type_line: card_faces.type_line,
            color_identity,
            amount: 1,
            card_faces: [
                {
                    name: card_faces[0].name,
                    url: card_faces[0].image_uris.large,
                    type: parseStringToTypes(card_faces[0].type_line).type,
                },
                {
                    name: card_faces[1].name,
                    url: card_faces[1].image_uris.large,
                    type: parseStringToTypes(card_faces[1].type_line).type,
                },
            ],
        };
    } else {
        const { image_uris, type_line } = res.data;
        const { type } = parseStringToTypes(type_line);
        cardData = {
            name,
            url: image_uris.large,
            id,
            mana_cost,
            type_line,
            type,
            amount: 1,
            color_identity,
        };
    }
    return cardData;
};

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

export type cardTypes =
    | "Land"
    | "Creature"
    | "Artifact"
    | "Enchantment"
    | "Instant"
    | "Sorcery"
    | "Battle";

export type typesArrayType = Array<cardTypes>;

export function parseStringToTypes(input: string): {
    type: cardTypes;
    types: typesArrayType;
    subTypes: string[];
} {
    const [beforeDash, afterDash] = input.split("—").map((part) => part.trim());
    const types = beforeDash ? (beforeDash.split(/\s+/) as typesArrayType) : [];
    const type = types[types.length - 1];
    return {
        type,
        types,
        subTypes: [...(afterDash ? afterDash.split(/\s+/) : [])],
    };
}
