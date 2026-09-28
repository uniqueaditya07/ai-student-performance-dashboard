import Link from 'next/link'
import { UserPlus } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { PageHeader } from '@/components/page-header'
import { SummaryCards } from '@/components/dashboard/summary-cards'
import { SgpaTrendChart } from '@/components/charts/sgpa-trend-chart'
import { SubjectPerformanceChart } from '@/components/charts/subject-performance-chart'
import { AtRiskPanel } from '@/components/dashboard/at-risk-panel'
import { StudentTable } from '@/components/students/student-table'
import { getSgpaTrend, getSubjectPerformance, getSummary, students } from '@/lib/students'

export default function DashboardPage() {
  return (
    <>
      <PageHeader
        title="Good morning, Dr. Raman"
        description="Here's how your 2022–26 batch is performing this semester."
        actions={
          <Button nativeButton={false} render={<Link href="/students/new" />}>
            <UserPlus data-icon="inline-start" />
            Add Student
          </Button>
        }
      />
      <SummaryCards summary={getSummary()} />
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        <SgpaTrendChart data={getSgpaTrend()} />
        <SubjectPerformanceChart data={getSubjectPerformance()} />
      </div>
      <div className="grid grid-cols-1 gap-4 xl:grid-cols-3">
        <div className="xl:col-span-2">
          <StudentTable students={students} pageSize={6} />
        </div>
        <AtRiskPanel students={students} />
      </div>
    </>
  )
}
