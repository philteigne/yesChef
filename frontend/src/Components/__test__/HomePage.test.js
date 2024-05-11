import { render, screen, cleanup } from '@testing-library/react';
import HomePage from '../HomePage';

test('should render HomePage Component', () => {
  render(<HomePage />)
  const appIntroductionDiv = screen.getByTestId('app-intro-div');
  expect(appIntroductionDiv).toBeInTheDocument();
})