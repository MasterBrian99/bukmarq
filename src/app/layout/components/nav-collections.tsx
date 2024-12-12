import { ChevronRight, File, Folder, MoreHorizontal, Plus } from 'lucide-react'

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger
} from '@/components/ui/collapsible'
import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuAction,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem
} from '@/components/ui/sidebar'

interface TreeItem {
  name: string
  emoji: string
  url: string
  items?: TreeItem[]
}

const data: TreeItem[] = [
  {
    name: 'Travel Bucket List & Inspiration',
    url: '#',
    emoji: '🌎',
    items: [
      {
        name: 'Trip Planning & Itineraries',
        url: '#',
        emoji: '🗺️'
      },
      {
        name: 'Music Composition & Practice Log',
        url: '#',
        emoji: '🎵',
        items: [
          {
            name: 'Art & Design Portfolio',
            url: '#',
            emoji: '🖼️'
          }
        ]
      }
    ]
  },
  {
    name: 'Family Calendar & Event Planning',
    url: '#',
    emoji: '📅',
    items: []
  }
]

const NavCollections = () => {
  return (
    <SidebarGroup>
      <SidebarGroupLabel>Collections</SidebarGroupLabel>
      <SidebarGroupContent>
        <SidebarMenu>
          {data.map((item, index) => (
            <Tree key={index} item={item} />
          ))}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  )
}

export default NavCollections

function Tree({ item }: { item: TreeItem }) {
  const { items, ...singleItem } = item

  if (!items || items.length === 0) {
    return (
      <SidebarMenuItem>
        <SidebarMenuButton asChild>
          <a href="#">
            {singleItem.emoji}
            <span>{singleItem.name}</span>
          </a>
        </SidebarMenuButton>
        <SidebarMenuAction>
          <Plus />
        </SidebarMenuAction>
      </SidebarMenuItem>
    )
  }

  return (
    <Collapsible>
      <SidebarMenuItem>
        <SidebarMenuButton asChild>
          <a href="#">
            {singleItem.emoji}
            <span>{singleItem.name}</span>
          </a>
        </SidebarMenuButton>
        <CollapsibleTrigger asChild>
          <SidebarMenuAction
            className="left-2 bg-sidebar-accent text-sidebar-accent-foreground data-[state=open]:rotate-90"
            showOnHover
          >
            <ChevronRight />
          </SidebarMenuAction>
        </CollapsibleTrigger>
        <SidebarMenuAction>
          <Plus />
        </SidebarMenuAction>
        <CollapsibleContent>
          <SidebarMenuSub className="mx-0  pr-0">
            {items &&
              items.length > 0 &&
              items.map((subItem, index) => (
                <Tree key={index} item={subItem} />
              ))}
          </SidebarMenuSub>
        </CollapsibleContent>
      </SidebarMenuItem>
    </Collapsible>
  )
}
