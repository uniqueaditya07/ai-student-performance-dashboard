'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import {
  BarChart3,
  GraduationCap,
  LayoutDashboard,
  Settings,
  UserPlus,
  Users,
  Sparkles,
} from 'lucide-react'
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from '@/components/ui/sidebar'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'

const navItems = [
  { title: 'Dashboard', href: '/', icon: LayoutDashboard },
  { title: 'Students', href: '/students', icon: Users },
  { title: 'Analytics', href: '/analytics', icon: BarChart3 },
  { title: 'Settings', href: '/settings', icon: Settings },
]

export function AppSidebar() {
  const pathname = usePathname()

  const isActive = (href: string) => {
    if (href === '/') return pathname === '/'
    if (href === '/students') return pathname.startsWith('/students') && pathname !== '/students/new'
    return pathname.startsWith(href)
  }

  return (
    <Sidebar collapsible="icon">
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" render={<Link href="/" />}>
              <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
                <GraduationCap />
              </div>
              <div className="grid flex-1 text-left leading-tight">
                <span className="truncate font-semibold text-sidebar-accent-foreground">
                  EduInsight
                </span>
                <span className="truncate text-xs">Faculty Portal</span>
              </div>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Menu</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {navItems.map((item) => (
                <SidebarMenuItem key={item.href}>
                  <SidebarMenuButton
                    isActive={isActive(item.href)}
                    tooltip={item.title}
                    render={<Link href={item.href} />}
                  >
                    <item.icon />
                    <span>{item.title}</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel>Quick actions</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton
                  isActive={pathname === '/students/new'}
                  tooltip="Add Student"
                  render={<Link href="/students/new" />}
                >
                  <UserPlus />
                  <span>Add Student</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <div className="mx-3 mt-auto hidden rounded-lg border border-sidebar-border bg-sidebar-accent/60 p-3 group-data-[collapsible=icon]:hidden md:block">
          <div className="flex items-center gap-2 text-sm font-medium text-sidebar-accent-foreground">
            <Sparkles className="size-4 text-sidebar-primary" />
            AI Insights
          </div>
          <p className="mt-1 text-xs leading-relaxed">
            Risk predictions refresh after every internal assessment is uploaded.
          </p>
        </div>
      </SidebarContent>

      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" render={<Link href="/settings" />}>
              <Avatar className="size-8 rounded-lg">
                <AvatarFallback className="rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
                  KR
                </AvatarFallback>
              </Avatar>
              <div className="grid flex-1 text-left leading-tight">
                <span className="truncate text-sm font-medium text-sidebar-accent-foreground">
                  Dr. Kavitha Raman
                </span>
                <span className="truncate text-xs">Associate Professor, CSE</span>
              </div>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
