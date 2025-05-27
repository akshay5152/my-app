import React from 'react';
import { describe, test, expect, vi } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { BrowserRouter } from 'react-router-dom';
import Calendar from './Calendar';

// Mock UI components
vi.mock('@/components/ui/dialog', () => ({
  Dialog: ({ children, open, onOpenChange }) => (
    <div data-testid="dialog-root" data-state={open ? 'open' : 'closed'}>
      {children}
    </div>
  ),
  DialogTrigger: ({ children, asChild }) => {
    const content = asChild ? children : <button>{children}</button>;
    return <div data-testid="dialog-trigger">{content}</div>;
  },
  DialogContent: ({ children, className }) => (
    <div data-testid="dialog-content" className={className}>
      {children}
    </div>
  )
}));

// Mock UI components
vi.mock('@/components/ui/select', () => ({
  Select: ({ children, onValueChange }) => (
    <div data-testid="select-root" onChange={e => onValueChange?.(e.target.value)}>
      {children}
    </div>
  ),
  SelectTrigger: ({ children, className }) => (
    <button data-testid="select-trigger" role="combobox" className={className}>
      {children}
    </button>
  ),
  SelectValue: ({ placeholder }) => <span data-testid="select-value">{placeholder}</span>,
  SelectContent: ({ children }) => <div data-testid="select-content">{children}</div>,
  SelectItem: ({ children, value }) => (
    <div 
      data-testid="select-item" 
      role="option" 
      data-value={value}
      onClick={() => {
        const event = new Event('change');
        event.target = { value };
        event.currentTarget = { value };
        event.target.value = value;
        event.currentTarget.value = value;
        event.target.parentElement?.dispatchEvent(event);
      }}
    >
      {children}
    </div>
  )
}));

// Mock CalendarForm and TodoForm components
vi.mock('./calendarForm.jsx', () => ({
  default: ({ events, setEvents, onClose }) => (
    <div data-testid="calendar-form">
      <h2>Create Event</h2>
      <form onSubmit={(e) => {
        e.preventDefault();
        setEvents([...events, {
          eventName: 'Test Event',
          eventType: 'Meeting',
          startDate: '2024-03-20',
          endDate: '2024-03-21',
          description: 'Test Description'
        }]);
        onClose();
      }}>
        <button type="submit">Submit</button>
      </form>
    </div>
  )
}));

vi.mock('./todoForm.jsx', () => ({
  default: ({ todos, setTodos, onAddTodo, onClose }) => (
    <div data-testid="todo-form">
      <h2>Create Todo</h2>
      <form onSubmit={(e) => {
        e.preventDefault();
        const newTodo = {
          taskName: 'Test Task',
          priority: 'High',
          status: 'Open',
          dueDate: '2024-03-20'
        };
        onAddTodo(newTodo);
        onClose();
      }}>
        <button type="submit">Submit</button>
      </form>
    </div>
  )
}));

// Mock Radix UI Dialog components
vi.mock('@radix-ui/react-dialog', () => ({
  Root: ({ children, open, onOpenChange }) => {
    return (
      <div data-testid="dialog-root" data-state={open ? 'open' : 'closed'} onClick={() => onOpenChange?.(!open)}>
        {children}
      </div>
    );
  },
  Trigger: ({ children, asChild }) => {
    const content = asChild ? children : <button>{children}</button>;
    return <div data-testid="dialog-trigger">{content}</div>;
  },
  Portal: ({ children }) => <div data-testid="dialog-portal">{children}</div>,
  Content: ({ children, className }) => (
    <div data-testid="dialog-content" className={className}>
      {children}
    </div>
  ),
  Close: ({ children }) => (
    <button data-testid="dialog-close" aria-label="Close">
      <div data-testid="x-icon" />
      <span className="sr-only">Close</span>
    </button>
  ),
  Title: ({ children }) => <h2 data-testid="dialog-title">{children}</h2>,
  Description: ({ children }) => <p data-testid="dialog-description">{children}</p>,
  Overlay: ({ className }) => (
    <div data-testid="dialog-overlay" className={className} />
  )
}));

// Mock Radix UI Label components
vi.mock('../src/components/ui/label', () => ({
  Label: ({ children }) => <label>{children}</label>
}));

// Mock Lucide icons
vi.mock('lucide-react', () => ({
  Plus: () => <div data-testid="plus-icon" />,
  Edit2: () => <div data-testid="edit-icon" />,
  XIcon: () => <div data-testid="x-icon" />,
  ChevronDown: () => <div data-testid="chevron-down-icon" />,
  ChevronUp: () => <div data-testid="chevron-up-icon" />,
  Check: () => <div data-testid="check-icon" />
}));

// Mock react-day-picker
vi.mock('react-day-picker', () => ({
  DayPicker: ({ children }) => <div data-testid="day-picker">{children}</div>
}));

