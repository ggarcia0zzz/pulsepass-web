import type { ComponentProps } from 'react'

type IconoProps = ComponentProps<'svg'>

const base = {
    viewBox: '0 0 24 24',
    fill: 'none',
    stroke: 'currentColor',
    strokeWidth: 2,
    strokeLinecap: 'round',
    strokeLinejoin: 'round',
    'aria-hidden': true,
} as const

export function IconoMusica(props: IconoProps) {
    return (
        <svg {...base} {...props}>
            <path d="M9 18V5l12-2v13" />
            <circle cx="6" cy="18" r="3" />
            <circle cx="18" cy="16" r="3" />
        </svg>
    )
}

export function IconoMenu(props: IconoProps) {
    return (
        <svg {...base} {...props}>
            <path d="M4 6h16M4 12h16M4 18h16" />
        </svg>
    )
}

export function IconoCerrar(props: IconoProps) {
    return (
        <svg {...base} {...props}>
            <path d="M6 6l12 12M18 6L6 18" />
        </svg>
    )
}

export function IconoChevron(props: IconoProps) {
    return (
        <svg {...base} {...props}>
            <path d="M6 9l6 6 6-6" />
        </svg>
    )
}