export type ServersListProps = {
    title: string,
    status: string,
    cpuUsage: number | null,
    memoryUsage: number | null
}

export default function ServersList({title, status, cpuUsage, memoryUsage}: ServersListProps) {
    return (
        <li>
            <p>Название: {title}</p>
            <p>Статус: {status}</p>
            <p>Загрузка CPU: {cpuUsage !== null ? `${cpuUsage}%` : '-'}</p>
            <p>Использование памяти: {memoryUsage !== null ? `${memoryUsage}%` : '-'}</p>
        </li>
    )
}