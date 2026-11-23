import Link from "next/link"
import { getServerById } from "../../../api/servers"
import { notFound } from "next/navigation"

type ServerDetailPageProps = {
    params: Promise<{id: string}>
}

export default async function ServerDetailPage( {params}: ServerDetailPageProps ) {
    const { id } = await params

    const normalizedId = Number(id)

    if (!Number.isInteger(normalizedId) || normalizedId <= 0) {
        notFound()
    }

    const server = await getServerById(normalizedId)

    if (server === undefined) {
        notFound()
    }

    return (
        <>
            <h1>{server.title}</h1>
            <p>Статус: {server.status}</p>
            <p>Загрузка CPU: {server.cpuUsage !== null ? `${server.cpuUsage}%` : '-'}</p>
            <p>Использование памяти: {server.memoryUsage !== null ? `${server.memoryUsage}%` : '-'}</p>
            <p>Описание: {server.description !== null ? server.description : 'Описание отсутствует'}</p>
            <Link href='/'>К списку</Link>
        </> 
    )
}