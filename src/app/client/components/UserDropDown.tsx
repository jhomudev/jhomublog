'use client'

import { Avatar } from "@nextui-org/avatar";
import { Dropdown, DropdownItem, DropdownMenu, DropdownSection, DropdownTrigger } from "@nextui-org/dropdown";
import { User } from "@nextui-org/user";
import { BookmarkIcon, ExitIcon, Pencil2Icon, PersonIcon, QuestionMarkIcon, ReaderIcon, SunIcon } from '@radix-ui/react-icons';
import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { DEFAULT_USER_AVATAR } from "../data";
import ThemeToggle from "./ThemeToggle";

export default function UserDropdown() {
  const { data: session } = useSession()
  const { push } = useRouter()
  
  return (
    <Dropdown
      showArrow
      radius="sm"
      classNames={{
        base: "before:bg-default-200", // change arrow background
        content: `p-0 border-small border-divider dark:bg-bg_main_dark bg-background`,
      }}
    >
      <DropdownTrigger>
        <Avatar
          isBordered
          isDisabled={!session?.user}
          as="button"
          size="sm"
          className="transition-transform"
          src={session?.user?.image || DEFAULT_USER_AVATAR}
          imgProps={{ referrerPolicy: 'no-referrer' }}
        />
      </DropdownTrigger>
      <DropdownMenu
        aria-label="User options navigate"
        className="p-3"
        itemClasses={{
          base: [
            "rounded-md",
            "text-text_color dark:text-text_color_dark",
            "transition-opacity",
            "data-[hover=true]:text-text_color",
            "dark:data-[hover=true]:text-text_color_dark",
            "data-[hover=true]:bg-default-100",
            "dark:data-[hover=true]:bg-bg_soft_dark",
            "data-[selectable=true]:focus:bg-default-50",
            "data-[pressed=true]:opacity-70",
            "data-[focus-visible=true]:ring-default-500",
          ]
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
                name:  "text-text_color dark:text-text_color_dark",
                description: "text-text_soft_color dark:text-text_color_soft_dark"
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
