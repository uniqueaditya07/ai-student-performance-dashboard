export type PerformanceStatus =
  | 'Excellent'
  | 'Good'
  | 'Average'
  | 'Needs Attention'

export const PERFORMANCE_STATUSES: PerformanceStatus[] = [
  'Excellent',
  'Good',
  'Average',
  'Needs Attention',
]

export const DEPARTMENTS = ['CSE', 'ECE', 'IT', 'ME'] as const
export type Department = (typeof DEPARTMENTS)[number]

export const DEPARTMENT_NAMES: Record<Department, string> = {
  CSE: 'Computer Science & Engg.',
  ECE: 'Electronics & Communication',
  IT: 'Information Technology',
  ME: 'Mechanical Engineering',
}

export const SUBJECTS = [
  { code: 'CS501', name: 'Data Structures', short: 'DSA' },
  { code: 'CS502', name: 'Database Systems', short: 'DBMS' },
  { code: 'CS503', name: 'Operating Systems', short: 'OS' },
  { code: 'CS504', name: 'Computer Networks', short: 'CN' },
  { code: 'MA501', name: 'Discrete Mathematics', short: 'DM' },
  { code: 'CS505', name: 'Machine Learning', short: 'ML' },
] as const

export type SubjectScore = {
  code: string
  name: string
  short: string
  internal: number
  external: number
  total: number
  attendance: number
}

export type Student = {
  id: string
  rollNo: string
  name: string
  email: string
  phone: string
  department: Department
  semester: number
  section: 'A' | 'B'
  batch: string
  attendance: number
  cgpa: number
  sgpaHistory: number[]
  subjects: SubjectScore[]
  status: PerformanceStatus
  riskScore: number
  guardian: string
}

export function getStatus(cgpa: number, attendance: number): PerformanceStatus {
  if (attendance < 75 || cgpa < 6) return 'Needs Attention'
  if (cgpa >= 8.5) return 'Excellent'
  if (cgpa >= 7.5) return 'Good'
  return 'Average'
}

type Seed = {
  name: string
  department: Department
  section: 'A' | 'B'
  sgpa: number[]
  attendance: number
  guardian: string
}

const seeds: Seed[] = [
  { name: 'Aarav Sharma', department: 'CSE', section: 'A', sgpa: [8.9, 9.1, 9.0, 9.3], attendance: 94, guardian: 'Rajesh Sharma' },
  { name: 'Ananya Iyer', department: 'CSE', section: 'A', sgpa: [9.2, 9.4, 9.3, 9.6], attendance: 97, guardian: 'Suresh Iyer' },
  { name: 'Rohan Verma', department: 'CSE', section: 'A', sgpa: [6.8, 6.2, 5.9, 5.4], attendance: 68, guardian: 'Anil Verma' },
  { name: 'Priya Nair', department: 'CSE', section: 'B', sgpa: [8.1, 8.0, 8.3, 8.2], attendance: 89, guardian: 'Mohan Nair' },
  { name: 'Kabir Singh', department: 'CSE', section: 'B', sgpa: [7.2, 7.4, 7.0, 7.3], attendance: 82, guardian: 'Harpreet Singh' },
  { name: 'Diya Patel', department: 'IT', section: 'A', sgpa: [8.6, 8.8, 8.7, 9.0], attendance: 92, guardian: 'Nilesh Patel' },
  { name: 'Arjun Reddy', department: 'ECE', section: 'A', sgpa: [7.8, 7.6, 7.9, 8.0], attendance: 85, guardian: 'Venkat Reddy' },
  { name: 'Meera Krishnan', department: 'ECE', section: 'A', sgpa: [6.4, 6.0, 5.8, 5.6], attendance: 78, guardian: 'Ravi Krishnan' },
  { name: 'Ishaan Gupta', department: 'IT', section: 'B', sgpa: [7.0, 6.9, 7.1, 6.8], attendance: 80, guardian: 'Sanjay Gupta' },
  { name: 'Sneha Kulkarni', department: 'CSE', section: 'A', sgpa: [8.4, 8.2, 8.5, 8.3], attendance: 91, guardian: 'Prakash Kulkarni' },
  { name: 'Vikram Joshi', department: 'ME', section: 'A', sgpa: [6.9, 7.1, 6.7, 6.5], attendance: 72, guardian: 'Deepak Joshi' },
  { name: 'Aditi Menon', department: 'IT', section: 'A', sgpa: [9.0, 8.9, 9.2, 9.1], attendance: 95, guardian: 'Gopal Menon' },
  { name: 'Rahul Chatterjee', department: 'ECE', section: 'B', sgpa: [7.5, 7.7, 7.6, 7.9], attendance: 87, guardian: 'Subir Chatterjee' },
  { name: 'Kavya Rao', department: 'CSE', section: 'B', sgpa: [7.1, 7.3, 7.2, 7.0], attendance: 84, guardian: 'Srinivas Rao' },
  { name: 'Nikhil Desai', department: 'ME', section: 'B', sgpa: [5.9, 5.6, 5.8, 5.5], attendance: 70, guardian: 'Mahesh Desai' },
  { name: 'Tanvi Bhat', department: 'IT', section: 'B', sgpa: [8.0, 8.3, 8.1, 8.4], attendance: 90, guardian: 'Ramesh Bhat' },
  { name: 'Siddharth Mehta', department: 'CSE', section: 'A', sgpa: [7.6, 7.8, 8.0, 7.9], attendance: 88, guardian: 'Alok Mehta' },
  { name: 'Pooja Saxena', department: 'ECE', section: 'A', sgpa: [8.7, 8.9, 8.6, 8.8], attendance: 93, guardian: 'Vivek Saxena' },
  { name: 'Aryan Kapoor', department: 'ME', section: 'A', sgpa: [7.3, 7.0, 7.2, 7.1], attendance: 76, guardian: 'Sunil Kapoor' },
  { name: 'Riya Das', department: 'CSE', section: 'B', sgpa: [6.5, 6.8, 6.6, 6.9], attendance: 81, guardian: 'Tapan Das' },
  { name: 'Harsh Agarwal', department: 'IT', section: 'A', sgpa: [7.9, 8.1, 7.8, 8.0], attendance: 86, guardian: 'Manoj Agarwal' },
  { name: 'Neha Pillai', department: 'ECE', section: 'B', sgpa: [9.1, 9.0, 9.3, 9.2], attendance: 96, guardian: 'Krishna Pillai' },
  { name: 'Yash Thakur', department: 'ME', section: 'B', sgpa: [6.2, 6.5, 6.3, 6.4], attendance: 74, guardian: 'Rakesh Thakur' },
  { name: 'Shreya Banerjee', department: 'CSE', section: 'A', sgpa: [8.3, 8.6, 8.8, 8.9], attendance: 92, guardian: 'Arup Banerjee' },
]

