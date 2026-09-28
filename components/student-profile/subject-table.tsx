import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Badge } from '@/components/ui/badge'
import { cn } from '@/lib/utils'
import type { SubjectScore } from '@/lib/students'

function grade(total: number) {
  if (total >= 90) return 'O'
  if (total >= 80) return 'A+'
  if (total >= 70) return 'A'
  if (total >= 60) return 'B+'
  if (total >= 50) return 'B'
  if (total >= 40) return 'C'
  return 'F'
}

export function SubjectTable({ subjects }: { subjects: SubjectScore[] }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Semester 5 Marks</CardTitle>
        <CardDescription>Internal (40) + External (60) with subject attendance</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="overflow-hidden rounded-lg border">
          <Table>
            <TableHeader className="bg-muted/60">
              <TableRow>
                <TableHead>Code</TableHead>
                <TableHead>Subject</TableHead>
                <TableHead className="text-right">Internal</TableHead>
                <TableHead className="text-right">External</TableHead>
                <TableHead className="text-right">Total</TableHead>
                <TableHead className="text-center">Grade</TableHead>
                <TableHead className="text-right">Attendance</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {subjects.map((s) => {
                const g = grade(s.total)
                return (
                  <TableRow key={s.code}>
                    <TableCell className="font-mono text-xs text-muted-foreground">{s.code}</TableCell>
                    <TableCell className="font-medium">{s.name}</TableCell>
                    <TableCell className="text-right tabular-nums">{s.internal}</TableCell>
                    <TableCell className="text-right tabular-nums">{s.external}</TableCell>
                    <TableCell className="text-right font-semibold tabular-nums">{s.total}</TableCell>
                    <TableCell className="text-center">
                      <Badge variant={g === 'F' ? 'destructive' : g === 'O' || g === 'A+' ? 'default' : 'secondary'}>
                        {g}
                      </Badge>
                    </TableCell>
                    <TableCell
                      className={cn('text-right tabular-nums', s.attendance < 75 && 'font-medium text-destructive')}
                    >
                      {s.attendance}%
                    </TableCell>
                  </TableRow>
                )
              })}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  )
}
