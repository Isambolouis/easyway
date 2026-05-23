import type { ReactNode } from 'react'
import {
  Area,
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Legend,
  Line,
  LineChart,
  Pie,
  PieChart,
  ResponsiveContainer,
  Scatter,
  ScatterChart,
  Tooltip,
  XAxis,
  YAxis,
  ZAxis,
} from 'recharts'

export const STATS_CHART_COLORS = ['#0ea5e9', '#6366f1', '#8b5cf6', '#14b8a6', '#f59e0b', '#ec4899', '#64748b']

const tooltipStyle = {
  borderRadius: '12px',
  border: '1px solid #e2e8f0',
  boxShadow: '0 10px 25px rgba(15, 23, 42, 0.08)',
  fontSize: '13px',
}

export function ChartCard({
  title,
  subtitle,
  children,
  height = 300,
}: {
  title: string
  subtitle?: string
  children: ReactNode
  height?: number
}) {
  return (
    <div className="scroll-x-card interactive-panel rounded-2xl border border-sky-200/80 bg-gradient-to-br from-white to-sky-50/40 p-4 shadow-sm">
      <p className="text-sm font-semibold text-deep">{title}</p>
      {subtitle && <p className="mt-0.5 text-xs text-muted">{subtitle}</p>}
      <div className="mt-3 w-full" style={{ height }}>
        {children}
      </div>
    </div>
  )
}

export function StatsBarChart({
  data,
  xKey,
  yKey,
  title,
  subtitle,
  color = STATS_CHART_COLORS[0],
}: {
  data: Record<string, unknown>[]
  xKey: string
  yKey: string
  title: string
  subtitle?: string
  color?: string
}) {
  return (
    <ChartCard title={title} subtitle={subtitle}>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data} margin={{ top: 12, right: 12, left: 0, bottom: 8 }}>
          <defs>
            <linearGradient id="barGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor={color} stopOpacity={0.95} />
              <stop offset="100%" stopColor={color} stopOpacity={0.55} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" vertical={false} />
          <XAxis dataKey={xKey} tick={{ fontSize: 11, fill: '#64748b' }} axisLine={false} tickLine={false} />
          <YAxis tick={{ fontSize: 11, fill: '#64748b' }} axisLine={false} tickLine={false} />
          <Tooltip contentStyle={tooltipStyle} />
          <Bar dataKey={yKey} fill="url(#barGrad)" radius={[8, 8, 0, 0]} maxBarSize={48} />
        </BarChart>
      </ResponsiveContainer>
    </ChartCard>
  )
}

export function StatsPieChart({
  data,
  title,
  subtitle,
}: {
  data: { name: string; value: number }[]
  title: string
  subtitle?: string
}) {
  return (
    <ChartCard title={title} subtitle={subtitle}>
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={data}
            dataKey="value"
            nameKey="name"
            cx="50%"
            cy="50%"
            innerRadius={55}
            outerRadius={95}
            paddingAngle={3}
            label={({ name, percent }) => `${name} ${((percent ?? 0) * 100).toFixed(0)}%`}
            labelLine={{ stroke: '#94a3b8', strokeWidth: 1 }}
          >
            {data.map((_, i) => (
              <Cell key={i} fill={STATS_CHART_COLORS[i % STATS_CHART_COLORS.length]} stroke="white" strokeWidth={2} />
            ))}
          </Pie>
          <Tooltip contentStyle={tooltipStyle} />
          <Legend verticalAlign="bottom" height={36} iconType="circle" />
        </PieChart>
      </ResponsiveContainer>
    </ChartCard>
  )
}

export function StatsHistogram({
  data,
  title,
  subtitle,
}: {
  data: { label: string; count: number }[]
  title: string
  subtitle?: string
}) {
  return (
    <StatsBarChart
      data={data}
      xKey="label"
      yKey="count"
      title={title}
      subtitle={subtitle}
      color={STATS_CHART_COLORS[1]}
    />
  )
}

