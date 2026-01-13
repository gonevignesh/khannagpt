"use client";

import React from "react"
import { ThemeProvider } from "next-themes";
import { Toaster } from "../ui/sonner";

interface Props {
    children: React.ReactNode;
}

const Providers = ({ children }: Props) => {
    return (
        <ThemeProvider
            attribute="class"
            defaultTheme="dark"
            enableSystem
            disableTransitionOnChange
        >
            <Toaster
                richColors
                position="top-center"
            />
            {children}
        </ThemeProvider>
    );
};

export default Providers
