"use client";

import { SidebarTrigger } from "../ui/sidebar";
import { SearchBarNav } from "./search-bar";
import { ModeToggle } from "./toggle-mode";

export const NavBar = () => {
    return (
        <nav className="w-full flex justify-center z-[99] fixed">
            <div className="max-w-[1024px] w-full flex rounded-b-lg border border-t-0 p-4 bg-background/50 backdrop-blur-lg">
                <div className="w-5/6 flex items-center h-full">
                    <SearchBarNav />
                </div>
                <div className="w-1/6 flex justify-end items-center gap-2">
                    <ModeToggle />
                    <SidebarTrigger />
                </div>
            </div>
        </nav>
    );
};
