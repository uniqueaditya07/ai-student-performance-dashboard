'use client'

import { Mail, Phone, UserRound, Printer, Send } from 'lucide-react'
import { toast } from 'sonner'
import { Card, CardContent } from '@/components/ui/card'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { StatusBadge } from '@/components/status-badge'
import { DEPARTMENT_NAMES, getInitials, type Student } from '@/lib/students'

export function ProfileHeader({ student }: { student: Student }) {
  return (
    <Card>
      <CardContent className="flex flex-col gap-6 md:flex-row md:items-center">
        <div className="flex items-center gap-4">
          <Avatar className="size-16 md:size-20">
            <AvatarFallback className="bg-primary text-xl font-semibold text-primary-foreground">
              {getInitials(student.name)}
            </AvatarFallback>
          </Avatar>
          <div className="flex min-w-0 flex-col gap-1.5">
            <div className="flex flex-wrap items-center gap-2">
              <h1 className="text-xl font-semibold tracking-tight md:text-2xl">{student.name}</h1>
              <StatusBadge status={student.status} />
            </div>
            <div className="flex flex-wrap items-center gap-2 text-sm text-muted-foreground">
              <span className="font-mono">{student.rollNo}</span>
              <span aria-hidden="true">·</span>
              <span>{DEPARTMENT_NAMES[student.department]}</span>
            </div>
            <div className="flex flex-wrap gap-1.5">
              <Badge variant="secondary">Semester {student.semester}</Badge>
              <Badge variant="secondary">Section {student.section}</Badge>
              <Badge variant="secondary">Batch {student.batch}</Badge>
            </div>
          </div>
        </div>

        <dl className="grid flex-1 grid-cols-1 gap-2 text-sm sm:grid-cols-3 md:grid-cols-1 lg:grid-cols-3 md:border-l md:pl-6">
          <div className="flex min-w-0 items-center gap-2">
            <Mail className="size-4 shrink-0 text-muted-foreground" aria-hidden="true" />
            <dt className="sr-only">Email</dt>
            <dd className="truncate">{student.email}</dd>
          </div>
          <div className="flex items-center gap-2">
            <Phone className="size-4 shrink-0 text-muted-foreground" aria-hidden="true" />
            <dt className="sr-only">Phone</dt>
            <dd className="tabular-nums">{student.phone}</dd>
          </div>
          <div className="flex min-w-0 items-center gap-2">
            <UserRound className="size-4 shrink-0 text-muted-foreground" aria-hidden="true" />
            <dt className="sr-only">Guardian</dt>
            <dd className="truncate">Guardian: {student.guardian}</dd>
          </div>
        </dl>

        <div className="flex gap-2 md:flex-col lg:flex-row">
          <Button variant="outline" onClick={() => window.print()}>
            <Printer data-icon="inline-start" />
            Report
          </Button>
          <Button onClick={() => toast.success(`Progress report sent to ${student.guardian}`)}>
            <Send data-icon="inline-start" />
            Notify
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
