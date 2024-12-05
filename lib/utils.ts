import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export function hasString(str: string, substring: string): boolean {
    return str.toLowerCase().includes(substring.toLowerCase());
}
