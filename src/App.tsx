import { useState, type ChangeEvent } from 'react'
import './App.css'
import ServersListItem from './components/ServersListItem'
import { useServersQuery } from './hooks/useServersQuery'

type StatusFilter = 'all' | 'online' | 'offline'

export default function App() {
  const title = 'PulseOps'

  const { data: servers, isLoading, isError, error } = useServersQuery()

  const [statusFilter, setStatusFilter] = useState<StatusFilter>('all')

  const [currentItemId, setCurrentItemId] = useState<number | null>(null)

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

  const selectedItem = filteredData.find(item => item.id === currentItemId)

  function isStatusFilter(value: string): value is StatusFilter {
    return value === 'all' || value === 'online' || value === 'offline'
  }

  function handleChangeStatusFilter(event: ChangeEvent<HTMLSelectElement>) {
    const value = event.target.value

    if (isStatusFilter(value)) {
      setStatusFilter(value)
      setCurrentItemId(null)
    }
  }

  function handleSelectItem(id: number) {
    if (Number.isInteger(id)) {
      setCurrentItemId(id)
    }
  }

  function handleChangeInputValue(event: ChangeEvent<HTMLInputElement>) {
    setCurrentItemId(null)
    setSearch(event.target.value)
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
            : isError
              ? <p>{error.message}</p>
              : filteredData.length === 0 
                ? <p>Серверы не найдены</p>
                : <ul>
                    {filteredData.map(item => {
                      return (
                        <ServersListItem 
                          key={item.id}
                          itemId={item.id}
                          title={item.title}
                          status={item.status}
                          cpuUsage={item.cpuUsage}
                          memoryUsage={item.memoryUsage}
                          selectItem={handleSelectItem}
                        />
                      )
                    })}
                  </ul>
        }

        {
          selectedItem 
            ? <div>
                <h2>Описание</h2>
                <p>{selectedItem.description ? selectedItem.description : 'Описания нет'}</p>
              </div>
            : null
        }
      </section>
    </>
  )
}
