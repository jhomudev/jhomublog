'use client'

import React from "react";
import { Dropdown, DropdownTrigger, DropdownMenu, DropdownSection, DropdownItem } from "@nextui-org/dropdown";
import { User} from "@nextui-org/user";
import { signOut, useSession } from "next-auth/react";
import { DEFAULT_USER_AVATAR } from "../data";
import { Avatar } from "@nextui-org/avatar";
import ThemeToggle from "./ThemeToggle";
import {PersonIcon, ReaderIcon, BookmarkIcon, Pencil2Icon, ExitIcon, QuestionMarkIcon, SunIcon} from '@radix-ui/react-icons'
import { useRouter } from "next/navigation";

export default function UserDropdown() {
  const { data: session } = useSession()
  const {push} = useRouter()

  return (
    <Dropdown
      showArrow
      radius="sm"
      classNames={{
        base: "before:bg-default-200", // change arrow background
        content: "p-0 border-small border-divider bg-background",
      }}
    >
      <DropdownTrigger>
        <Avatar
            isBordered
            isDisabled={!session?.user}
            as="button"
            className="transition-transform"
            src={session?.user?.image || DEFAULT_USER_AVATAR}
            imgProps={{
              referrerPolicy: 'no-referrer'
            }}
          />
      </DropdownTrigger>
      <DropdownMenu
        aria-label="User options navigate"
        className="p-3"
        itemClasses={{
          base: [
            "rounded-md",
            "text-default-500",
            "transition-opacity",
            "data-[hover=true]:text-foreground",
            "data-[hover=true]:bg-default-100",
            "dark:data-[hover=true]:bg-default-50",
            "data-[selectable=true]:focus:bg-default-50",
            "data-[pressed=true]:opacity-70",
            "data-[focus-visible=true]:ring-default-500",
          ],
        }}
      >
        <DropdownSection aria-label="Profile & Actions" showDivider>
          <DropdownItem
            isReadOnly
            key="account"
            className="h-14 gap-2"
          >
            <User
              name={session?.user?.name}
              description={session?.user?.username}
              classNames={{
                name: "text-default-600",
                description: "text-default-500",
              }}
              avatarProps={{
                size: "sm",
                src: session?.user?.image || DEFAULT_USER_AVATAR,
              }}
            />
          </DropdownItem>
          <DropdownItem key="write" onPress={()=> push('/write')} className="flex items-center md:hidden" startContent={<Pencil2Icon />}>Write</DropdownItem>
          <DropdownItem key="profile" onPress={()=> push(`/${session?.user?.username}`)} className="flex items-center" startContent={<PersonIcon />}>Profile</DropdownItem>
          <DropdownItem key="library" onPress={()=> push('/me/bookmarks')} className="flex items-center" startContent={<BookmarkIcon />}>Bookmarks</DropdownItem>
          <DropdownItem key="stories" onPress={()=> push('/me/stories')} className="flex items-center" startContent={<ReaderIcon />}>Stories</DropdownItem>
        </DropdownSection>

        <DropdownSection aria-label="Preferences" showDivider>
          <DropdownItem
            isReadOnly
            key="theme"
            className="cursor-default"
            startContent={<SunIcon />}
            endContent={<ThemeToggle />}
          >
            Theme
          </DropdownItem>
        </DropdownSection>  

        <DropdownSection aria-label="Help & Feedback">
          <DropdownItem key="help_and_feedback" className="flex items-center" startContent={<QuestionMarkIcon />}>Help & Feedback</DropdownItem>
          <DropdownItem
            key="logout"
            className="flex items-center"
            startContent={<ExitIcon />}
            onPress={() => signOut()}
          >
            Log Out
          </DropdownItem>
        </DropdownSection> 
      </DropdownMenu>
    </Dropdown>
  );
}
