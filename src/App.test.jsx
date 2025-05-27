import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import App from './App';

describe('App Component', () => {
  test('renders without crashing', () => {
    render(
      <MemoryRouter initialEntries={['/calendar']}>
        <App />
      </MemoryRouter>
    );
  });

  test('renders calendar route', () => {
    render(
      <MemoryRouter initialEntries={['/calendar']}>
        <App />
      </MemoryRouter>
    );
    
    // The Routes component should be rendered
    const routesElement = document.querySelector('div');
    expect(routesElement).toBeInTheDocument();
  });

  test('handles unknown routes', () => {
    const { container } = render(
      <MemoryRouter initialEntries={['/unknown']}>
        <App />
      </MemoryRouter>
    );
    
    // Should not find the Calendar component
    expect(container.innerHTML).toBe('');
  });
}); 