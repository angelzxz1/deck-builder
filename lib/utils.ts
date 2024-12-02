import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}
export type ApiResponse = {
    card_faces?: any; // Propiedad opcional
    [key: string]: any; // Permite otras propiedades
};
export function hasCardFaces(data: ApiResponse): boolean {
    return "card_faces" in data;
}
export function hasString(str: string, substring: string): boolean {
    return str.toLowerCase().includes(substring.toLowerCase());
}
