import type { ReactNode } from 'react'

export type TonoBadge =
    | 'DRAFT'
    | 'PUBLISHED'
    | 'SOLD_OUT'
    | 'CANCELLED'
    | 'FINISHED'
    | 'RESERVED'
    | 'PAID'
    | 'USED'

const clasesTono: Record<TonoBadge, string> = {
    DRAFT: 'bg-slate-200 text-slate-700 dark:bg-slate-700 dark:text-slate-200',
    PUBLISHED: 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/40 dark:text-emerald-300',
    SOLD_OUT: 'bg-amber-100 text-amber-800 dark:bg-amber-900/40 dark:text-amber-300',
    CANCELLED: 'bg-red-100 text-red-800 dark:bg-red-900/40 dark:text-red-300',
    FINISHED: 'bg-slate-300 text-slate-800 dark:bg-slate-600 dark:text-slate-100',
    RESERVED: 'bg-sky-100 text-sky-800 dark:bg-sky-900/40 dark:text-sky-300',
    PAID: 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/40 dark:text-emerald-300',
    USED: 'bg-slate-300 text-slate-800 dark:bg-slate-600 dark:text-slate-100',
}

interface BadgeProps {
    tono: TonoBadge
    children?: ReactNode
}

export function Badge({ tono, children }: BadgeProps) {
    return (
        <span className={`inline-block rounded-full px-2 py-0.5 text-xs font-semibold ${clasesTono[tono]}`}>
      {children ?? tono}
    </span>
    )
}