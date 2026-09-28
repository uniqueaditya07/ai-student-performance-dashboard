'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Sparkles, UserPlus } from 'lucide-react'
import { toast } from 'sonner'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
} from '@/components/ui/field'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'
import { Switch } from '@/components/ui/switch'
import { Separator } from '@/components/ui/separator'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { StatusBadge } from '@/components/status-badge'
import { DEPARTMENTS, DEPARTMENT_NAMES, getInitials, getStatus } from '@/lib/students'

const departmentItems = DEPARTMENTS.map((d) => ({ label: `${d} — ${DEPARTMENT_NAMES[d]}`, value: d }))
const semesterItems = Array.from({ length: 8 }, (_, i) => ({ label: `Semester ${i + 1}`, value: String(i + 1) }))
const sectionItems = [
  { label: 'Section A', value: 'A' },
  { label: 'Section B', value: 'B' },
]
const genderItems = [
  { label: 'Female', value: 'female' },
  { label: 'Male', value: 'male' },
  { label: 'Other', value: 'other' },
  { label: 'Prefer not to say', value: 'na' },
]

type FormState = {
  name: string
  rollNo: string
  email: string
  phone: string
  dob: string
  gender: string
  department: string
  semester: string
  section: string
  batch: string
  cgpa: string
  attendance: string
  guardian: string
  guardianPhone: string
  notes: string
  hostel: boolean
}

const initial: FormState = {
  name: '',
  rollNo: '',
  email: '',
  phone: '',
  dob: '',
  gender: '',
  department: '',
  semester: '5',
  section: 'A',
  batch: '2022 – 2026',
  cgpa: '',
  attendance: '',
  guardian: '',
  guardianPhone: '',
  notes: '',
  hostel: false,
}

type Errors = Partial<Record<keyof FormState, string>>

function validate(form: FormState): Errors {
  const errors: Errors = {}
  if (!form.name.trim()) errors.name = 'Full name is required.'
  if (!/^\d{2}[A-Z]{2}\d{3}$/i.test(form.rollNo.trim()))
    errors.rollNo = 'Use the format 22CS123.'
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim()))
    errors.email = 'Enter a valid email address.'
  if (!form.department) errors.department = 'Select a department.'
  const cgpa = Number(form.cgpa)
  if (form.cgpa && (Number.isNaN(cgpa) || cgpa < 0 || cgpa > 10))
    errors.cgpa = 'CGPA must be between 0 and 10.'
  const att = Number(form.attendance)
  if (form.attendance && (Number.isNaN(att) || att < 0 || att > 100))
    errors.attendance = 'Attendance must be between 0 and 100.'
  return errors
}

