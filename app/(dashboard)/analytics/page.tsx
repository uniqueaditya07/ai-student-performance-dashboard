import type { Metadata } from 'next'
import { PageHeader } from '@/components/page-header'
import { SgpaTrendChart } from '@/components/charts/sgpa-trend-chart'
import { SubjectPerformanceChart } from '@/components/charts/subject-performance-chart'
import {
  AttendanceCorrelationChart,
  DepartmentChart,
  StatusDistributionChart,
} from '@/components/analytics/analytics-charts'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import {
  DEPARTMENT_NAMES,
  getDepartmentStats,
  getSgpaTrend,
  getStatusDistribution,
  getSubjectPerformance,
  students,
} from '@/lib/students'

export const metadata: Metadata = { title: 'Analytics' }

export default function AnalyticsPage() {
  const deptStats = getDepartmentStats()
  const scatter = students.map((s) => ({ name: s.name, attendance: s.attendance, cgpa: s.cgpa }))

  return (
    <>
      <PageHeader
        title="Analytics"
        description="Batch-level trends and correlations across departments and subjects."
      />
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        <StatusDistributionChart data={getStatusDistribution()} />
        <div className="lg:col-span-2">
          <AttendanceCorrelationChart data={scatter} />
        </div>
      </div>
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        <SgpaTrendChart data={getSgpaTrend()} />
        <SubjectPerformanceChart data={getSubjectPerformance()} />
      </div>
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-5">
        <div className="lg:col-span-2">
          <DepartmentChart data={deptStats} />
        </div>
        <Card className="lg:col-span-3">
          <CardHeader>
            <CardTitle>Department Summary</CardTitle>
            <CardDescription>Headcount, average CGPA and attendance</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="overflow-hidden rounded-lg border">
              <Table>
                <TableHeader className="bg-muted/60">
                  <TableRow>
                    <TableHead>Department</TableHead>
                    <TableHead className="text-right">Students</TableHead>
                    <TableHead className="text-right">Avg. CGPA</TableHead>
                    <TableHead className="text-right">Attendance</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {deptStats.map((d) => (
                    <TableRow key={d.department}>
                      <TableCell>
                        <div className="flex flex-col">
                          <span className="font-medium">{d.department}</span>
                          <span className="text-xs text-muted-foreground">
                            {DEPARTMENT_NAMES[d.department]}
                          </span>
                        </div>
                      </TableCell>
                      <TableCell className="text-right tabular-nums">{d.students}</TableCell>
                      <TableCell className="text-right font-medium tabular-nums">{d.cgpa.toFixed(2)}</TableCell>
                      <TableCell className="text-right tabular-nums">{d.attendance}%</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  )
}
