import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { PageHeader } from '@/components/page-header'
import { AddStudentForm } from '@/components/students/add-student-form'

export const metadata: Metadata = { title: 'Add Student' }

export default function AddStudentPage() {
  return (
    <>
      <Button variant="ghost" size="sm" className="self-start" nativeButton={false} render={<Link href="/students" />}>
        <ArrowLeft data-icon="inline-start" />
        Back to students
      </Button>
      <PageHeader
        title="Add New Student"
        description="Register a student to start tracking attendance, grades and AI insights."
      />
      <AddStudentForm />
    </>
  )
}
