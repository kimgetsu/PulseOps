export type Server = {
    id: number,
    title: string, 
    status: string,
    cpuUsage: number | null,
    memoryUsage: number | null,
    description: string | null
}

const mockServers: Server[] = [
    {id: 1, title: 'Сервер-1', status: 'Онлайн', cpuUsage: 53, memoryUsage: 64, description: 'Описание сервера под номером 1'},
    {id: 2, title: 'Сервер-2', status: 'Онлайн', cpuUsage: 85, memoryUsage: 91, description: 'Описание сервера под номером 2'},
    {id: 3, title: 'Сервер-3', status: 'Офлайн', cpuUsage: null, memoryUsage: null, description: null}
]

export async function getServersList(): Promise<Server[]> {
    await new Promise(resolve => {
        setTimeout(resolve, 1000)
    })
    return mockServers
}

