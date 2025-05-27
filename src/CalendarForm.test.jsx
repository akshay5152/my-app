import { describe, test, expect, vi, beforeEach } from 'vitest';
import React from 'react';
import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import CalendarForm from './CalendarForm';

// Mock UI components
vi.mock('@/components/ui/select', () => ({
  Select: ({ children, onValueChange, value }) => {
    const handleSelect = (selectedValue) => {
      if (onValueChange) {
        onValueChange(selectedValue);
      }
    };

    return React.Children.map(children, child => {
      if (child.type.name === 'SelectTrigger') {
        return React.cloneElement(child, {
          'data-testid': child.props['data-testid'],
          children: React.Children.map(child.props.children, triggerChild => {
            if (triggerChild.type.name === 'SelectValue') {
              return React.cloneElement(triggerChild, {
                'data-testid': child.props.id ? `select-value-${child.props.id}` : triggerChild.props['data-testid'],
                children: value || triggerChild.props.placeholder
              });
            }
            return triggerChild;
          })
        });
      }
      if (child.type.name === 'SelectContent') {
        return React.cloneElement(child, {
          children: React.Children.map(child.props.children, contentChild => {
            if (contentChild.type.name === 'SelectItem') {
              return React.cloneElement(contentChild, {
                'data-testid': contentChild.props['data-testid'],
                onClick: () => handleSelect(contentChild.props.value)
              });
            }
            return contentChild;
          })
        });
      }
      return child;
    });
  },
  SelectTrigger: ({ children, 'aria-label': ariaLabel, 'data-testid': testId, id }) => (
    <button data-testid={testId} role="combobox" aria-label={ariaLabel} id={id}>
      {children}
    </button>
  ),
  SelectValue: ({ placeholder, children, 'data-testid': testId }) => (
    <span data-testid={testId}>
      {children || placeholder}
    </span>
  ),
  SelectContent: ({ children }) => (
    <div>
      {children}
    </div>
  ),
  SelectItem: ({ children, value, onClick, 'data-testid': testId }) => (
    <div 
      data-testid={testId}
      role="option" 
      data-value={value}
      onClick={onClick}
    >
      {children}
    </div>
  )
}));

// Mock Button component
vi.mock('@/components/ui/button', () => ({
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

describe('CalendarForm Component', () => {
  const mockSetEvents = vi.fn();

  beforeEach(() => {
    mockSetEvents.mockClear();
  });

  test('updates event type when selected', async () => {
    render(<CalendarForm events={[]} setEvents={mockSetEvents} />);
    
    const eventTypeSelect = screen.getByTestId('event-type-select');
    await userEvent.click(eventTypeSelect);
    
    await userEvent.click(screen.getByTestId('event-type-option-meeting'));
    
    await waitFor(() => {
      expect(screen.getByTestId('select-value-eventType')).toHaveTextContent('Meeting');
    });
  });

  test('submits form with valid data', async () => {
    const newEvent = {
      eventName: 'Test Event',
      eventType: 'Meeting',
      mode: 'Online',
      startDate: '2024-12-31',
      endDate: '2024-12-31',
      startTime: '',
      endTime: '',
      description: ''
    };

    render(<CalendarForm events={[]} setEvents={mockSetEvents} />);
    
    // Fill in form fields
    await userEvent.type(screen.getByTestId('event-name-input'), newEvent.eventName);
    
    // Set event type
    const eventTypeSelect = screen.getByTestId('event-type-select');
    await userEvent.click(eventTypeSelect);
    await userEvent.click(screen.getByTestId('event-type-option-meeting'));
    
    // Set mode
    const modeSelect = screen.getByTestId('mode-select');
    await userEvent.click(modeSelect);
    await userEvent.click(screen.getByTestId('mode-option-online'));
    
    // Set dates
    const startDateInput = screen.getByTestId('start-date-input');
    await userEvent.clear(startDateInput);
    await userEvent.type(startDateInput, newEvent.startDate);
    
    const endDateInput = screen.getByTestId('end-date-input');
    await userEvent.clear(endDateInput);
    await userEvent.type(endDateInput, newEvent.endDate);
    
    // Submit form
    const submitButton = screen.getByRole('button', { type: 'submit' });
    await userEvent.click(submitButton);
    
    await waitFor(() => {
      expect(mockSetEvents).toHaveBeenCalledWith(expect.any(Function));
      const setEventsCallback = mockSetEvents.mock.calls[0][0];
      const result = setEventsCallback([]);
      expect(result).toEqual([newEvent]);
    });
  });
}); 