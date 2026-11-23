import Link from "next/link"

export type ServerListProps = {
    itemId: number,
    title: string,
    status: string,
}

export default function ServerListItem({itemId, title, status}: ServerListProps) {
    return (
        <li>
            <p>Название: {title}</p>
            <p>Статус: {status}</p>
            <Link href={`/servers/${itemId}`}>Посмотреть детали сервера</Link>
        </li>
    )
}