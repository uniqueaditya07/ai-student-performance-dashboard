'use client'

import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from 'recharts'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import {
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from '@/components/ui/chart'

const chartConfig = {
  average: { label: 'Avg. Marks', color: 'var(--chart-1)' },
  passRate: { label: 'Scored 75+ (%)', color: 'var(--chart-2)' },
} satisfies ChartConfig

type Row = { subject: string; name: string; average: number; passRate: number }

export function SubjectPerformanceChart({ data }: { data: Row[] }) {
  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle>Subject-wise Performance</CardTitle>
        <CardDescription>Semester 5 · average marks and share of students scoring 75+</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="aspect-auto h-[280px] w-full">
          <BarChart data={data} margin={{ left: -16, right: 8, top: 8 }} barGap={4}>
            <CartesianGrid vertical={false} strokeDasharray="3 3" />
            <XAxis dataKey="subject" tickLine={false} axisLine={false} tickMargin={8} />
            <YAxis domain={[0, 100]} tickLine={false} axisLine={false} tickMargin={8} />
            <ChartTooltip
              cursor={{ fill: 'var(--muted)' }}
              content={
                <ChartTooltipContent
                  labelFormatter={(_, payload) => payload?.[0]?.payload?.name ?? ''}
                />
              }
            />
            <Bar dataKey="average" fill="var(--color-average)" radius={[4, 4, 0, 0]} maxBarSize={28} />
            <Bar dataKey="passRate" fill="var(--color-passRate)" radius={[4, 4, 0, 0]} maxBarSize={28} />
            <ChartLegend content={<ChartLegendContent />} />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
