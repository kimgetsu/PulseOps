import Link from "next/link";

export default function NotFound() {
    return (
        <>
        <h1>Упс! Сервер не найден</h1>
        <Link href='/'>К списку</Link>
        </>
    )
}