export function AddStudentForm() {
  const router = useRouter()
  const [form, setForm] = useState<FormState>(initial)
  const [errors, setErrors] = useState<Errors>({})
  const [submitting, setSubmitting] = useState(false)

  const update = <K extends keyof FormState>(key: K, value: FormState[K]) => {
    setForm((f) => ({ ...f, [key]: value }))
    if (errors[key]) setErrors((e) => ({ ...e, [key]: undefined }))
  }

  const cgpa = Number(form.cgpa)
  const attendance = Number(form.attendance)
  const hasMetrics = form.cgpa !== '' && form.attendance !== '' && !Number.isNaN(cgpa) && !Number.isNaN(attendance)
  const predicted = hasMetrics ? getStatus(cgpa, attendance) : null

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const found = validate(form)
    setErrors(found)
    if (Object.keys(found).length > 0) {
      toast.error('Please fix the highlighted fields.')
      return
    }
    setSubmitting(true)
    setTimeout(() => {
      toast.success(`${form.name} (${form.rollNo.toUpperCase()}) added successfully`)
      router.push('/students')
    }, 600)
  }

  const renderSelect = (
    key: 'department' | 'semester' | 'section' | 'gender',
    items: { label: string; value: string }[],
    placeholder: string,
  ) => (
    <Select items={items} value={form[key] || null} onValueChange={(v) => update(key, v ?? '')}>
      <SelectTrigger id={key} className="w-full" aria-invalid={!!errors[key]}>
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          {items.map((item) => (
            <SelectItem key={item.value} value={item.value}>
              {item.label}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  )

  return (
    <form onSubmit={onSubmit} noValidate className="grid grid-cols-1 gap-6 lg:grid-cols-3">
      <div className="flex flex-col gap-6 lg:col-span-2">
        <Card>
          <CardHeader>
            <CardTitle>Personal Details</CardTitle>
            <CardDescription>Basic identity and contact information.</CardDescription>
          </CardHeader>
          <CardContent>
            <FieldGroup className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <Field data-invalid={!!errors.name} className="sm:col-span-2">
                <FieldLabel htmlFor="name">Full name</FieldLabel>
                <Input
                  id="name"
                  placeholder="e.g. Ananya Iyer"
                  value={form.name}
                  aria-invalid={!!errors.name}
                  onChange={(e) => update('name', e.target.value)}
                />
                {errors.name && <FieldError>{errors.name}</FieldError>}
              </Field>
              <Field data-invalid={!!errors.rollNo}>
                <FieldLabel htmlFor="rollNo">Roll number</FieldLabel>
                <Input
                  id="rollNo"
                  placeholder="22CS125"
                  className="font-mono uppercase"
                  value={form.rollNo}
                  aria-invalid={!!errors.rollNo}
                  onChange={(e) => update('rollNo', e.target.value)}
                />
                {errors.rollNo ? (
                  <FieldError>{errors.rollNo}</FieldError>
                ) : (
                  <FieldDescription>Year + dept. code + number</FieldDescription>
                )}
              </Field>
              <Field data-invalid={!!errors.email}>
                <FieldLabel htmlFor="email">College email</FieldLabel>
                <Input
                  id="email"
                  type="email"
                  placeholder="name@college.edu.in"
                  value={form.email}
                  aria-invalid={!!errors.email}
                  onChange={(e) => update('email', e.target.value)}
                />
                {errors.email && <FieldError>{errors.email}</FieldError>}
              </Field>
              <Field>
                <FieldLabel htmlFor="phone">Phone</FieldLabel>
                <Input
                  id="phone"
                  type="tel"
                  placeholder="+91 98xxxxxxxx"
                  value={form.phone}
                  onChange={(e) => update('phone', e.target.value)}
                />
              </Field>
              <Field>
                <FieldLabel htmlFor="dob">Date of birth</FieldLabel>
                <Input id="dob" type="date" value={form.dob} onChange={(e) => update('dob', e.target.value)} />
              </Field>
              <Field>
                <FieldLabel htmlFor="gender">Gender</FieldLabel>
                {renderSelect('gender', genderItems, 'Select gender')}
              </Field>
              <Field orientation="horizontal" className="self-end">
                <Switch id="hostel" checked={form.hostel} onCheckedChange={(v) => update('hostel', v)} />
                <FieldLabel htmlFor="hostel">Hostel resident</FieldLabel>
              </Field>
            </FieldGroup>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Academic Information</CardTitle>
            <CardDescription>Programme enrolment and current academic standing.</CardDescription>
          </CardHeader>
          <CardContent>
            <FieldGroup className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <Field data-invalid={!!errors.department} className="sm:col-span-2">
                <FieldLabel htmlFor="department">Department</FieldLabel>
                {renderSelect('department', departmentItems, 'Select department')}
                {errors.department && <FieldError>{errors.department}</FieldError>}
              </Field>
              <Field>
                <FieldLabel htmlFor="semester">Current semester</FieldLabel>
                {renderSelect('semester', semesterItems, 'Select semester')}
              </Field>
              <Field>
                <FieldLabel htmlFor="section">Section</FieldLabel>
                {renderSelect('section', sectionItems, 'Select section')}
              </Field>
              <Field>
                <FieldLabel htmlFor="batch">Batch</FieldLabel>
                <Input id="batch" value={form.batch} onChange={(e) => update('batch', e.target.value)} />
              </Field>
              <Field data-invalid={!!errors.cgpa}>
                <FieldLabel htmlFor="cgpa">Current CGPA</FieldLabel>
                <Input
                  id="cgpa"
                  type="number"
                  inputMode="decimal"
                  step="0.01"
                  min={0}
                  max={10}
                  placeholder="8.25"
                  value={form.cgpa}
                  aria-invalid={!!errors.cgpa}
                  onChange={(e) => update('cgpa', e.target.value)}
                />
                {errors.cgpa && <FieldError>{errors.cgpa}</FieldError>}
              </Field>
              <Field data-invalid={!!errors.attendance}>
                <FieldLabel htmlFor="attendance">Attendance (%)</FieldLabel>
                <Input
                  id="attendance"
                  type="number"
                  inputMode="numeric"
                  min={0}
                  max={100}
                  placeholder="88"
                  value={form.attendance}
                  aria-invalid={!!errors.attendance}
                  onChange={(e) => update('attendance', e.target.value)}
                />
                {errors.attendance && <FieldError>{errors.attendance}</FieldError>}
              </Field>
            </FieldGroup>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Guardian &amp; Notes</CardTitle>
            <CardDescription>Used for progress reports and attendance alerts.</CardDescription>
          </CardHeader>
          <CardContent>
            <FieldGroup className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <Field>
                <FieldLabel htmlFor="guardian">Guardian name</FieldLabel>
                <Input id="guardian" value={form.guardian} onChange={(e) => update('guardian', e.target.value)} />
              </Field>
              <Field>
                <FieldLabel htmlFor="guardianPhone">Guardian phone</FieldLabel>
                <Input
                  id="guardianPhone"
                  type="tel"
                  value={form.guardianPhone}
                  onChange={(e) => update('guardianPhone', e.target.value)}
                />
              </Field>
              <Field className="sm:col-span-2">
                <FieldLabel htmlFor="notes">Faculty notes</FieldLabel>
                <Textarea
                  id="notes"
                  rows={4}
                  placeholder="Any remarks on learning needs, scholarships, extracurriculars…"
                  value={form.notes}
                  onChange={(e) => update('notes', e.target.value)}
                />
              </Field>
            </FieldGroup>
          </CardContent>
        </Card>
      </div>

      <div className="flex flex-col gap-6 lg:sticky lg:top-20 lg:self-start">
        <Card>
          <CardHeader>
            <CardTitle>Preview</CardTitle>
            <CardDescription>How this student will appear in records.</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col gap-4">
            <div className="flex items-center gap-3">
              <Avatar className="size-12">
                <AvatarFallback className="bg-primary/10 font-semibold text-primary">
                  {form.name.trim() ? getInitials(form.name) : '?'}
                </AvatarFallback>
              </Avatar>
              <div className="flex min-w-0 flex-col">
                <span className="truncate font-medium">{form.name || 'Student name'}</span>
                <span className="truncate font-mono text-xs text-muted-foreground">
                  {form.rollNo.toUpperCase() || '22XX000'}
                  {form.department && ` · ${form.department}`}
                </span>
              </div>
            </div>
            <Separator />
            <dl className="grid grid-cols-2 gap-3 text-sm">
              <div>
                <dt className="text-muted-foreground">CGPA</dt>
                <dd className="font-semibold tabular-nums">{form.cgpa || '—'}</dd>
              </div>
              <div>
                <dt className="text-muted-foreground">Attendance</dt>
                <dd className="font-semibold tabular-nums">{form.attendance ? `${form.attendance}%` : '—'}</dd>
              </div>
            </dl>
            <div className="flex flex-col gap-2 rounded-lg bg-muted p-3">
              <span className="flex items-center gap-1.5 text-xs font-medium text-muted-foreground">
                <Sparkles className="size-3.5 text-primary" aria-hidden="true" />
                AI-predicted status
              </span>
              {predicted ? (
                <StatusBadge status={predicted} className="self-start" />
              ) : (
                <span className="text-sm text-muted-foreground">Enter CGPA and attendance</span>
              )}
            </div>
          </CardContent>
          <CardFooter className="flex flex-col gap-2">
            <Button type="submit" className="w-full" disabled={submitting}>
              <UserPlus data-icon="inline-start" />
              {submitting ? 'Saving…' : 'Add Student'}
            </Button>
            <Button variant="outline" className="w-full" nativeButton={false} render={<Link href="/students" />}>
              Cancel
            </Button>
          </CardFooter>
        </Card>
      </div>
    </form>
  )
}
