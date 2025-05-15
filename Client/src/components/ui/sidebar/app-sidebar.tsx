"use client";
import * as React from "react";
import { ChevronsUpDown, LayoutGrid, LogOut } from "lucide-react";
import { NavMain } from "./nav-main";
import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarRail, useSidebar } from "./sidebar";
import { SkeletonSidebar } from "../skeleton";
import { useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Image from "next/image";
import { shortenText } from "@/lib/helpers";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../card";
import { Button } from "../button";
import Link from "next/link";

const data = {
  navMain: [
    {
      title: "Overview",
      url: "/dashboard",
      isActive: true,
      icon: LayoutGrid,
    },
    {
      title: "Logout",
      url: "/auth/logout",
      icon: LogOut,
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const [activeNav, setActiveNav] = useState("/dashboard");
  const { isMobile, state, openMobile, setOpenMobile } = useSidebar();

  const navMainItems = data.navMain.map((item) => ({
    ...item,
    isActive: item.url === activeNav, // Dynamically set isActive
  }));

  if (status !== "success") return <SkeletonSidebar />;
  return (
    <Sidebar {...props} isMobile={isMobile} state={state} openMobile={openMobile} setOpenMobile={setOpenMobile}>
      <SidebarHeader>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <div className='w-full cursor-pointer hover:text-purple-800 h-[50px] flex items-center gap-3 justify-between'>
              <div className='flex items-center gap-2 flex-wrap'></div>
              <ChevronsUpDown className='w-4' />
            </div>
          </DropdownMenuTrigger>
          <DropdownMenuContent className='w-64 rounded-lg' align='start' side='bottom' sideOffset={4}>
            <DropdownMenuLabel className='text-xs text-muted-foreground'>General</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem className='gap-2 p-2'>
              <div className='flex size-6 items-center justify-center rounded-md border bg-background'>
                <LogOut className='size-4' />
              </div>
              <Link href='/auth/logout' className='font-medium text-muted-foreground'>
                Logout
              </Link>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarHeader>
      <SidebarContent className='pt-0'>
        <NavMain items={navMainItems} setActiveNav={setActiveNav} setOpenMobile={setOpenMobile} />
      </SidebarContent>
      <SidebarFooter>
        <Card className='shadow-none border-none p-1 bg-gray-100'>
          <CardHeader className='p-4 pb-0'>
            <CardTitle className='text-sm'>Welcome back</CardTitle>
            <CardDescription>Master Leadership, Web & Graphics Design—Elevate Your Future Today!</CardDescription>
          </CardHeader>
          <CardContent className='flex gap-2.5 p-4'>
            <Link href='/'>
              <Button className='bg-transparent max-w-[110px]' variant={"outline"}>
                Return Home
              </Button>
            </Link>
          </CardContent>
        </Card>
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
