import { Badge } from '@/components/ui/badge'
import { cn } from '@/lib/utils'
import type { PerformanceStatus } from '@/lib/students'

const styles: Record<PerformanceStatus, string> = {
  Excellent: 'bg-success/12 text-success-foreground border-success/25',
  Good: 'bg-info/12 text-info-foreground border-info/25',
  Average: 'bg-warning/15 text-warning-foreground border-warning/30',
  'Needs Attention': 'bg-destructive/10 text-destructive border-destructive/25',
}

const dots: Record<PerformanceStatus, string> = {
  Excellent: 'bg-success',
  Good: 'bg-info',
  Average: 'bg-warning',
  'Needs Attention': 'bg-destructive',
}

export function StatusBadge({
  status,
  className,
}: {
  status: PerformanceStatus
  className?: string
}) {
  return (
    <Badge variant="outline" className={cn(styles[status], className)}>
      <span aria-hidden="true" className={cn('size-1.5 rounded-full', dots[status])} />
      {status}
    </Badge>
  )
}