/** Histogramme — hauteur = densité (classes de largeurs égales ou différentes). */
export function StatsDensityHistogram({
  data,
  title,
  subtitle,
}: {
  data: { label: string; density: number; effectif: number }[]
  title: string
  subtitle?: string
}) {
  return (
    <ChartCard title={title} subtitle={subtitle}>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data} margin={{ top: 12, right: 12, left: 0, bottom: 8 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" vertical={false} />
          <XAxis dataKey="label" tick={{ fontSize: 10, fill: '#64748b' }} />
          <YAxis tick={{ fontSize: 11, fill: '#64748b' }} />
          <Tooltip
            contentStyle={tooltipStyle}
            formatter={(v, _name, item) => {
              const eff = (item?.payload as { effectif?: number })?.effectif
              return [`${Number(v).toFixed(2)} (n=${eff ?? '?'})`, 'Densité']
            }}
          />
          <Bar dataKey="density" fill={STATS_CHART_COLORS[2]} radius={[6, 6, 0, 0]} maxBarSize={48} />
        </BarChart>
      </ResponsiveContainer>
    </ChartCard>
  )
}

export function StatsLineChart({
  data,
  xKey,
  yKey,
  title,
  subtitle,
  color = STATS_CHART_COLORS[0],
}: {
  data: Record<string, unknown>[]
  xKey: string
  yKey: string
  title: string
  subtitle?: string
  color?: string
}) {
  return (
    <ChartCard title={title} subtitle={subtitle}>
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data} margin={{ top: 12, right: 12, left: 0, bottom: 8 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" vertical={false} />
          <XAxis dataKey={xKey} tick={{ fontSize: 11, fill: '#64748b' }} axisLine={false} tickLine={false} />
          <YAxis tick={{ fontSize: 11, fill: '#64748b' }} axisLine={false} tickLine={false} />
          <Tooltip contentStyle={tooltipStyle} />
          <Line
            type="monotone"
            dataKey={yKey}
            stroke={color}
            strokeWidth={3}
            dot={{ r: 5, fill: color, stroke: '#fff', strokeWidth: 2 }}
            activeDot={{ r: 7 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </ChartCard>
  )
}

export function StatsOgiveChart({
  data,
  title,
  subtitle,
}: {
  data: { label: string; cumul: number }[]
  title: string
  subtitle?: string
}) {
  return (
    <ChartCard title={title} subtitle={subtitle}>
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data} margin={{ top: 12, right: 12, left: 0, bottom: 8 }}>
          <defs>
            <linearGradient id="ogiveFill" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#6366f1" stopOpacity={0.35} />
              <stop offset="100%" stopColor="#6366f1" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
          <XAxis dataKey="label" tick={{ fontSize: 10, fill: '#64748b' }} />
          <YAxis domain={[0, 1]} tickFormatter={(v) => `${(Number(v) * 100).toFixed(0)}%`} tick={{ fontSize: 11 }} />
          <Tooltip
            contentStyle={tooltipStyle}
            formatter={(v) => [`${(Number(v) * 100).toFixed(1)} %`, 'Cumul']}
          />
          <Area type="monotone" dataKey="cumul" stroke="none" fill="url(#ogiveFill)" />
          <Line type="monotone" dataKey="cumul" stroke="#6366f1" strokeWidth={3} dot={{ r: 4, fill: '#6366f1' }} />
        </LineChart>
      </ResponsiveContainer>
    </ChartCard>
  )
}

export function StatsScatterChart({
  data,
  title,
  subtitle,
  xKey,
  yKey,
}: {
  data: Record<string, unknown>[]
  title: string
  subtitle?: string
  xKey: string
  yKey: string
}) {
  return (
    <ChartCard title={title} subtitle={subtitle}>
      <ResponsiveContainer width="100%" height="100%">
        <ScatterChart margin={{ top: 12, right: 12, left: 0, bottom: 8 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
          <XAxis type="number" dataKey={xKey} name={xKey} tick={{ fontSize: 11 }} />
          <YAxis type="number" dataKey={yKey} name={yKey} tick={{ fontSize: 11 }} />
          <ZAxis range={[80, 400]} />
          <Tooltip contentStyle={tooltipStyle} cursor={{ strokeDasharray: '4 4' }} />
          <Scatter data={data} fill="#0ea5e9" fillOpacity={0.75} stroke="#0369a1" strokeWidth={2} />
        </ScatterChart>
      </ResponsiveContainer>
    </ChartCard>
  )
}

/** Boîte à moustaches SVG moderne */
export function StatsBoxPlot({
  stats,
  title,
  subtitle,
}: {
  stats: { min: number; q1: number; q2: number; q3: number; max: number; outliers: number[] }
  title: string
  subtitle?: string
}) {
  const lo = stats.min - 1
  const hi = stats.max + 1
  const scale = (v: number) => 40 + ((v - lo) / (hi - lo)) * 200

  return (
    <ChartCard title={title} subtitle={subtitle} height={260}>
      <svg viewBox="0 0 320 220" className="mx-auto h-full w-full max-w-md">
        <line x1={160} y1={30} x2={160} y2={190} stroke="#cbd5e1" strokeWidth={1} />
        <line x1={160} y1={scale(stats.min)} x2={160} y2={scale(stats.q1)} stroke="#0ea5e9" strokeWidth={2} />
        <line x1={160} y1={scale(stats.q3)} x2={160} y2={scale(stats.max)} stroke="#0ea5e9" strokeWidth={2} />
        <rect
          x={100}
          y={scale(stats.q3)}
          width={120}
          height={Math.max(4, scale(stats.q1) - scale(stats.q3))}
          fill="#0ea5e9"
          fillOpacity={0.2}
          stroke="#0ea5e9"
          strokeWidth={2}
          rx={6}
        />
        <line x1={100} x2={220} y1={scale(stats.q2)} y2={scale(stats.q2)} stroke="#6366f1" strokeWidth={2.5} />
        {stats.outliers.map((o, i) => (
          <circle key={i} cx={160 + (i - stats.outliers.length / 2) * 14} cy={scale(o)} r={5} fill="#f59e0b" stroke="#fff" strokeWidth={1.5} />
        ))}
        {[
          { v: stats.min, label: 'min' },
          { v: stats.q1, label: 'Q1' },
          { v: stats.q2, label: 'Q2' },
          { v: stats.q3, label: 'Q3' },
          { v: stats.max, label: 'max' },
        ].map(({ v, label }) => (
          <text key={label} x={230} y={scale(v) + 4} fontSize={10} fill="#64748b">
            {label}={Number.isInteger(v) ? v : v.toFixed(1)}
          </text>
        ))}
        <text x={160} y={210} textAnchor="middle" fontSize={11} fill="#64748b">
          Distribution
        </text>
      </svg>
    </ChartCard>
  )
}
