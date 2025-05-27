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

const initialErrors = {
  taskName: "",
  team: "",
  priority: "",
  dueDate: "",
}

export default function ToDoForm({ setTodos }) {
  const [form, setForm] = useState(initialForm)
  const [errors, setErrors] = useState(initialErrors)

  const validateForm = () => {
    const newErrors = { ...initialErrors }
    let isValid = true

    if (!form.taskName.trim()) {
      newErrors.taskName = "Task name is required"
      isValid = false
    }

    if (!form.priority) {
      newErrors.priority = "Priority is required"
      isValid = false
    }

    if (form.dueDate && !/^\d{4}-\d{2}-\d{2}$/.test(form.dueDate)) {
      newErrors.dueDate = "Please enter a valid date"
      isValid = false
    }

    setErrors(newErrors)
    return isValid
  }

  const handleChange = (field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }))
    // Clear error when field is changed
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }))
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (validateForm()) {
      setTodos((prev) => [...prev, form])
      setForm(initialForm)
      setErrors(initialErrors)
    }
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
          id="todo-form"
          role="form"
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
              data-testid="task-name-input"
              placeholder="Enter task"
              value={form.taskName}
              onChange={e => handleChange("taskName", e.target.value)}
              className="w-full border border-gray-700 focus:border-gray-900 focus:ring-2 focus:ring-gray-300 rounded-md py-2 px-3 text-blue-900 bg-white"
              required
            />
            {errors.taskName && (
              <p className="text-red-500 text-sm mt-1">{errors.taskName}</p>
            )}
          </div>

          {/* Assign Team Member (Single Select) */}
          <div>
            <Label htmlFor="team" className="block py-2 font-medium text-blue-800">
              Assign Team Member
            </Label>
            <Select value={form.team} onValueChange={val => handleChange("team", val)}>
              <SelectTrigger
                id="team"
                data-testid="assignee-select"
                aria-label="Assign Team Member"
                className="w-full border border-gray-700 focus:border-gray-900 focus:ring-2 focus:ring-gray-300 rounded-md py-2 px-3 bg-white text-blue-900"
              >
                <SelectValue placeholder="Select team member" />
              </SelectTrigger>
              <SelectContent>
                {TEAM_MEMBERS.map(member => (
                  <SelectItem
                    key={member}
                    value={member}
                    data-testid={`assignee-option-${member.toLowerCase()}`}
                  >
                    {member}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {errors.team && (
              <p className="text-red-500 text-sm mt-1">{errors.team}</p>
            )}
          </div>

          {/* Priority */}
          <div>
            <Label htmlFor="priority" className="block py-2 font-medium text-blue-800">
              Priority
            </Label>
            <Select value={form.priority} onValueChange={val => handleChange("priority", val)}>
              <SelectTrigger
                id="priority"
                data-testid="priority-select"
                aria-label="Priority"
                className="w-full border border-gray-700 focus:border-gray-900 focus:ring-2 focus:ring-gray-300 rounded-md py-2 px-3 bg-white text-blue-900"
              >
                <SelectValue placeholder="Select priority" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem data-testid="priority-option-low" value="Low">Low</SelectItem>
                <SelectItem data-testid="priority-option-medium" value="Medium">Medium</SelectItem>
                <SelectItem data-testid="priority-option-high" value="High">High</SelectItem>
              </SelectContent>
            </Select>
            {errors.priority && (
              <p className="text-red-500 text-sm mt-1">{errors.priority}</p>
            )}
          </div>

          {/* Due Date */}
          <div>
            <Label htmlFor="dueDate" className="block py-2 font-medium text-blue-800">
              Due Date
            </Label>
            <Input
              id="dueDate"
              data-testid="due-date-input"
              type="date"
              value={form.dueDate}
              onChange={e => handleChange("dueDate", e.target.value)}
              className="input-icons w-full border border-gray-700 focus:border-gray-900 focus:ring-2 focus:ring-gray-300 rounded-md py-2 px-3 text-blue-900 bg-white"
            />
            {errors.dueDate && (
              <p className="text-red-500 text-sm mt-1">{errors.dueDate}</p>
            )}
          </div>

          {/* Reminder */}
          <div>
            <Label htmlFor="reminder" className="block py-2 font-medium text-blue-800">
              Reminder
            </Label>
            <Input
              id="reminder"
              data-testid="reminder-input"
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
              data-testid="description-input"
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
                data-testid="status-select"
                aria-label="Status"
                className="w-full border border-gray-700 focus:border-gray-900 focus:ring-2 focus:ring-gray-300 rounded-md py-2 px-3 bg-white text-blue-900"
              >
                <SelectValue placeholder="Select status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem data-testid="status-option-open" value="Open">Open</SelectItem>
                <SelectItem data-testid="status-option-in-progress" value="In Progress">In Progress</SelectItem>
                <SelectItem data-testid="status-option-done" value="Done">Done</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </form>

        {/* Fixed Submit Button */}
        <div className="flex-shrink-0 p-6 border-t border-gray-100 bg-white z-10">
          <Button
            type="submit"
            form="todo-form"
            data-testid="submit-button"
            className="w-full text-lg py-3 rounded-lg border border-blue-700 bg-blue-700 hover:bg-blue-800 text-white font-semibold shadow transition"
            style={{ backgroundColor: "black", color: "white" }}
          >
            Add To Do
          </Button>
        </div>
      </div>
    </div>
  )
}