vi.mock('../src/components/ui/button', () => ({
  Button: ({ children, type, form, onClick, 'data-testid': testId }) => (
    <button 
      type={type} 
      form={form} 
      data-testid={testId} 
      onClick={e => {
        if (type === 'submit') {
          e.preventDefault();
          const submitEvent = new Event('submit', { bubbles: true, cancelable: true });
          e.target.form.dispatchEvent(submitEvent);
        }
        if (onClick) onClick(e);
      }}
    >
      {children}
    </button>
  )
}));

describe('Calendar Component', () => {
  // Mock data
  const mockEvent = {
    eventName: 'Test Event',
    eventType: 'Meeting',
    startDate: '2024-03-20',
    endDate: '2024-03-21',
    description: 'Test Description'
  };

  const mockTodo = {
    taskName: 'Test Task',
    priority: 'High',
    status: 'Open',
    dueDate: '2024-03-20'
  };

  const renderWithRouter = (component) => {
    return render(
      <BrowserRouter>
        {component}
      </BrowserRouter>
    );
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  // Render Tests
  describe('Rendering', () => {
    test('renders calendar view by default', () => {
      renderWithRouter(<Calendar />);
      expect(screen.getByRole('heading', { name: /calendar/i })).toBeInTheDocument();
      expect(screen.getByTestId('todo-tab')).toBeInTheDocument();
      expect(screen.getByTestId('add-event-button')).toBeInTheDocument();
    });

    test('renders empty state messages correctly', async () => {
      renderWithRouter(<Calendar />);
      await waitFor(() => {
        expect(screen.getByTestId('empty-events-message')).toBeInTheDocument();
      });
    });

    test('renders calendar header', () => {
      renderWithRouter(<Calendar />);
      expect(screen.getByRole('heading', { name: /calendar/i })).toBeInTheDocument();
    });
  });

  // Interaction Tests
  describe('Interactions', () => {
    test('switches between calendar and todo views', async () => {
      const user = userEvent.setup();
      renderWithRouter(<Calendar />);
      
      // Initial state should be calendar view
      const todoButton = screen.getByTestId('todo-tab');
      await user.click(todoButton);
      
      // Should now show Add To Do button
      await waitFor(() => {
        expect(screen.getByTestId('add-todo-button')).toBeInTheDocument();
      });
      
      // Switch back to calendar view
      const calendarButton = screen.getByTestId('calendar-tab');
      await user.click(calendarButton);
      
      // Should show Add Event button
      await waitFor(() => {
        expect(screen.getByTestId('add-event-button')).toBeInTheDocument();
      });
    });

    test('opens dialog when add button is clicked', async () => {
      const user = userEvent.setup();
      renderWithRouter(<Calendar />);
      
      const addButton = screen.getByTestId('add-event-button');
      await user.click(addButton);
      
      await waitFor(() => {
        expect(screen.getByText(/create event/i)).toBeInTheDocument();
      });
    });
  });

  // Events List
  describe('Events List', () => {
    test('renders events table when events exist', async () => {
      renderWithRouter(<Calendar initialEvents={[mockEvent]} />);
      
      await waitFor(() => {
        const eventNameCell = screen.getByTestId(`event-name-${mockEvent.eventName}`);
        const eventTypeCell = screen.getByTestId(`event-type-${mockEvent.eventType}`);
        expect(eventNameCell).toHaveTextContent(mockEvent.eventName);
        expect(eventTypeCell).toHaveTextContent(mockEvent.eventType);
      });
    });
  });

  // Todo List
  describe('Todo List', () => {
    test('renders todos table when todos exist', async () => {
      const user = userEvent.setup();
      renderWithRouter(<Calendar initialTodos={[mockTodo]} />);
      
      // Switch to todo view
      const todoTab = screen.getByTestId('todo-tab');
      await user.click(todoTab);
      
      await waitFor(() => {
        const todoNameCell = screen.getByTestId(`todo-name-${mockTodo.taskName}`);
        expect(todoNameCell).toHaveTextContent(mockTodo.taskName);
        expect(screen.getByText(mockTodo.priority)).toBeInTheDocument();
      });
    });
  });

  // Accessibility
  describe('Accessibility', () => {
    test('add button has correct aria-label', async () => {
      const user = userEvent.setup();
      renderWithRouter(<Calendar />);
      
      expect(screen.getByTestId('add-event-button')).toHaveAttribute('aria-label', 'Add Event');
      
      // Switch to todo view
      await user.click(screen.getByTestId('todo-tab'));
      
      await waitFor(() => {
        expect(screen.getByTestId('add-todo-button')).toHaveAttribute('aria-label', 'Add To Do');
      });
    });

    test('dialog close button has correct aria-label', () => {
      renderWithRouter(<Calendar />);
      userEvent.click(screen.getByTestId('add-event-button'));
      
      const closeButtons = screen.getAllByRole('button', { name: /close/i });
      expect(closeButtons[0]).toHaveAttribute('aria-label', 'Close');
    });
  });
}); 