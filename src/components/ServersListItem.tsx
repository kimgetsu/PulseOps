export type ServersListProps = {
    itemId: number,
    title: string,
    status: string,
    cpuUsage: number | null,
    memoryUsage: number | null,
    selectItem: (id: number) => void
}

export default function ServersList({itemId, title, status, cpuUsage, memoryUsage, selectItem}: ServersListProps) {
    return (
        <li>
            <p>Название: {title}</p>
            <p>Статус: {status}</p>
            <p>Загрузка CPU: {cpuUsage !== null ? `${cpuUsage}%` : '-'}</p>
            <p>Использование памяти: {memoryUsage !== null ? `${memoryUsage}%` : '-'}</p>
            <button onClick={() => selectItem(itemId)}>Описание</button>
        </li>
    )
}