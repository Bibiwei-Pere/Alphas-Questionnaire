"use client";
import { SidebarGroup, SidebarGroupLabel, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from "./sidebar";
import Link from "next/link";

export function NavMain({ items, setActiveNav, setOpenMobile }: any) {
  return (
    <SidebarGroup className='group-data-[collapsible=icon]:hidden'>
      <SidebarGroupLabel>General</SidebarGroupLabel>

      <SidebarMenu className='gap-3'>
        {items.map((item: any) => (
          <SidebarMenuItem key={item.title}>
            <SidebarMenuButton
              onClick={() => {
                setActiveNav(item.url);
                setOpenMobile(false);
              }}
              asChild
              isActive={item.isActive}
            >
              <Link href={item.url}>
                <item.icon />
                <span className='text-[16px]'>{item.title}</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        ))}
      </SidebarMenu>
    </SidebarGroup>
  );
}
