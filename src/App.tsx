import { useState, type ChangeEvent } from 'react'
import './App.css'
import ServersListItem from './components/ServersListItem'

type StatusFilter = 'all' | 'online' | 'offline'

export default function App() {
  const title = 'PulseOps'
  const data = [
    {id: 1, title: 'Сервер-1', status: 'Онлайн', cpuUsage: 53, memoryUsage: 64},
    {id: 2, title: 'Сервер-2', status: 'Онлайн', cpuUsage: 85, memoryUsage: 91},
    {id: 3, title: 'Сервер-3', status: 'Офлайн', cpuUsage: null, memoryUsage: null}
  ]

  const [statusFilter, setStatusFilter] = useState<StatusFilter>('all')

  const filteredData = data.filter(item => {
    return statusFilter === 'online' 
      ? item.status === 'Онлайн'
      : statusFilter === 'offline'
        ? item.status === 'Офлайн'
        : true
  })

  function isStatusFilter(value: string): value is StatusFilter {
    return value === 'all' || value === 'online' || value === 'offline'
  }

  function handleChangeStatusFilter(event: ChangeEvent<HTMLSelectElement>) {
    const value = event.target.value

    if (isStatusFilter(value)) {
      setStatusFilter(value)
    }
  }

  return (
    <>
      <h1>{title}</h1>

      <section>
        <h2>Список серверов</h2>
        <select value={statusFilter} onChange={handleChangeStatusFilter}>
          <option value="all">Все</option>
          <option value="online">Онлайн</option>
          <option value="offline">Офлайн</option>
        </select>
        <ul>
          {filteredData.map(item => {
            return (
              <ServersListItem 
                key={item.id}
                title={item.title}
                status={item.status}
                cpuUsage={item.cpuUsage}
                memoryUsage={item.memoryUsage}
              />
            )
          })}
        </ul>
      </section>
    </>
  )
}
