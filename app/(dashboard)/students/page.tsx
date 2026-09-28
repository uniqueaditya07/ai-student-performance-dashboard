import type { Metadata } from 'next'
import Link from 'next/link'
import { UserPlus } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { PageHeader } from '@/components/page-header'
import { StudentTable } from '@/components/students/student-table'
import { StatusBadge } from '@/components/status-badge'
import { getStatusDistribution, students } from '@/lib/students'

export const metadata: Metadata = { title: 'Students' }

export default function StudentsPage() {
  const distribution = getStatusDistribution()

  return (
    <>
      <PageHeader
        title="Students"
        description="All enrolled students in Semester 5, batch 2022–26."
        actions={
          <Button nativeButton={false} render={<Link href="/students/new" />}>
            <UserPlus data-icon="inline-start" />
            Add Student
          </Button>
        }
      />
      <div className="flex flex-wrap gap-2" aria-label="Status distribution">
        {distribution.map((d) => (
          <div key={d.status} className="flex items-center gap-2 rounded-lg border bg-card px-3 py-2">
            <StatusBadge status={d.status} />
            <span className="text-sm font-semibold tabular-nums">{d.count}</span>
          </div>
        ))}
      </div>
      <StudentTable
        students={students}
        pageSize={10}
        title="All Students"
        description="Click a student to view their detailed performance report."
      />
    </>
  )
}
