import Link from 'next/link'
import { ArrowRight, Sparkles } from 'lucide-react'
import { Card, CardAction, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { cn } from '@/lib/utils'
import { getInitials, type Student } from '@/lib/students'

function reasonFor(s: Student) {
  const reasons: string[] = []
  if (s.attendance < 75) reasons.push(`Attendance ${s.attendance}%`)
  if (s.cgpa < 6) reasons.push(`CGPA ${s.cgpa.toFixed(2)}`)
  const first = s.sgpaHistory[0]
  const last = s.sgpaHistory[s.sgpaHistory.length - 1]
  if (last < first - 0.3) reasons.push('Declining SGPA')
  return reasons.length ? reasons.join(' · ') : 'Borderline performance'
}

export function AtRiskPanel({ students }: { students: Student[] }) {
  const atRisk = [...students].sort((a, b) => b.riskScore - a.riskScore).slice(0, 5)

  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Sparkles className="size-4 text-primary" aria-hidden="true" />
          AI Risk Predictions
        </CardTitle>
        <CardDescription>Students most likely to fall below academic thresholds</CardDescription>
        <CardAction>
          <Badge variant="secondary">Model v2.3</Badge>
        </CardAction>
      </CardHeader>
      <CardContent className="flex flex-col gap-1">
        <ul className="flex flex-col">
          {atRisk.map((s) => (
            <li key={s.id}>
              <Link
                href={`/students/${s.id}`}
                className="flex items-center gap-3 rounded-lg p-2 transition-colors hover:bg-muted"
              >
                <Avatar className="size-9">
                  <AvatarFallback className="bg-destructive/10 text-xs font-medium text-destructive">
                    {getInitials(s.name)}
                  </AvatarFallback>
                </Avatar>
                <div className="flex min-w-0 flex-1 flex-col">
                  <span className="truncate text-sm font-medium">{s.name}</span>
                  <span className="truncate text-xs text-muted-foreground">{reasonFor(s)}</span>
                </div>
                <div className="flex flex-col items-end">
                  <span
                    className={cn(
                      'text-sm font-semibold tabular-nums',
                      s.riskScore >= 60 ? 'text-destructive' : 'text-warning-foreground',
                    )}
                  >
                    {s.riskScore}%
                  </span>
                  <span className="text-[11px] text-muted-foreground">risk</span>
                </div>
              </Link>
            </li>
          ))}
        </ul>
        <Button variant="ghost" size="sm" className="mt-1 self-start" nativeButton={false} render={<Link href="/students" />}>
          View all students
          <ArrowRight data-icon="inline-end" />
        </Button>
      </CardContent>
    </Card>
  )
}
