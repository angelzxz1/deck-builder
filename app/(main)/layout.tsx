"use client";

import { NavBar } from "@/components/nav-bar";
import { store } from "@/redux/store";
import { Provider } from "react-redux";
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";

const MainLayout = ({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) => {
    return (
        <Provider store={store}>
            <SidebarProvider className="absolute">
                <NavBar />
                <AppSidebar />
            </SidebarProvider>
            <main className="h-full w-full pt-20">{children}</main>
        </Provider>
    );
};

export default MainLayout;
