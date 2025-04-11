import { render, screen } from '@testing-library/react';
import ExamplePage from '../pages/ExamplePage';
import axios from 'axios';

jest.mock('axios');
describe('ExamplePage', () => {
  it('renders DB health status from API', async () => {
    // Mock the API response
    axios.get.mockResolvedValueOnce({
      data: {
        status: 'OK',
        time: '2025-04-10T10:00:00Z'
      }
    });

    render(<ExamplePage />);

    // Loading state shown initially
    expect(screen.getByRole('progressbar')).toBeInTheDocument();

    // Wait for DB status to show up
    await screen.findByText(/Database Status: OK/i);

    // Server time should also be shown
    expect(screen.getByText(/Server Time:/i)).toBeInTheDocument();
  });

  it('shows error when API call fails', async () => {
    axios.get.mockRejectedValueOnce(new Error('API error'));

    render(<ExamplePage />);

    await screen.findByText(/Failed to connect/i);
  });
});
