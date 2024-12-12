import { AppSidebar } from '@/components/app-sidebar'
import { NavActions } from '@/components/nav-actions'
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage
} from '@/components/ui/breadcrumb'
import { Input } from '@/components/ui/input'
import { Separator } from '@/components/ui/separator'
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger
} from '@/components/ui/sidebar'

export default function Layout() {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className="flex h-14 shrink-0 items-center gap-2">
          <div className="flex flex-1 items-center gap-2 px-3">
            <SidebarTrigger />
            <Separator orientation="vertical" className="mr-2 h-4" />
            <Input placeholder='Search' />
            {/* <Breadcrumb> */}
            {/*   <BreadcrumbList> */}
            {/*     <BreadcrumbItem> */}
            {/*       <BreadcrumbPage className="line-clamp-1"> */}
            {/*         Project Management & Task Tracking */}
            {/*       </BreadcrumbPage> */}
            {/*     </BreadcrumbItem> */}
            {/*   </BreadcrumbList> */}
            {/* </Breadcrumb> */}
          </div>
          <div className="ml-auto px-3">
            <NavActions />
          </div>
        </header>
        <h1>asdads</h1>
        <div>h1</div>
      </SidebarInset>

    </SidebarProvider>
  )
}
