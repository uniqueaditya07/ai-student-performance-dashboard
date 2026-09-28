'use client'

import { Bar, BarChart, CartesianGrid, Line, LineChart, XAxis, YAxis } from 'recharts'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import {
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from '@/components/ui/chart'

const sgpaConfig = {
  student: { label: 'Student SGPA', color: 'var(--chart-1)' },
  classAvg: { label: 'Class Average', color: 'var(--chart-5)' },
} satisfies ChartConfig

const subjectConfig = {
  student: { label: 'Student', color: 'var(--chart-1)' },
  classAvg: { label: 'Class Avg.', color: 'var(--chart-3)' },
} satisfies ChartConfig

export function StudentSgpaChart({
  data,
}: {
  data: { semester: string; student: number; classAvg: number }[]
}) {
  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle>SGPA Trend</CardTitle>
        <CardDescription>Semester-wise SGPA compared to class average</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={sgpaConfig} className="aspect-auto h-[260px] w-full">
          <LineChart data={data} margin={{ left: -16, right: 12, top: 8 }}>
            <CartesianGrid vertical={false} strokeDasharray="3 3" />
            <XAxis dataKey="semester" tickLine={false} axisLine={false} tickMargin={8} />
            <YAxis domain={[4, 10]} ticks={[4, 6, 8, 10]} tickLine={false} axisLine={false} tickMargin={8} />
            <ChartTooltip content={<ChartTooltipContent indicator="line" />} />
            <Line
              dataKey="classAvg"
              type="monotone"
              stroke="var(--color-classAvg)"
              strokeWidth={2}
              strokeDasharray="5 4"
              dot={false}
            />
            <Line
              dataKey="student"
              type="monotone"
              stroke="var(--color-student)"
              strokeWidth={2.5}
              dot={{ r: 4, fill: 'var(--color-student)' }}
              activeDot={{ r: 6 }}
            />
            <ChartLegend content={<ChartLegendContent />} />
          </LineChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}

export function StudentSubjectChart({
  data,
}: {
  data: { subject: string; name: string; student: number; classAvg: number }[]
}) {
  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle>Subject-wise Marks</CardTitle>
        <CardDescription>Semester 5 totals out of 100</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={subjectConfig} className="aspect-auto h-[260px] w-full">
          <BarChart data={data} margin={{ left: -16, right: 8, top: 8 }} barGap={4}>
            <CartesianGrid vertical={false} strokeDasharray="3 3" />
            <XAxis dataKey="subject" tickLine={false} axisLine={false} tickMargin={8} />
            <YAxis domain={[0, 100]} tickLine={false} axisLine={false} tickMargin={8} />
            <ChartTooltip
              cursor={{ fill: 'var(--muted)' }}
              content={
                <ChartTooltipContent labelFormatter={(_, payload) => payload?.[0]?.payload?.name ?? ''} />
              }
            />
            <Bar dataKey="student" fill="var(--color-student)" radius={[4, 4, 0, 0]} maxBarSize={26} />
            <Bar dataKey="classAvg" fill="var(--color-classAvg)" radius={[4, 4, 0, 0]} maxBarSize={26} />
            <ChartLegend content={<ChartLegendContent />} />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
