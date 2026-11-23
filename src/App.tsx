'use client'

import { useState, type ChangeEvent } from 'react'
import './App.css'
import ServerListItem from './components/ServerListItem'
import { useServersQuery } from './hooks/useServersQuery'

type StatusFilter = 'all' | 'online' | 'offline'

export default function App() {
  const title = 'PulseOps'

  const { data: servers, isFetching, isLoading, isError, error, isRefetchError, refetch } = useServersQuery()

  const [statusFilter, setStatusFilter] = useState<StatusFilter>('all')

  const [search, setSearch] = useState('')

  const normalizedSearch = search.trim().toLowerCase()

  const filteredData = servers?.filter(item => {
    const normalizedTitle = item.title.trim().toLowerCase()
    
    const matchesStatus =
      statusFilter === 'all' ||
      (statusFilter === 'online' && item.status === 'Онлайн') ||
      (statusFilter === 'offline' && item.status === 'Офлайн')

    const matchesSearch = normalizedTitle.includes(normalizedSearch)

    return matchesStatus && matchesSearch
  }) ?? []

  function isStatusFilter(value: string): value is StatusFilter {
    return value === 'all' || value === 'online' || value === 'offline'
  }

  function handleChangeStatusFilter(event: ChangeEvent<HTMLSelectElement>) {
    const value = event.target.value

    if (isStatusFilter(value)) {
      setStatusFilter(value)
    }
  }

  function handleChangeInputValue(event: ChangeEvent<HTMLInputElement>) {
    setSearch(event.target.value)
  }

  function handleUpdateServersList() {
    refetch()
  }

  return (
    <>
      <h1>{title}</h1>

      <section>
        <h2>Список серверов</h2>

        <label>
          Поиск: <input value={search} onChange={handleChangeInputValue} type="text" />
        </label>

        <select value={statusFilter} onChange={handleChangeStatusFilter}>
          <option value="all">Все</option>
          <option value="online">Онлайн</option>
          <option value="offline">Офлайн</option>
        </select>

        {
          isLoading
            ? <p>Загрузка..</p>
            : isError && !servers
              ? <p>{error.message}</p>
              : filteredData.length === 0 
                ? <p>Серверы не найдены</p>
                : <ul>
                    {filteredData.map(item => {
                      return (
                        <ServerListItem 
                          key={item.id}
                          itemId={item.id}
                          title={item.title}
                          status={item.status}
                        />
                      )
                    })}
                  </ul>
        }
        
        <button onClick={handleUpdateServersList} type='button'>Обновить данные</button>
        {
          !isLoading && isFetching
            ? <p>Обновляем..</p>
            : isRefetchError
              ? <p>{error.message}</p>
              : null
        }
      </section>
    </>
  )
}
