import { describe, test, expect, vi, beforeEach } from 'vitest';
import React from 'react';
import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import TodoForm from './TodoForm';

// Mock UI components
vi.mock('@/components/ui/select', () => ({
  Select: ({ children, onValueChange, value }) => {
    const handleSelect = (selectedValue) => {
      if (onValueChange) {
        onValueChange(selectedValue);
        // Trigger form change
        const event = new Event('change', { bubbles: true });
        document.querySelector('form').dispatchEvent(event);
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

describe('TodoForm Component', () => {
  const mockSetTodos = vi.fn();

  beforeEach(() => {
    mockSetTodos.mockClear();
  });

  test('updates priority when selected', async () => {
    render(<TodoForm setTodos={mockSetTodos} />);
    
    const prioritySelect = screen.getByTestId('priority-select');
    await userEvent.click(prioritySelect);
    
    const highOption = screen.getByRole('option', { name: /high/i });
    await userEvent.click(highOption);
    
    await waitFor(() => {
      expect(screen.getByTestId('select-value-priority')).toHaveTextContent('High');
    });
  });

  test('submits form with valid data', async () => {
    const user = userEvent.setup();
    render(<TodoForm setTodos={mockSetTodos} />);
    
    // Fill in required fields
    const taskNameInput = screen.getByTestId('task-name-input');
    await user.type(taskNameInput, 'Test Task');
    await waitFor(() => {
      expect(taskNameInput).toHaveValue('Test Task');
    });
    
    // Set priority (required field)
    const prioritySelect = screen.getByTestId('priority-select');
    await user.click(prioritySelect);
    await user.click(screen.getByTestId('priority-option-high'));
    await waitFor(() => {
      expect(screen.getByTestId('select-value-priority')).toHaveTextContent('High');
    });
    
    // Submit form
    const submitButton = screen.getByRole('button', { type: 'submit' });
    await user.click(submitButton);
    
    // Wait for form submission and check the result
    await waitFor(() => {
      expect(mockSetTodos).toHaveBeenCalledTimes(1);
      const setTodosCallback = mockSetTodos.mock.calls[0][0];
      const prevTodos = [];
      const newTodos = setTodosCallback(prevTodos);
      
      expect(newTodos).toHaveLength(1);
      expect(newTodos[0]).toEqual({
        taskName: 'Test Task',
        priority: 'High',
        team: '',
        dueDate: '',
        status: '',
        reminder: '',
        description: ''
      });
    });
  });
});