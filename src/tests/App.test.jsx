import { describe, it, expect, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import App from '../App';
import { ThemeProvider } from '../context/ThemeContext';
import { LanguageProvider } from '../context/LanguageContext';

function renderApp(initialPath = '/') {
  return render(
    <MemoryRouter initialEntries={[initialPath]}>
      <ThemeProvider>
        <LanguageProvider>
          <App />
        </LanguageProvider>
      </ThemeProvider>
    </MemoryRouter>
  );
}

beforeEach(() => {
  localStorage.clear();
  document.documentElement.className = '';
  document.documentElement.lang = 'en';
  document.documentElement.dir = 'ltr';
});

describe('App', () => {
  it('renders the home route with hero', () => {
    renderApp('/');
    expect(screen.getAllByText(/Specialist Care for/i).length).toBeGreaterThan(0);
  });

  it('navigates to services route', () => {
    renderApp('/services');
    expect(screen.getAllByText(/Medical Services/i).length).toBeGreaterThan(0);
  });

  it('renders empty-state fallbacks on About page', () => {
    renderApp('/about');
    expect(screen.getByText(/Verified qualification details/i)).toBeInTheDocument();
  });

  it('switches language to Dari and sets RTL', () => {
    renderApp('/');
    const langButtons = screen.getAllByLabelText(/Language/i);
    fireEvent.click(langButtons[0]);
    fireEvent.click(screen.getByText('دری'));
    expect(document.documentElement.dir).toBe('rtl');
  });

  it('toggles theme', () => {
    renderApp('/');
    const toggles = screen.getAllByLabelText(/Switch to (light|dark) theme/i);
    fireEvent.click(toggles[0]);
    expect(document.documentElement.classList.contains('dark')).toBe(true);
  });

  it('rejects a past date in the appointment form', () => {
    renderApp('/appointment');
    const dateInput = screen.getByLabelText(/Preferred date/i);
    fireEvent.change(dateInput, { target: { value: '2000-01-01' } });
    fireEvent.click(screen.getByRole('button', { name: /Submit request/i }));
    expect(screen.getAllByText(/Please choose a future date/i).length).toBeGreaterThan(0);
  });

  it('accepts a valid submission and shows demo confirmation', async () => {
    renderApp('/appointment');
    fireEvent.change(screen.getByLabelText(/Patient name/i), { target: { value: 'Test Patient' } });
    fireEvent.change(screen.getByLabelText(/Phone number/i), { target: { value: '+93 70 000 0000' } });
    fireEvent.change(screen.getByLabelText(/Preferred date/i), {
      target: { value: '2099-01-01' },
    });
    fireEvent.click(screen.getByRole('button', { name: /Submit request/i }));
    expect(await screen.findByText(/Demo request submitted/i)).toBeInTheDocument();
    expect(screen.getByText(/No appointment has been booked/i)).toBeInTheDocument();
  });
});