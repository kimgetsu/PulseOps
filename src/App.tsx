import { useState, type ChangeEvent } from 'react'
import './App.css'
import ServersListItem from './components/ServersListItem'

type StatusFilter = 'all' | 'online' | 'offline'

export default function App() {
  const title = 'PulseOps'

  const data = [
    {id: 1, title: 'Сервер-1', status: 'Онлайн', cpuUsage: 53, memoryUsage: 64, description: 'Описание сервера под номером 1'},
    {id: 2, title: 'Сервер-2', status: 'Онлайн', cpuUsage: 85, memoryUsage: 91, description: 'Описание сервера под номером 2'},
    {id: 3, title: 'Сервер-3', status: 'Офлайн', cpuUsage: null, memoryUsage: null, description: null}
  ]

  const [statusFilter, setStatusFilter] = useState<StatusFilter>('all')

  const [currentItemId, setCurrentItemId] = useState<number | null>(null)

  const [search, setSearch] = useState('')

  const normalizedSearch = search.trim().toLowerCase()

  const filteredData = data.filter(item => {
    const normalizedTitle = item.title.trim().toLowerCase()
    
    const matchesStatus =
      statusFilter === 'all' ||
      (statusFilter === 'online' && item.status === 'Онлайн') ||
      (statusFilter === 'offline' && item.status === 'Офлайн')

    const matchesSearch = normalizedTitle.includes(normalizedSearch)

    return matchesStatus && matchesSearch
  })

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
          filteredData.length === 0 
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
