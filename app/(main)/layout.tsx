"use client";

import { NavBar } from "@/components/nav-bar";
import { store } from "@/redux/store";
import { Provider } from "react-redux";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";

const MainLayout = ({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) => {
    return (
        <Provider store={store}>
            <SidebarProvider>
                <NavBar />
                <main className="h-full w-full pt-14">{children}</main>
                <AppSidebar />
            </SidebarProvider>
        </Provider>
    );
};

export default MainLayout;
