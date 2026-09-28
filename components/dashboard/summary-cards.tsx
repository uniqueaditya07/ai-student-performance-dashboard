import { AlertTriangle, CalendarCheck, GraduationCap, Users, TrendingDown, TrendingUp } from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { cn } from '@/lib/utils'

type Summary = {
  total: number
  avgCgpa: number
  avgAttendance: number
  needsAttention: number
}

export function SummaryCards({ summary }: { summary: Summary }) {
  const cards = [
    {
      label: 'Total Students',
      value: summary.total.toString(),
      hint: 'Across 4 departments',
      delta: '+2 this semester',
      positive: true,
      icon: Users,
      tone: 'bg-primary/10 text-primary',
    },
    {
      label: 'Average CGPA',
      value: summary.avgCgpa.toFixed(2),
      hint: 'Out of 10.00',
      delta: '+0.12 vs last sem',
      positive: true,
      icon: GraduationCap,
      tone: 'bg-success/12 text-success-foreground',
    },
    {
      label: 'Average Attendance',
      value: `${summary.avgAttendance}%`,
      hint: 'Min. required 75%',
      delta: '-1.4% vs last month',
      positive: false,
      icon: CalendarCheck,
      tone: 'bg-info/12 text-info-foreground',
    },
    {
      label: 'Needs Attention',
      value: summary.needsAttention.toString(),
      hint: 'Low CGPA or attendance',
      delta: 'Flagged by AI model',
      positive: false,
      icon: AlertTriangle,
      tone: 'bg-destructive/10 text-destructive',
    },
  ]

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
      {cards.map((card) => (
        <Card key={card.label}>
          <CardHeader className="flex flex-row items-start justify-between gap-2">
            <div className="flex flex-col gap-1">
              <CardDescription>{card.label}</CardDescription>
              <CardTitle className="text-3xl font-semibold tabular-nums">{card.value}</CardTitle>
            </div>
            <div className={cn('flex size-10 items-center justify-center rounded-lg', card.tone)}>
              <card.icon className="size-5" aria-hidden="true" />
            </div>
          </CardHeader>
          <CardContent className="flex flex-col gap-1 text-xs">
            <span className="text-muted-foreground">{card.hint}</span>
            <span
              className={cn(
                'inline-flex items-center gap-1 font-medium',
                card.positive ? 'text-success-foreground' : 'text-muted-foreground',
              )}
            >
              {card.positive ? (
                <TrendingUp className="size-3.5" aria-hidden="true" />
              ) : (
                <TrendingDown className="size-3.5" aria-hidden="true" />
              )}
              {card.delta}
            </span>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
