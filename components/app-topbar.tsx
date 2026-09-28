import { Bell, CalendarDays } from 'lucide-react'
import { SidebarTrigger } from '@/components/ui/sidebar'
import { Separator } from '@/components/ui/separator'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'

export function AppTopbar() {
  return (
    <header className="sticky top-0 z-20 flex h-14 shrink-0 items-center gap-2 border-b bg-background/85 px-4 backdrop-blur md:px-6">
      <SidebarTrigger className="-ml-1" />
      <Separator orientation="vertical" className="mr-1 h-5 self-center" />
      <div className="flex min-w-0 flex-1 items-center gap-2 text-sm">
        <span className="truncate font-medium">Sri Venkateswara Institute of Technology</span>
        <Badge variant="secondary" className="hidden sm:inline-flex">
          AY 2025–26 · Odd Sem
        </Badge>
      </div>
      <div className="hidden items-center gap-1.5 text-sm text-muted-foreground lg:flex">
        <CalendarDays className="size-4" aria-hidden="true" />
        <span>28 Sep 2026</span>
      </div>
      <Button variant="ghost" size="icon" className="relative" aria-label="Notifications, 3 unread">
        <Bell />
        <span className="absolute top-1.5 right-1.5 size-2 rounded-full bg-destructive" aria-hidden="true" />
      </Button>
    </header>
  )
}