const deptCode: Record<Department, string> = { CSE: 'CS', ECE: 'EC', IT: 'IT', ME: 'ME' }

function round(value: number, digits = 2) {
  const f = 10 ** digits
  return Math.round(value * f) / f
}

function pseudoRandom(seed: number) {
  const x = Math.sin(seed * 9301 + 49297) * 233280
  return x - Math.floor(x)
}

function buildSubjects(avgSgpa: number, attendance: number, seed: number): SubjectScore[] {
  return SUBJECTS.map((subject, i) => {
    const variance = (pseudoRandom(seed * 7 + i) - 0.5) * 16
    const base = avgSgpa * 9.5 + variance
    const total = Math.max(32, Math.min(98, Math.round(base)))
    const internal = Math.round(total * 0.4)
    const external = total - internal
    const subAttendance = Math.max(
      55,
      Math.min(100, Math.round(attendance + (pseudoRandom(seed * 3 + i) - 0.5) * 12)),
    )
    return { ...subject, internal, external, total, attendance: subAttendance }
  })
}

export const students: Student[] = seeds.map((s, index) => {
  const deptIndex = seeds.slice(0, index + 1).filter((x) => x.department === s.department).length
  const rollNo = `22${deptCode[s.department]}${String(100 + deptIndex).padStart(3, '0')}`
  const cgpa = round(s.sgpa.reduce((a, b) => a + b, 0) / s.sgpa.length)
  const status = getStatus(cgpa, s.attendance)
  const latest = s.sgpa[s.sgpa.length - 1]
  const trend = latest - s.sgpa[0]
  const riskScore = Math.max(
    4,
    Math.min(
      96,
      Math.round((10 - cgpa) * 9 + (90 - s.attendance) * 1.6 - trend * 12 + 12),
    ),
  )
  const [first, last] = s.name.toLowerCase().split(' ')
  return {
    id: rollNo.toLowerCase(),
    rollNo,
    name: s.name,
    email: `${first}.${last}@college.edu.in`,
    phone: `+91 98${String(40000000 + index * 137911).slice(0, 8)}`,
    department: s.department,
    semester: 5,
    section: s.section,
    batch: '2022 – 2026',
    attendance: s.attendance,
    cgpa,
    sgpaHistory: s.sgpa,
    subjects: buildSubjects(latest, s.attendance, index + 1),
    status,
    riskScore,
    guardian: s.guardian,
  }
})

export function getStudentById(id: string) {
  return students.find((s) => s.id === id.toLowerCase())
}

export function getSummary(list: Student[] = students) {
  const total = list.length
  const avgCgpa = round(list.reduce((a, s) => a + s.cgpa, 0) / total)
  const avgAttendance = round(list.reduce((a, s) => a + s.attendance, 0) / total, 1)
  const needsAttention = list.filter((s) => s.status === 'Needs Attention').length
  return { total, avgCgpa, avgAttendance, needsAttention }
}

export const SEMESTER_LABELS = ['Sem 1', 'Sem 2', 'Sem 3', 'Sem 4']

export function getSgpaTrend(list: Student[] = students) {
  return SEMESTER_LABELS.map((label, i) => {
    const values = list.map((s) => s.sgpaHistory[i])
    const average = round(values.reduce((a, b) => a + b, 0) / values.length)
    const top = round(Math.max(...values))
    const lowest = round(Math.min(...values))
    return { semester: label, average, top, lowest }
  })
}

export function getSubjectPerformance(list: Student[] = students) {
  return SUBJECTS.map((subject) => {
    const scores = list.map((s) => s.subjects.find((x) => x.code === subject.code)!.total)
    const average = Math.round(scores.reduce((a, b) => a + b, 0) / scores.length)
    const passRate = Math.round((scores.filter((x) => x >= 75).length / scores.length) * 100)
    return { subject: subject.short, name: subject.name, average, passRate }
  })
}

export function getStatusDistribution(list: Student[] = students) {
  return PERFORMANCE_STATUSES.map((status) => ({
    status,
    count: list.filter((s) => s.status === status).length,
  }))
}

export function getDepartmentStats(list: Student[] = students) {
  return DEPARTMENTS.map((dept) => {
    const inDept = list.filter((s) => s.department === dept)
    return {
      department: dept,
      cgpa: round(inDept.reduce((a, s) => a + s.cgpa, 0) / inDept.length),
      attendance: round(inDept.reduce((a, s) => a + s.attendance, 0) / inDept.length, 1),
      students: inDept.length,
    }
  })
}

export function getInitials(name: string) {
  return name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .slice(0, 2)
    .toUpperCase()
}
