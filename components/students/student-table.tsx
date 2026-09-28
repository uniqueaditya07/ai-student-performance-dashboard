'use client'

import { useMemo, useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { ChevronLeft, ChevronRight, Download, MoreHorizontal, Search, SearchX } from 'lucide-react'
import { Card, CardAction, CardDescription, CardHeader, CardTitle, CardContent, CardFooter } from '@/components/ui/card'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { InputGroup, InputGroupAddon, InputGroupInput } from '@/components/ui/input-group'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { StatusBadge } from '@/components/status-badge'
import { cn } from '@/lib/utils'
import {
  DEPARTMENTS,
  PERFORMANCE_STATUSES,
  getInitials,
  type Student,
} from '@/lib/students'
import { toast } from 'sonner'

const departmentItems = [
  { label: 'All departments', value: 'all' },
  ...DEPARTMENTS.map((d) => ({ label: d, value: d })),
]

const statusItems = [
  { label: 'All statuses', value: 'all' },
  ...PERFORMANCE_STATUSES.map((s) => ({ label: s, value: s })),
]

const sortItems = [
  { label: 'Roll number', value: 'roll' },
  { label: 'CGPA (high → low)', value: 'cgpa-desc' },
  { label: 'CGPA (low → high)', value: 'cgpa-asc' },
  { label: 'Attendance (low → high)', value: 'attendance-asc' },
]

export function StudentTable({
  students,
  pageSize = 8,
  title = 'Student Records',
  description = 'Search, filter and review individual student performance.',
}: {
  students: Student[]
  pageSize?: number
  title?: string
  description?: string
}) {
  const router = useRouter()
  const [query, setQuery] = useState('')
  const [department, setDepartment] = useState('all')
  const [status, setStatus] = useState('all')
  const [sort, setSort] = useState('roll')
  const [page, setPage] = useState(1)

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    const result = students.filter((s) => {
      const matchesQuery =
        !q || s.name.toLowerCase().includes(q) || s.rollNo.toLowerCase().includes(q)
      const matchesDept = department === 'all' || s.department === department
      const matchesStatus = status === 'all' || s.status === status
      return matchesQuery && matchesDept && matchesStatus
    })
    return [...result].sort((a, b) => {
      switch (sort) {
        case 'cgpa-desc':
          return b.cgpa - a.cgpa
        case 'cgpa-asc':
          return a.cgpa - b.cgpa
        case 'attendance-asc':
          return a.attendance - b.attendance
        default:
          return a.rollNo.localeCompare(b.rollNo)
      }
    })
  }, [students, query, department, status, sort])

  const totalPages = Math.max(1, Math.ceil(filtered.length / pageSize))
  const currentPage = Math.min(page, totalPages)
  const pageRows = filtered.slice((currentPage - 1) * pageSize, currentPage * pageSize)
  const hasFilters = query !== '' || department !== 'all' || status !== 'all'

  const resetFilters = () => {
    setQuery('')
    setDepartment('all')
    setStatus('all')
    setPage(1)
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
        <CardAction>
          <Button
            variant="outline"
            size="sm"
            onClick={() => toast.success(`Exported ${filtered.length} student records`)}
          >
            <Download data-icon="inline-start" />
            <span className="hidden sm:inline">Export</span>
          </Button>
        </CardAction>
      </CardHeader>

      <CardContent className="flex flex-col gap-4">
        <div className="flex flex-col gap-2 2xl:flex-row 2xl:items-center">
          <InputGroup className="2xl:max-w-xs">
            <InputGroupAddon>
              <Search />
            </InputGroupAddon>
            <InputGroupInput
              placeholder="Search by name or roll no."
              aria-label="Search students"
              value={query}
              onChange={(e) => {
                setQuery(e.target.value)
                setPage(1)
              }}
            />
          </InputGroup>
          <div className="grid grid-cols-2 gap-2 sm:flex sm:flex-wrap 2xl:ml-auto">
            <Select
              items={departmentItems}
              value={department}
              onValueChange={(v) => {
                setDepartment(v ?? 'all')
                setPage(1)
              }}
            >
              <SelectTrigger className="w-full sm:w-40" aria-label="Filter by department">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  {departmentItems.map((item) => (
                    <SelectItem key={item.value} value={item.value}>
                      {item.label}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
            <Select
              items={statusItems}
              value={status}
              onValueChange={(v) => {
                setStatus(v ?? 'all')
                setPage(1)
              }}
            >
              <SelectTrigger className="w-full sm:w-44" aria-label="Filter by status">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  {statusItems.map((item) => (
                    <SelectItem key={item.value} value={item.value}>
                      {item.label}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
            <Select items={sortItems} value={sort} onValueChange={(v) => setSort(v ?? 'roll')}>
              <SelectTrigger className="col-span-2 w-full sm:w-52" aria-label="Sort students">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  {sortItems.map((item) => (
                    <SelectItem key={item.value} value={item.value}>
                      {item.label}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="overflow-hidden rounded-lg border">
          <Table>
            <TableHeader className="bg-muted/60">
              <TableRow>
                <TableHead className="w-28">Roll Number</TableHead>
                <TableHead>Name</TableHead>
                <TableHead className="hidden md:table-cell">Dept.</TableHead>
                <TableHead className="w-44">Attendance</TableHead>
                <TableHead className="text-right">CGPA</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="w-10">
                  <span className="sr-only">Actions</span>
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {pageRows.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={7} className="h-40">
                    <div className="flex flex-col items-center justify-center gap-2 text-center">
                      <SearchX className="size-6 text-muted-foreground" aria-hidden="true" />
                      <p className="text-sm font-medium">No students match your filters</p>
                      <Button variant="link" size="sm" onClick={resetFilters}>
                        Clear filters
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ) : (
                pageRows.map((s) => (
                  <TableRow key={s.id}>
                    <TableCell className="font-mono text-xs text-muted-foreground">
                      {s.rollNo}
                    </TableCell>
                    <TableCell>
                      <Link
                        href={`/students/${s.id}`}
                        className="flex items-center gap-3 rounded-md hover:underline focus-visible:outline-2"
                      >
                        <Avatar className="size-8">
                          <AvatarFallback className="bg-secondary text-xs font-medium text-secondary-foreground">
                            {getInitials(s.name)}
                          </AvatarFallback>
                        </Avatar>
                        <span className="flex flex-col">
                          <span className="font-medium">{s.name}</span>
                          <span className="text-xs text-muted-foreground">
                            Sem {s.semester} · Sec {s.section}
                          </span>
                        </span>
                      </Link>
                    </TableCell>
                    <TableCell className="hidden text-muted-foreground md:table-cell">
                      {s.department}
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <div className="h-1.5 w-full max-w-20 overflow-hidden rounded-full bg-muted">
                          <div
                            className={cn(
                              'h-full rounded-full',
                              s.attendance < 75 ? 'bg-destructive' : s.attendance < 85 ? 'bg-warning' : 'bg-success',
                            )}
                            style={{ width: `${s.attendance}%` }}
                          />
                        </div>
                        <span
                          className={cn(
                            'text-sm tabular-nums',
                            s.attendance < 75 && 'font-medium text-destructive',
                          )}
                        >
                          {s.attendance}%
                        </span>
                      </div>
                    </TableCell>
                    <TableCell className="text-right font-medium tabular-nums">
                      {s.cgpa.toFixed(2)}
                    </TableCell>
                    <TableCell>
                      <StatusBadge status={s.status} />
                    </TableCell>
                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger
                          render={
                            <Button variant="ghost" size="icon-sm" aria-label={`Actions for ${s.name}`} />
                          }
                        >
                          <MoreHorizontal />
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuGroup>
                            <DropdownMenuItem onClick={() => router.push(`/students/${s.id}`)}>
                              View performance
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              onClick={() => toast.success(`Parent notification queued for ${s.name}`)}
                            >
                              Notify guardian
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              onClick={() => toast.info(`Mentoring session scheduled with ${s.name}`)}
                            >
                              Schedule mentoring
                            </DropdownMenuItem>
                          </DropdownMenuGroup>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      </CardContent>

      <CardFooter className="flex flex-col gap-3 text-sm text-muted-foreground sm:flex-row sm:justify-between">
        <p>
          Showing{' '}
          <span className="font-medium text-foreground">
            {filtered.length === 0 ? 0 : (currentPage - 1) * pageSize + 1}–
            {Math.min(currentPage * pageSize, filtered.length)}
          </span>{' '}
          of <span className="font-medium text-foreground">{filtered.length}</span> students
          {hasFilters && (
            <>
              {' · '}
              <button type="button" onClick={resetFilters} className="underline underline-offset-2 hover:text-foreground">
                Reset
              </button>
            </>
          )}
        </p>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            disabled={currentPage === 1}
            onClick={() => setPage(currentPage - 1)}
          >
            <ChevronLeft data-icon="inline-start" />
            Prev
          </Button>
          <span className="tabular-nums">
            {currentPage} / {totalPages}
          </span>
          <Button
            variant="outline"
            size="sm"
            disabled={currentPage === totalPages}
            onClick={() => setPage(currentPage + 1)}
          >
            Next
            <ChevronRight data-icon="inline-end" />
          </Button>
        </div>
      </CardFooter>
    </Card>
  )
}
