import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { render, screen, cleanup, fireEvent } from '@testing-library/react';
import matchers from '@testing-library/jest-dom/matchers';
import WorkingSheet from './WorkingSheet'

// extends Vitest's expect method with methods from react-testing-library
expect.extend(matchers);

beforeEach(() => {
  render(<WorkingSheet/>);
});

afterEach(() => {
  cleanup();
});

describe("Moisture App", () => {
  it("Render", () => {
      expect(screen.getByText(/method/i)).toBeInTheDocument();
  });

  it("Calc Material Wet Mass", () => {
      fireEvent.change(screen.getByLabelText(/tare mass/i), {
          target: {
              value: 300,
          },
      });

      fireEvent.change(
          screen.getByLabelText(/tare and material wet mass \(g\)/i),
          {
              target: {
                  value: 2859.6,
              },
          }
      );

      expect(screen.getByTitle(/material wet mass/i)).toHaveTextContent(
          "2559.6"
      );
  });
});
