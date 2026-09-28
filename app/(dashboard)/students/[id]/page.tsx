import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ArrowLeft, Award, CalendarCheck, GraduationCap, TrendingUp } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { ProfileHeader } from '@/components/student-profile/profile-header'
import { StudentSgpaChart, StudentSubjectChart } from '@/components/student-profile/student-charts'
import { SubjectTable } from '@/components/student-profile/subject-table'
import { AiInsightsCard } from '@/components/student-profile/ai-insights-card'
import {
  SEMESTER_LABELS,
  getSgpaTrend,
  getStudentById,
  getSubjectPerformance,
  students,
} from '@/lib/students'

export function generateStaticParams() {
  return students.map((s) => ({ id: s.id }))
}

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const { id } = await params
  const student = getStudentById(id)
  return { title: student ? `${student.name} (${student.rollNo})` : 'Student not found' }
}

export default async function StudentPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const student = getStudentById(id)
  if (!student) notFound()

  const classTrend = getSgpaTrend()
  const sgpaData = SEMESTER_LABELS.map((semester, i) => ({
    semester,
    student: student.sgpaHistory[i],
    classAvg: classTrend[i].average,
  }))

  const classSubjects = getSubjectPerformance()
  const subjectData = student.subjects.map((s, i) => ({
    subject: s.short,
    name: s.name,
    student: s.total,
    classAvg: classSubjects[i].average,
  }))

  const rank = [...students].sort((a, b) => b.cgpa - a.cgpa).findIndex((s) => s.id === student.id) + 1
  const latest = student.sgpaHistory[student.sgpaHistory.length - 1]
  const prev = student.sgpaHistory[student.sgpaHistory.length - 2]

  const stats = [
    { label: 'CGPA', value: student.cgpa.toFixed(2), sub: 'Cumulative, out of 10', icon: GraduationCap },
    {
      label: 'Attendance',
      value: `${student.attendance}%`,
      sub: student.attendance < 75 ? 'Below 75% requirement' : 'Meets 75% requirement',
      icon: CalendarCheck,
    },
    {
      label: 'Latest SGPA',
      value: latest.toFixed(2),
      sub: `${latest - prev >= 0 ? '+' : ''}${(latest - prev).toFixed(2)} from previous sem`,
      icon: TrendingUp,
    },
    { label: 'Class Rank', value: `#${rank}`, sub: `of ${students.length} students`, icon: Award },
  ]

  return (
    <>
      <Button variant="ghost" size="sm" className="self-start" nativeButton={false} render={<Link href="/students" />}>
        <ArrowLeft data-icon="inline-start" />
        Back to students
      </Button>

      <ProfileHeader student={student} />

      <div className="grid grid-cols-2 gap-4 xl:grid-cols-4">
        {stats.map((s) => (
          <Card key={s.label}>
            <CardHeader>
              <CardDescription className="flex items-center gap-1.5">
                <s.icon className="size-4" aria-hidden="true" />
                {s.label}
              </CardDescription>
              <CardTitle className="text-2xl font-semibold tabular-nums md:text-3xl">{s.value}</CardTitle>
              <p className="text-xs text-muted-foreground">{s.sub}</p>
            </CardHeader>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 gap-4 xl:grid-cols-3">
        <div className="flex flex-col gap-4 xl:col-span-2">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <StudentSgpaChart data={sgpaData} />
            <StudentSubjectChart data={subjectData} />
          </div>
          <SubjectTable subjects={student.subjects} />
        </div>
        <AiInsightsCard student={student} />
      </div>
    </>
  )
}
