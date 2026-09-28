import { CheckCircle2, Lightbulb, Sparkles, Target } from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Progress, ProgressLabel } from '@/components/ui/progress'
import { Separator } from '@/components/ui/separator'
import { cn } from '@/lib/utils'
import type { Student } from '@/lib/students'

function buildInsights(s: Student) {
  const sorted = [...s.subjects].sort((a, b) => b.total - a.total)
  const strengths = sorted.slice(0, 2).map((x) => x.name)
  const weak = sorted.slice(-2).reverse()
  const first = s.sgpaHistory[0]
  const last = s.sgpaHistory[s.sgpaHistory.length - 1]
  const delta = last - first

  const recommendations: string[] = []
  if (s.attendance < 75)
    recommendations.push(
      `Attendance is ${s.attendance}%, below the 75% eligibility threshold. Initiate a guardian meeting this week.`,
    )
  if (delta < -0.3)
    recommendations.push(
      `SGPA has dropped by ${Math.abs(delta).toFixed(1)} points since Sem 1. Assign a faculty mentor for fortnightly check-ins.`,
    )
  weak.forEach((w) => {
    if (w.total < 65)
      recommendations.push(`Enrol in remedial sessions for ${w.name} (scored ${w.total}/100).`)
  })
  if (recommendations.length === 0) {
    recommendations.push(
      s.cgpa >= 8.5
        ? 'Consistently high performer — recommend for research internships and peer tutoring roles.'
        : `Encourage additional practice in ${weak[0].name} to move into the next performance band.`,
    )
  }

  const trendLabel =
    delta > 0.2 ? 'Improving' : delta < -0.2 ? 'Declining' : 'Stable'
  const predictedNext = Math.max(0, Math.min(10, last + delta / 3))

  return { strengths, weak, recommendations, trendLabel, predictedNext }
}

export function AiInsightsCard({ student }: { student: Student }) {
  const { strengths, weak, recommendations, trendLabel, predictedNext } = buildInsights(student)
  const riskTone =
    student.riskScore >= 60 ? 'High' : student.riskScore >= 35 ? 'Moderate' : 'Low'

  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Sparkles className="size-4 text-primary" aria-hidden="true" />
          AI Performance Insights
        </CardTitle>
        <CardDescription>Generated from grades, attendance and SGPA trajectory</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col gap-5">
        <Progress
          value={student.riskScore}
          className={cn(
            '[&_[data-slot=progress-track]]:h-2',
            riskTone === 'High' && '[&_[data-slot=progress-indicator]]:bg-destructive',
            riskTone === 'Moderate' && '[&_[data-slot=progress-indicator]]:bg-warning',
            riskTone === 'Low' && '[&_[data-slot=progress-indicator]]:bg-success',
          )}
        >
          <ProgressLabel>Academic risk · {riskTone}</ProgressLabel>
          <span className="ml-auto text-sm tabular-nums text-muted-foreground">{student.riskScore}%</span>
        </Progress>

        <dl className="grid grid-cols-2 gap-3">
          <div className="rounded-lg bg-muted p-3">
            <dt className="text-xs text-muted-foreground">SGPA trend</dt>
            <dd className="font-semibold">{trendLabel}</dd>
          </div>
          <div className="rounded-lg bg-muted p-3">
            <dt className="text-xs text-muted-foreground">Predicted Sem 5 SGPA</dt>
            <dd className="font-semibold tabular-nums">{predictedNext.toFixed(2)}</dd>
          </div>
        </dl>

        <Separator />

        <div className="flex flex-col gap-2">
          <h3 className="flex items-center gap-1.5 text-sm font-medium">
            <CheckCircle2 className="size-4 text-success" aria-hidden="true" />
            Strengths
          </h3>
          <p className="text-sm text-muted-foreground">{strengths.join(', ')}</p>
        </div>
        <div className="flex flex-col gap-2">
          <h3 className="flex items-center gap-1.5 text-sm font-medium">
            <Target className="size-4 text-warning" aria-hidden="true" />
            Focus areas
          </h3>
          <p className="text-sm text-muted-foreground">
            {weak.map((w) => `${w.name} (${w.total})`).join(', ')}
          </p>
        </div>
        <div className="flex flex-col gap-2">
          <h3 className="flex items-center gap-1.5 text-sm font-medium">
            <Lightbulb className="size-4 text-primary" aria-hidden="true" />
            Recommended actions
          </h3>
          <ul className="flex flex-col gap-2">
            {recommendations.map((r) => (
              <li key={r} className="rounded-lg border bg-card p-3 text-sm leading-relaxed">
                {r}
              </li>
            ))}
          </ul>
        </div>
      </CardContent>
    </Card>
  )
}
