'use client'

import { Area, AreaChart, CartesianGrid, Line, XAxis, YAxis } from 'recharts'
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
  top: { label: 'Highest', color: 'var(--chart-2)' },
  average: { label: 'Class Average', color: 'var(--chart-1)' },
  lowest: { label: 'Lowest', color: 'var(--chart-4)' },
} satisfies ChartConfig

type Point = { semester: string; average: number; top: number; lowest: number }

export function SgpaTrendChart({
  data,
  title = 'SGPA Performance Trend',
  description = 'Semester-wise SGPA for the 2022–26 batch',
}: {
  data: Point[]
  title?: string
  description?: string
}) {
  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="aspect-auto h-[280px] w-full">
          <AreaChart data={data} margin={{ left: -16, right: 12, top: 8 }}>
            <defs>
              <linearGradient id="fillAverage" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="var(--color-average)" stopOpacity={0.3} />
                <stop offset="95%" stopColor="var(--color-average)" stopOpacity={0.02} />
              </linearGradient>
            </defs>
            <CartesianGrid vertical={false} strokeDasharray="3 3" />
            <XAxis dataKey="semester" tickLine={false} axisLine={false} tickMargin={8} />
            <YAxis domain={[4, 10]} tickLine={false} axisLine={false} tickMargin={8} ticks={[4, 6, 8, 10]} />
            <ChartTooltip content={<ChartTooltipContent indicator="line" />} />
            <Line
              dataKey="top"
              type="monotone"
              stroke="var(--color-top)"
              strokeWidth={2}
              strokeDasharray="5 4"
              dot={false}
            />
            <Area
              dataKey="average"
              type="monotone"
              stroke="var(--color-average)"
              strokeWidth={2.5}
              fill="url(#fillAverage)"
              dot={{ r: 3, fill: 'var(--color-average)' }}
            />
            <Line
              dataKey="lowest"
              type="monotone"
              stroke="var(--color-lowest)"
              strokeWidth={2}
              strokeDasharray="5 4"
              dot={false}
            />
            <ChartLegend content={<ChartLegendContent />} />
          </AreaChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
