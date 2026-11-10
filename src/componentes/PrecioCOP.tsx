const formatoCOP = new Intl.NumberFormat('es-CO', {
    style: 'currency',
    currency: 'COP',
    maximumFractionDigits: 0,
})

export function PrecioCOP({ valor }: { valor: number }) {
    return <span>{formatoCOP.format(valor)}</span>
}