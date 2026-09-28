'use client'

import { Bar, BarChart, CartesianGrid, Cell, Pie, PieChart, Scatter, ScatterChart, XAxis, YAxis, ZAxis } from 'recharts'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import {
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from '@/components/ui/chart'

const statusConfig = {
  count: { label: 'Students' },
  Excellent: { label: 'Excellent', color: 'var(--success)' },
  Good: { label: 'Good', color: 'var(--info)' },
  Average: { label: 'Average', color: 'var(--warning)' },
  'Needs Attention': { label: 'Needs Attention', color: 'var(--destructive)' },
} satisfies ChartConfig

const statusColors: Record<string, string> = {
  Excellent: 'var(--success)',
  Good: 'var(--info)',
  Average: 'var(--warning)',
  'Needs Attention': 'var(--destructive)',
}

export function StatusDistributionChart({ data }: { data: { status: string; count: number }[] }) {
  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle>Performance Distribution</CardTitle>
        <CardDescription>Students by performance status</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={statusConfig} className="mx-auto aspect-square h-[260px]">
          <PieChart>
            <ChartTooltip content={<ChartTooltipContent nameKey="status" hideLabel />} />
            <Pie data={data} dataKey="count" nameKey="status" innerRadius={60} outerRadius={95} paddingAngle={2}>
              {data.map((d) => (
                <Cell key={d.status} fill={statusColors[d.status]} />
              ))}
            </Pie>
            <ChartLegend content={<ChartLegendContent nameKey="status" />} className="flex-wrap" />
          </PieChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}

const deptConfig = {
  cgpa: { label: 'Avg. CGPA', color: 'var(--chart-1)' },
} satisfies ChartConfig

export function DepartmentChart({
  data,
}: {
  data: { department: string; cgpa: number; attendance: number; students: number }[]
}) {
  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle>Department-wise CGPA</CardTitle>
        <CardDescription>Average cumulative GPA per department</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={deptConfig} className="aspect-auto h-[260px] w-full">
          <BarChart data={data} layout="vertical" margin={{ left: 0, right: 16 }}>
            <CartesianGrid horizontal={false} strokeDasharray="3 3" />
            <XAxis type="number" domain={[0, 10]} tickLine={false} axisLine={false} />
            <YAxis type="category" dataKey="department" tickLine={false} axisLine={false} width={44} />
            <ChartTooltip cursor={{ fill: 'var(--muted)' }} content={<ChartTooltipContent />} />
            <Bar dataKey="cgpa" fill="var(--color-cgpa)" radius={[0, 4, 4, 0]} maxBarSize={28} />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}

const scatterConfig = {
  students: { label: 'Student', color: 'var(--chart-1)' },
} satisfies ChartConfig

export function AttendanceCorrelationChart({
  data,
}: {
  data: { name: string; attendance: number; cgpa: number }[]
}) {
  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle>Attendance vs CGPA</CardTitle>
        <CardDescription>Correlation used by the AI model to flag at-risk students</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={scatterConfig} className="aspect-auto h-[260px] w-full">
          <ScatterChart margin={{ left: -16, right: 12, top: 8 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis
              type="number"
              dataKey="attendance"
              name="Attendance"
              unit="%"
              domain={[60, 100]}
              tickLine={false}
              axisLine={false}
            />
            <YAxis type="number" dataKey="cgpa" name="CGPA" domain={[5, 10]} tickLine={false} axisLine={false} />
            <ZAxis range={[60, 60]} />
            <ChartTooltip
              cursor={{ strokeDasharray: '3 3' }}
              content={
                <ChartTooltipContent
                  hideLabel
                  formatter={(_, __, item) => (
                    <div className="flex flex-col">
                      <span className="font-medium">{item.payload.name}</span>
                      <span className="text-muted-foreground">
                        {item.payload.attendance}% · CGPA {item.payload.cgpa.toFixed(2)}
                      </span>
                    </div>
                  )}
                />
              }
            />
            <Scatter data={data} fill="var(--color-students)" fillOpacity={0.75} />
          </ScatterChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
