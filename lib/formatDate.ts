export function formatDate(date: Date) {
    const months = [
        "ene",
        "feb",
        "mar",
        "abr",
        "may",
        "jun",
        "jun",
        "ago",
        "sep",
        "oct",
        "nov",
        "dic",
    ]

    const day = date.getDate()
    const month = months[date.getMonth()]
    const year = date.getFullYear()
    
    return `${day} ${month}, ${year}`
}