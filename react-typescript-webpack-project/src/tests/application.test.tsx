import 'jest';
import { render, fireEvent, waitFor, screen } from '@testing-library/react';
import { App } from '../App';

// TODO: https://app.pluralsight.com/course-player?clipId=c3bc0e12-58d2-4e5e-9cd4-54a705f3f359
describe('App', () => {
  it('should render correct heading on start', () => {
    const root = render(<App />);

    expect(root.queryByText(/React available also for/i)).not.toBeNull();
    expect(root.queryByText(/React available also for/i)).toBeTruthy();
  });

  it('should render click button with value 0 on start', () => {
    const root = render(<App />);

    expect(root.queryByText(/click: 0/i)).not.toBeNull();
    expect(root.queryByText(/click: 0/i)).toBeTruthy();
  });
});