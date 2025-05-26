import { useState } from "react"
import { Input } from "../src/components/ui/input"
import { Label } from "../src/components/ui/label"
import { Button } from "../src/components/ui/button"
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "../src/components/ui/select"

const TEAM_MEMBERS = [
  "Alice",
  "Bob",
  "Charlie",
  "Diana"
]

const PRIORITY_OPTIONS = [
  { value: "Low", label: "Low" },
  { value: "Medium", label: "Medium" },
  { value: "High", label: "High" }
]

const STATUS_OPTIONS = [
  { value: "Open", label: "Open" },
  { value: "In Progress", label: "In Progress" },
  { value: "Done", label: "Done" }
]

const initialForm = {
  taskName: "",
  team: "",
  priority: "",
  dueDate: "",
  reminder: "",
  description: "",
  status: "",
}

export default function ToDoForm({ setTodos }) {
  const [form, setForm] = useState(initialForm)

  const handleChange = (field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setTodos((prev) => [...prev, form])
    setForm(initialForm)
  }

  return (
    <div className="max-w-2xl mx-auto mt-12 px-2">
      <div
        className="relative bg-white rounded-xl shadow-xl border border-gray-200 flex flex-col"
        style={{ height: "80vh", minHeight: 500, maxHeight: 700 }}
      >
        {/* Fixed Title */}
        <div className="flex-shrink-0 p-6 border-b border-gray-100 bg-white z-10">
          <h2 className="text-3xl font-bold text-center text-blue-900 tracking-tight">
            Create To Do
          </h2>
        </div>

        {/* Scrollable Form Content */}
        <form
          onSubmit={handleSubmit}
          className="flex-1 overflow-y-auto overflow-x-hidden p-[5px] space-y-6"
        >
          {/* Task Name */}
          <div>
            <Label htmlFor="taskName" className="block py-2 font-medium text-blue-800">
              Task Name
            </Label>
            <Input
              id="taskName"
              placeholder="Enter task"
              value={form.taskName}
              onChange={e => handleChange("taskName", e.target.value)}
              className="w-full border border-gray-700 focus:border-gray-900 focus:ring-2 focus:ring-gray-300 rounded-md py-2 px-3 text-blue-900 bg-white"
              required
            />
          </div>

          {/* Assign Team Member (Single Select) */}
          <div>
            <Label htmlFor="team" className="block py-2 font-medium text-blue-800">
              Assign Team Member
            </Label>
            <Select value={form.team} onValueChange={val => handleChange("team", val)}>
              <SelectTrigger
                id="team"
                className="w-full border border-gray-700 focus:border-gray-900 focus:ring-2 focus:ring-gray-300 rounded-md py-2 px-3 bg-white text-blue-900"
              >
                <SelectValue placeholder="Select team member" />
              </SelectTrigger>
              <SelectContent>
                {TEAM_MEMBERS.map(member => (
                  <SelectItem key={member} value={member}>{member}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Priority */}
          <div>
            <Label htmlFor="priority" className="block py-2 font-medium text-blue-800">
              Priority
            </Label>
            <Select value={form.priority} onValueChange={val => handleChange("priority", val)}>
              <SelectTrigger
                id="priority"
                className="w-full border border-gray-700 focus:border-gray-900 focus:ring-2 focus:ring-gray-300 rounded-md py-2 px-3 bg-white text-blue-900"
              >
                <SelectValue placeholder="Select priority" />
              </SelectTrigger>
              <SelectContent>
                {PRIORITY_OPTIONS.map(opt => (
                  <SelectItem key={opt.value} value={opt.value}>{opt.label}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Due Date */}
          <div>
            <Label htmlFor="dueDate" className="block py-2 font-medium text-blue-800">
              Due Date
            </Label>
            <Input
              id="dueDate"
              type="date"
              value={form.dueDate}
              onChange={e => handleChange("dueDate", e.target.value)}
              className="input-icons w-full border border-gray-700 focus:border-gray-900 focus:ring-2 focus:ring-gray-300 rounded-md py-2 px-3 text-blue-900 bg-white"
            />
          </div>

          {/* Reminder */}
          <div>
            <Label htmlFor="reminder" className="block py-2 font-medium text-blue-800">
              Reminder
            </Label>
            <Input
              id="reminder"
              type="datetime-local"
              value={form.reminder}
              onChange={e => handleChange("reminder", e.target.value)}
              className="input-icons w-full border border-gray-700 focus:border-gray-900 focus:ring-2 focus:ring-gray-300 rounded-md py-2 px-3 text-blue-900 bg-white"
            />
          </div>

          {/* Description */}
          <div>
            <Label htmlFor="description" className="block py-2 font-medium text-blue-800">
              Description
            </Label>
            <Input
              as="textarea"
              id="description"
              placeholder="Task details, notes, etc."
              value={form.description}
              onChange={e => handleChange("description", e.target.value)}
              className="w-full min-h-[5rem] max-h-[8rem] border border-gray-700 focus:border-gray-900 focus:ring-2 focus:ring-gray-300 rounded-md py-2 px-3 text-blue-900 bg-white resize-none"
            />
          </div>

          {/* Status */}
          <div>
            <Label htmlFor="status" className="block py-2 font-medium text-blue-800">
              Status
            </Label>
            <Select value={form.status} onValueChange={val => handleChange("status", val)}>
              <SelectTrigger
                id="status"
                className="w-full border border-gray-700 focus:border-gray-900 focus:ring-2 focus:ring-gray-300 rounded-md py-2 px-3 bg-white text-blue-900"
              >
                <SelectValue placeholder="Select status" />
              </SelectTrigger>
              <SelectContent>
                {STATUS_OPTIONS.map(opt => (
                  <SelectItem key={opt.value} value={opt.value}>{opt.label}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </form>

        {/* Fixed Submit Button */}
        <div className="flex-shrink-0 p-6 border-t border-gray-100 bg-white z-10">
          <Button
            type="submit"
            form="todo-form"
            className="w-full text-lg py-3 rounded-lg border border-blue-700 bg-blue-700 hover:bg-blue-800 text-white font-semibold shadow transition"
            onClick={handleSubmit}
            style={{ backgroundColor: "black", color: "white" }}
          >
            Add To Do
          </Button>
        </div>
      </div>
    </div>
  )
}
