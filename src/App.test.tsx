import { render, screen } from "@testing-library/react"
import { expect, test, afterEach, vi } from "vitest"
import App from "./App"
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import userEvent from '@testing-library/user-event'
import * as serversApi from './api/servers'

afterEach(() => {
    vi.restoreAllMocks()
})

test('Проверка загрузки и отображения серверов', async () => {
    const queryClient = new QueryClient({
        defaultOptions: {
            queries: {
                retry: false
            }
        }
    })

    render(
        <QueryClientProvider client={queryClient}>
            <App />
        </QueryClientProvider>
    )

    const serverItem = await screen.findByText('Название: Сервер-1', {}, {timeout: 3000})

    expect(serverItem).toBeInTheDocument()
})

test('Поиск по названию оставляет подходящий сервер и скрывает остальные', async () => {
    const queryClient = new QueryClient({
        defaultOptions: {
            queries: {
                retry: false
            }
        }
    })

    render(
        <QueryClientProvider client={queryClient}>
            <App />
        </QueryClientProvider>
    )

    const user = userEvent.setup()

    const field = screen.getByRole('textbox', { name: 'Поиск:' })

    const serverItem1 = await screen.findByText('Название: Сервер-1', {}, { timeout: 3000 })
    const serverItem2 = await screen.findByText('Название: Сервер-2', {}, { timeout: 3000 })
    expect(serverItem1).toBeInTheDocument()
    expect(serverItem2).toBeInTheDocument()

    await user.type(field, 'сервер-1')

    expect(screen.queryByText('Название: Сервер-2')).not.toBeInTheDocument()
    expect(screen.queryByText('Название: Сервер-1')).toBeInTheDocument()
})

test('Проверка фильтрации по статусу', async () => {
    const queryClient = new QueryClient({
        defaultOptions: {
            queries: {
                retry: false
            }
        }
    })

    render(
        <QueryClientProvider client={queryClient}>
            <App />
        </QueryClientProvider>
    )

    const user = userEvent.setup()

    const select = screen.getByRole('combobox')

    const serverItem1 = await screen.findByText('Название: Сервер-1', {}, { timeout: 3000 })
    const serverItem3 = await screen.findByText('Название: Сервер-3', {}, { timeout: 3000 })
    expect(serverItem1).toBeInTheDocument()
    expect(serverItem3).toBeInTheDocument()

    await user.selectOptions(select, 'offline')

    expect(serverItem1).not.toBeInTheDocument()
    expect(screen.queryByText('Название: Сервер-2')).not.toBeInTheDocument()
    expect(serverItem3).toBeInTheDocument()
})

test('Сохраняет список при ошибке обновления', async () => {
    const requestSpy = vi.spyOn(serversApi, 'getServersList')
    
    const queryClient = new QueryClient({
        defaultOptions: {
            queries: {
                retry: false
            }
        }
    })

    render(
        <QueryClientProvider client={queryClient}>
            <App />
        </QueryClientProvider>
    )

    const serverItem = await screen.findByText('Название: Сервер-1', {}, { timeout: 3000 })
    expect(serverItem).toBeInTheDocument()

    requestSpy.mockRejectedValue(
        new Error('Не удалось обновить список')
    )

    const user = userEvent.setup()

    const btn = screen.getByRole('button', { name: 'Обновить данные' })

    await user.click(btn)

    const errorMessage = await screen.findByText('Не удалось обновить список', {}, { timeout: 3000 })

    expect(errorMessage).toBeInTheDocument()
    expect(serverItem).toBeInTheDocument()
})