import React, { useState } from 'react';
import { Button } from './ui/button';
import { Select } from './ui/select';
import { format } from 'date-fns';
import * as Dialog from '@radix-ui/react-dialog';
import { X } from 'lucide-react';

const Calendar = () => {
  const [view, setView] = useState('calendar'); // 'calendar' or 'todo'
  const [teamView, setTeamView] = useState('self'); // 'self' or 'team'
  const [dialogOpen, setDialogOpen] = useState(false);
  const [events, setEvents] = useState([
    {
      id: 1,
      date: '2024-02-10',
      type: 'ALL DAY',
      title: 'Team Building Activity',
      supervisor: 'Evan Willis',
      name: 'Event Name',
      duration: '20 chr',
      remark: 'This is a sample remark. Some times remarks can be longer text up to 90 characters.'
    },
    {
      id: 2,
      date: '2024-02-10',
      type: 'ALL DAY',
      title: 'Team Building Activity',
      supervisor: 'Evan Willis',
      name: 'Event Name',
      duration: '20 chr',
      remark: 'This is a sample remark. Some times remarks can be longer text up to 90 characters.'
    },
    {
      id: 3,
      date: '2024-02-10',
      type: 'ALL DAY',
      title: 'Team Building Activity',
      supervisor: 'Evan Willis',
      name: 'Event Name',
      duration: '20 chr',
      remark: 'This is a sample remark. Some times remarks can be longer text up to 90 characters.'
    },
    {
      id: 4,
      date: '2024-02-10',
      type: 'ALL DAY',
      title: 'Team Building Activity',
      supervisor: 'Evan Willis',
      name: 'Event Name',
      duration: '20 chr',
      remark: 'This is a sample remark. Some times remarks can be longer text up to 90 characters.'
    }
  ]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const newEvent = {
      id: events.length + 1,
      date: formData.get('date'),
      type: formData.get('type'),
      title: formData.get('title'),
      supervisor: formData.get('supervisor'),
      name: formData.get('name'),
      duration: formData.get('duration'),
      remark: formData.get('remarks')
    };
    setEvents([...events, newEvent]);
    setDialogOpen(false);
  };

  return (
    <div className="p-6 max-w-7xl mx-auto bg-white">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <div className="flex space-x-4">
          <button 
            className={`px-4 py-2 ${view === 'calendar' ? 'text-[#00BCD4] border-b-2 border-[#00BCD4] font-medium' : 'text-gray-500'}`}
            onClick={() => setView('calendar')}
          >
            Calendar
          </button>
          <button 
            className={`px-4 py-2 ${view === 'todo' ? 'text-[#00BCD4] border-b-2 border-[#00BCD4] font-medium' : 'text-gray-500'}`}
            onClick={() => setView('todo')}
          >
            To Do
          </button>
        </div>
      </div>

      {/* Controls */}
      <div className="flex justify-between items-center mb-8">
        <div className="flex space-x-2">
          <Button 
            variant={teamView === 'self' ? 'default' : 'outline'}
            onClick={() => setTeamView('self')}
            className={`flex items-center ${teamView === 'self' ? 'bg-[#00BCD4] text-white' : 'text-gray-700'}`}
          >
            👤 Self
          </Button>
          <Button 
            variant={teamView === 'team' ? 'default' : 'outline'}
            onClick={() => setTeamView('team')}
            className={`flex items-center ${teamView === 'team' ? 'bg-[#00BCD4] text-white' : 'text-gray-700'}`}
          >
            👥 Team
          </Button>
        </div>

        <div className="flex items-center space-x-4">
          <Select defaultValue="From Date">
            <option>From Date</option>
          </Select>
          <Select defaultValue="To Date">
            <option>To Date</option>
          </Select>
          <Dialog.Root open={dialogOpen} onOpenChange={setDialogOpen}>
            <Dialog.Trigger asChild>
              <Button className="bg-[#00BCD4] text-white hover:bg-[#00ACC1] transition-colors">
                EVENT
              </Button>
            </Dialog.Trigger>
            <Dialog.Portal>
              <Dialog.Overlay className="fixed inset-0 bg-black/50 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0" />
              <Dialog.Content className="fixed left-[50%] top-[50%] z-50 w-full max-w-lg translate-x-[-50%] translate-y-[-50%] rounded-lg border border-gray-200 bg-white shadow-lg duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%]">
                <div className="px-6 pt-6 pb-4">
                  <Dialog.Title className="text-xl font-semibold text-gray-900">
                    Create Event
                  </Dialog.Title>
                  <Dialog.Description className="mt-2 text-sm text-gray-500">
                    Add a new event to your calendar
                  </Dialog.Description>
                </div>

                <form onSubmit={handleSubmit}>
                  <div className="px-6 py-2 max-h-[400px] overflow-y-auto">
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <label className="text-sm font-medium leading-none text-gray-700" htmlFor="type">
                          Event Type
                        </label>
                        <select
                          id="type"
                          name="type"
                          className="flex h-10 w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#00BCD4] focus:border-transparent"
                          required
                        >
                          <option value="ALL DAY">All Day</option>
                          <option value="MORNING">Morning</option>
                          <option value="AFTERNOON">Afternoon</option>
                        </select>
                      </div>

                      <div className="space-y-2">
                        <label className="text-sm font-medium leading-none text-gray-700" htmlFor="supervisor">
                          Supervisor
                        </label>
                        <input
                          id="supervisor"
                          name="supervisor"
                          className="flex h-10 w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#00BCD4] focus:border-transparent"
                          placeholder="Enter supervisor name"
                          required
                        />
                      </div>

                      <div className="space-y-2">
                        <label className="text-sm font-medium leading-none text-gray-700" htmlFor="name">
                          Event Name
                        </label>
                        <input
                          id="name"
                          name="name"
                          className="flex h-10 w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#00BCD4] focus:border-transparent"
                          placeholder="Enter event name"
                          required
                        />
                      </div>

                      <div className="space-y-2">
                        <label className="text-sm font-medium leading-none text-gray-700" htmlFor="duration">
                          Duration
                        </label>
                        <input
                          id="duration"
                          name="duration"
                          className="flex h-10 w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#00BCD4] focus:border-transparent"
                          placeholder="Enter duration (e.g., 20 chr)"
                          required
                        />
                      </div>

                      <div className="space-y-2">
                        <label className="text-sm font-medium leading-none text-gray-700" htmlFor="remarks">
                          Remarks
                        </label>
                        <textarea
                          id="remarks"
                          name="remarks"
                          className="flex w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#00BCD4] focus:border-transparent"
                          placeholder="Enter any additional remarks"
                          rows={3}
                        />
                      </div>
                    </div>
                  </div>

                  <div className="px-6 py-4 bg-gray-50 border-t border-gray-100">
                    <div className="flex justify-end space-x-2">
                      <Dialog.Close asChild>
                        <Button variant="outline" className="px-4">Cancel</Button>
                      </Dialog.Close>
                      <Button type="submit" className="bg-[#00BCD4] text-white hover:bg-[#00ACC1] px-4">
                        Create Event
                      </Button>
                    </div>
                  </div>
                </form>

                <Dialog.Close className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-white transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-gray-100">
                  <X className="h-4 w-4" />
                  <span className="sr-only">Close</span>
                </Dialog.Close>
              </Dialog.Content>
            </Dialog.Portal>
          </Dialog.Root>
        </div>
      </div>

      {/* Past Events Notice */}
      <div className="bg-red-50 border border-red-100 rounded-lg p-4 mb-8 flex justify-between items-center">
        <div className="flex items-center text-red-600">
          <span className="mr-2">⚠️</span>
          <span>3 Events From Past</span>
        </div>
        <button className="text-red-600 font-medium hover:text-red-700">SHOW</button>
      </div>

      {/* Events List */}
      <div className="space-y-6">
        <h2 className="font-medium text-gray-900">Upcoming Events</h2>
        {events.map((event) => (
          <div key={event.id} className="flex items-start p-4 border border-gray-200 rounded-lg hover:shadow-md transition-shadow">
            <div className="w-24 text-center">
              <div className="text-sm text-gray-500">{format(new Date(event.date), 'do')}</div>
              <div className="text-sm text-gray-500">{format(new Date(event.date), 'MMM')}</div>
              <div className="text-sm font-medium text-[#00BCD4]">Monday</div>
            </div>
            <div className="flex-1 ml-6">
              <div className="flex items-center mb-2">
                <span className="px-2 py-1 bg-[#E3F2FD] text-[#00BCD4] text-xs rounded mr-3 font-medium">
                  {event.type}
                </span>
                <h3 className="font-medium text-gray-900">{event.title}</h3>
              </div>
              <div className="text-sm text-gray-600 mb-2">
                Event with {event.supervisor} • {event.name} • {event.duration}
              </div>
              <p className="text-sm text-gray-500">{event.remark}</p>
            </div>
            <button className="text-gray-400 hover:text-gray-600 px-2">
              ⋮
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Calendar; 