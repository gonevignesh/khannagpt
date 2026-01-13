"use client";

import { usePathname } from "next/navigation";
import React, { useEffect, useState } from "react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "./ui/tooltip";
import { Button, buttonVariants } from "./ui/button";
import { cn } from "@/utils";
import Icons from "./global/icons";
import UserAccount from "./user-account";
import Link from "next/link";
import Image from "next/image";
import { User } from "@supabase/supabase-js";
import { useSidebar } from "@/hooks";
import { useTheme } from "next-themes";
import { MoonIcon, SunIcon } from "lucide-react";

interface Props {
    user: User | null;
}

const DesktopHeader = ({ user }: Props) => {

    const pathname = usePathname();

    const { isOpen: isOpenSidebar, setIsOpen: setIsOpenSidebar } = useSidebar();

    const { theme, setTheme, resolvedTheme } = useTheme();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    const toggleTheme = () => {
        setTheme(resolvedTheme === "dark" ? "light" : "dark");
    };

    useEffect(() => {

    }, [pathname]);

    return (
        <header className="fixed inset-x-0 top-0 z-50 w-full px-3 h-14 hidden lg:block">
            <div className="flex items-center justify-between w-full h-full mx-auto">
                <div className="flex items-center gap-x-2 text-muted-foreground">
                    <Link href="/" className="mr-2 text-foreground">
                        <Image src="/logo.png" alt="Brand Logo" width={32} height={32} className="size-8" />
                    </Link>
                    {user && (
                        <TooltipProvider delayDuration={0}>
                            <Tooltip>
                                <TooltipTrigger asChild>
                                    <Button
                                        size="icon"
                                        variant="ghost"
                                        className={cn(
                                            "transition transform duration-300",
                                        )}
                                        onClick={() => setIsOpenSidebar(!isOpenSidebar)}
                                    >
                                        <Icons.panel className="size-4" />
                                    </Button>
                                </TooltipTrigger>
                                <TooltipContent>
                                    Sidebar
                                </TooltipContent>
                            </Tooltip>
                        </TooltipProvider>
                    )}
                </div>
                <React.Suspense fallback={<div>
                    wait a moment
                </div>}>
                    <div className="flex items-center gap-x-2 text-muted-foreground">
                        {/* Theme Toggle Button */}
                        {mounted && (
                            <TooltipProvider delayDuration={0}>
                                <Tooltip>
                                    <TooltipTrigger asChild>
                                        <Button
                                            size="icon"
                                            variant="ghost"
                                            onClick={toggleTheme}
                                            className="transition-all"
                                        >
                                            {resolvedTheme === "dark" ? (
                                                <SunIcon className="size-4" />
                                            ) : (
                                                <MoonIcon className="size-4" />
                                            )}
                                        </Button>
                                    </TooltipTrigger>
                                    <TooltipContent>
                                        {resolvedTheme === "dark" ? "Light mode" : "Dark mode"}
                                    </TooltipContent>
                                </Tooltip>
                            </TooltipProvider>
                        )}

                        {user ? (
                            <>
                                <UserAccount user={user} />
                            </>
                        ) : (
                            <>
                                <Link href="/auth/signin" className={buttonVariants({ size: "sm", variant: "outline" })}>
                                    Log in
                                </Link>
                                <Link href="/auth/signup" className={buttonVariants({ size: "sm", })}>
                                    Sign Up
                                </Link>
                            </>
                        )}
                    </div>
                </React.Suspense>
            </div>
        </header>
    )
};

export default DesktopHeader
