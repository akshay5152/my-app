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

const initialForm = {
  eventType: "",
  eventName: "",
  mode: "",
  startDate: "",
  endDate: "",
  startTime: "",
  endTime: "",
  description: "",
}

export default function EventForm({ setEvents }) {
  const [form, setForm] = useState(initialForm)

  const handleChange = (field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setEvents((prev) => [...prev, form])
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
            Create Event
          </h2>
        </div>

        {/* Scrollable Form Content */}
        <form
          onSubmit={handleSubmit}
          className="flex-1 overflow-y-auto overflow-x-hidden p-[5px] space-y-6"
        >
          {/* Event Type */}
          <div>
            <Label htmlFor="eventType" className="block py-2 font-medium text-blue-800">
              Event Type
            </Label>
            <Select value={form.eventType} onValueChange={val => handleChange("eventType", val)}>
              <SelectTrigger
                id="eventType"
                className="w-full border border-gray-700 focus:border-gray-900 focus:ring-2 focus:ring-gray-300 rounded-md py-2 px-3 bg-white text-blue-900"
              >
                <SelectValue placeholder="Select event type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Meeting">Meeting</SelectItem>
                <SelectItem value="Reminder">Reminder</SelectItem>
                <SelectItem value="Appointment">Appointment</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Event Name */}
          <div>
            <Label htmlFor="eventName" className="block py-2 font-medium text-blue-800">
              Event Name
            </Label>
            <Input
              id="eventName"
              placeholder="Team Sync"
              value={form.eventName}
              onChange={e => handleChange("eventName", e.target.value)}
              className="w-full border border-gray-700 focus:border-gray-900 focus:ring-2 focus:ring-gray-300 rounded-md py-2 px-3 text-blue-900 bg-white"
            />
          </div>

          {/* Mode of Meeting */}
          <div>
            <Label htmlFor="mode" className="block py-2 font-medium text-blue-800">
              Mode of Meeting
            </Label>
            <Select value={form.mode} onValueChange={val => handleChange("mode", val)}>
              <SelectTrigger
                id="mode"
                className="w-full border border-gray-700 focus:border-gray-900 focus:ring-2 focus:ring-gray-300 rounded-md py-2 px-3 bg-white text-blue-900"
              >
                <SelectValue placeholder="Select mode" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Online">Online</SelectItem>
                <SelectItem value="In-Person">In-Person</SelectItem>
                <SelectItem value="Hybrid">Hybrid</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Date and Time */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="startDate" className="block py-2 font-medium text-blue-800">
                Start Date
              </Label>
              <Input
                id="startDate"
                type="date"
                value={form.startDate}
                onChange={e => handleChange("startDate", e.target.value)}
                className="input-icons w-full border border-gray-700 focus:border-gray-900 focus:ring-2 focus:ring-gray-300 rounded-md py-2 px-3 text-blue-900 bg-white"
              />
            </div>
            <div>
              <Label htmlFor="startTime" className="block py-2 font-medium text-blue-800">
                Start Time
              </Label>
              <Input
                id="startTime"
                type="time"
                value={form.startTime}
                onChange={e => handleChange("startTime", e.target.value)}
                className="input-icons w-full border border-gray-700 focus:border-gray-900 focus:ring-2 focus:ring-gray-300 rounded-md py-2 px-3 text-blue-900 bg-white"
              />
            </div>
            <div>
              <Label htmlFor="endDate" className="block py-2 font-medium text-blue-800">
                End Date
              </Label>
              <Input
                id="endDate"
                type="date"
                value={form.endDate}
                onChange={e => handleChange("endDate", e.target.value)}
                className="input-icons w-full border border-gray-700 focus:border-gray-900 focus:ring-2 focus:ring-gray-300 rounded-md py-2 px-3 text-blue-900 bg-white"
              />
            </div>
            <div>
              <Label htmlFor="endTime" className="block py-2 font-medium text-blue-800">
                End Time
              </Label>
              <Input
                id="endTime"
                type="time"
                value={form.endTime}
                onChange={e => handleChange("endTime", e.target.value)}
                className="input-icons w-full border border-gray-700 focus:border-gray-900 focus:ring-2 focus:ring-gray-300 rounded-md py-2 px-3 text-blue-900 bg-white"
              />
            </div>
          </div>

          {/* Description (at the end) */}
          <div>
            <Label htmlFor="description" className="block py-2 font-medium text-blue-800">
              Description
            </Label>
            <Input
              as="textarea"
              id="description"
              placeholder="Event details, agenda, or notes..."
              value={form.description}
              onChange={e => handleChange("description", e.target.value)}
              className="w-full min-h-[5rem] max-h-[8rem] border border-gray-700 focus:border-gray-900 focus:ring-2 focus:ring-gray-300 rounded-md py-2 px-3 text-blue-900 bg-white resize-none"
            />
          </div>
        </form>

        {/* Fixed Submit Button */}
        <div className="flex-shrink-0 p-6 border-t border-gray-100 bg-white z-10">
          <Button
            type="submit"
            form="event-form"
            className="w-full text-lg py-3 rounded-lg border border-blue-700 bg-blue-700 hover:bg-blue-800 text-white font-semibold shadow transition"
            onClick={handleSubmit}
            style={{ backgroundColor: "black", color: "white" }}
          >
            Submit Event
          </Button>
        </div>
      </div>
    </div>
  )
}
