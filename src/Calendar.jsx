import React, { useState } from 'react'
import CalendarForm from './calendarForm.jsx'
import ToDoForm from './todoForm.jsx'
import {
  Dialog,
  DialogTrigger,
  DialogContent,
} from "@/components/ui/dialog"
import { Plus, Edit2 } from "lucide-react"

function Calendar() {
  const [activeTab, setActiveTab] = useState('calendar')
  const [events, setEvents] = useState([])
  const [todos, setTodos] = useState([])
  const [dialogOpen, setDialogOpen] = useState(false)

  const handleAddTodo = (todoData) => {
    setTodos(prev => [...prev, todoData])
  }

  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="max-w-5xl mx-auto">
        <div className="bg-white rounded-xl shadow-lg p-8 relative">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-3xl font-bold text-blue-900">Calendar</h2>
          </div>
          {/* Tabs and Add Button Row */}
          <div className="flex items-center mb-4">
            {/* Tab Buttons */}
            <div className="flex gap-4">
              <button
                className={`px-6 py-2 rounded-full font-semibold shadow transition
                  ${activeTab === 'calendar'
                    ? 'bg-yellow-300 text-blue-900 border-2 border-blue-900'
                    : 'bg-gray-200 text-gray-500'
                  }`}
                onClick={() => setActiveTab('calendar')}
              >
                Calendar
              </button>
              <button
                className={`px-6 py-2 rounded-full font-semibold transition
                  ${activeTab === 'todo'
                    ? 'bg-yellow-300 text-blue-900 shadow border-2 border-yellow-600'
                    : 'bg-gray-200 text-gray-500'
                  }`}
                onClick={() => setActiveTab('todo')}
              >
                To Do
              </button>
            </div>
            <div className="flex-1" />
            {/* Add Button (DialogTrigger) */}
            <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
              <DialogTrigger asChild>
                <button
                  className="flex items-center gap-2 bg-sky-600 hover:bg-sky-700 text-white rounded-full px-4 py-2 shadow transition"
                  onClick={() => setDialogOpen(true)}
                  aria-label={activeTab === "calendar" ? "Add Event" : "Add To Do"}
                >
                  <Plus size={20} />
                  {activeTab === "calendar" ? "Add Event" : "Add To Do"}
                </button>
              </DialogTrigger>
              <DialogContent className="w-4/5 max-w-xl mx-auto p-0">
                <button
                  className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 text-2xl font-bold"
                  aria-label="Close"
                  type="button"
                  onClick={() => setDialogOpen(false)}
                >
                  &times;
                </button>
                <div className="p-6">
                  {activeTab === "calendar" ? (
                    <CalendarForm events={events} setEvents={setEvents} />
                  ) : (
                    <ToDoForm todos={todos} setTodos={setTodos} onAddTodo={handleAddTodo} />
                  )}
                </div>
              </DialogContent>
            </Dialog>
          </div>
          <div className="mt-8">
            {activeTab === 'calendar' ? (
              <div className="flex flex-col items-center justify-center py-12 text-gray-300 relative w-full">
                {events.length === 0 ? (
                  <div className="mt-4 text-lg text-gray-400">No events yet</div>
                ) : (
                  <div style={{ marginTop: 30 }} className="bg-white rounded shadow p-6 w-full">
                    <div className="w-full overflow-x-auto">
                      <table className="w-full min-w-[600px] table-auto">
                        <thead>
                          <tr className="text-xs text-gray-500 border-b">
                            <th className="font-normal text-left px-4 py-2">Event Date</th>
                            <th className="font-normal text-left px-4 py-2">Event Type</th>
                            <th className="font-normal text-left px-4 py-2">Event Name</th>
                            <th className="font-normal text-left px-4 py-2">Status</th>
                            <th className="font-normal text-left px-4 py-2">Edit</th>
                          </tr>
                        </thead>
                        <tbody>
                          {events.map((event, idx) => {
                            const dateObj = new Date(event.startDate)
                            const day = dateObj.toLocaleDateString("en-US", { weekday: "short" })
                            const date = dateObj.getDate()
                            const month = dateObj.toLocaleDateString("en-US", { month: "short" })
                            return (
                              <tr key={idx} className="border-b last:border-0 group hover:bg-gray-50 transition">
                                <td className="align-top py-3 px-4 text-left">
                                  <div className="flex flex-col">
                                    <div className="bg-gray-100 px-3 py-1 rounded-t text-xs font-semibold text-gray-700 border border-b-0 border-gray-200">
                                      {date}-{month}- {day}
                                    </div>
                                  </div>
                                </td>
                                <td className="align-top py-3 px-4 text-left">
                                  <div className="text-xs text-gray-500">{event.eventType}</div>
                                </td>
                                <td className="align-top py-3 px-4 text-left">
                                  <div className="text-xs text-gray-800">{event.eventName}</div>
                                </td>
                                <td className="align-top py-3 px-4 text-left">
                                  <span className="text-sky-500 font-semibold text-xs cursor-pointer">Open</span>
                                </td>
                                <td className="align-top py-3 px-4 text-left">
                                  <button className="text-gray-700 hover:text-sky-600">
                                    <Edit2 size={16} />
                                  </button>
                                </td>
                              </tr>
                            )
                          })}
                        </tbody>
                      </table>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-12 text-gray-500 relative">
                {todos.length === 0 ? (
                  <div className="mt-4 text-lg text-gray-400">No todo event yet</div>
                ) : (
                  <div style={{ marginTop: 30 }} className="bg-white rounded shadow p-6 w-full">
                    <div className="w-full overflow-x-auto">
                      <table className="w-full min-w-[800px] table-auto">
                        <thead>
                          <tr className="text-xs text-gray-500 border-b">
                            <th className="font-normal text-left px-4 py-2">Task Name</th>
                            <th className="font-normal text-left px-4 py-2">Assigned To</th>
                            <th className="font-normal text-left px-4 py-2">Priority</th>
                            <th className="font-normal text-left px-4 py-2">Due Date</th>
                            <th className="font-normal text-left px-4 py-2">Reminder</th>
                            <th className="font-normal text-left px-4 py-2">Status</th>
                            <th className="font-normal text-left px-4 py-2">Description</th>
                            <th className="font-normal text-left px-4 py-2">Edit</th>
                          </tr>
                        </thead>
                        <tbody>
                          {todos.map((todo, idx) => (
                            <tr key={idx} className="border-b last:border-0 group hover:bg-gray-50 transition">
                              <td className="align-top py-3 px-4 text-left font-semibold text-yellow-900">{todo.taskName}</td>
                              <td className="align-top py-3 px-4 text-left text-yellow-800">{todo.team || "—"}</td>
                              <td className="align-top py-3 px-4 text-left">
                                <span className={`
                  text-xs font-bold px-2 py-1 rounded
                  ${todo.priority === "High" ? "bg-red-100 text-red-700" :
                                    todo.priority === "Medium" ? "bg-yellow-200 text-yellow-800" :
                                      "bg-green-100 text-green-700"}
                `}>
                                  {todo.priority}
                                </span>
                              </td>
                              <td className="align-top py-3 px-4 text-left text-yellow-700">{todo.dueDate || "—"}</td>
                              <td className="align-top py-3 px-4 text-left text-yellow-700">
                                {todo.reminder ? new Date(todo.reminder).toLocaleString() : "—"}
                              </td>
                              <td className="align-top py-3 px-4 text-left text-yellow-800">{todo.status || "—"}</td>
                              <td className="align-top py-3 px-4 text-left text-yellow-900">{todo.description || "—"}</td>
                              <td className="align-top py-3 px-4 text-left">
                                <button className="text-gray-700 hover:text-sky-600">
                                  <Edit2 size={16} />
                                </button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Calendar
