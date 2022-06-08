import App from "../../App";
import { render, screen, waitFor } from '@testing-library/react';
import { act } from 'react-test-renderer';
import { MockedProvider, MockedResponse } from '@apollo/client/testing';
import Home from "../../Home";
import { createRoot } from "react-dom/client";
import { CheckConnectionDocument } from "../../graphql/generated/graphql-gen";
import { GraphQLError } from "graphql";

let container: HTMLDivElement;

beforeAll(() => {
  (globalThis as any).IS_REACT_ACT_ENVIRONMENT = true;
});

beforeEach(() => {
  container = document.createElement('div');
  document.body.appendChild(container);
})

afterEach(() => {
  document.body.removeChild(container);
  container.remove();
})

describe('App', () => {
  test('is not crashing on start', async () => {
    await act(() => {
      createRoot(container).render(
        <MockedProvider>
          <App />
        </MockedProvider>
      )
    })

    expect(screen.queryByText('Home')).toBeTruthy();
  });

  test('should display error when server is not accessible', async () => {
    const mocks: MockedResponse = {
      request: {
        query: CheckConnectionDocument
      },
      result: {
        errors: [new GraphQLError('expected error')]
      }
    };

    await act(() => {
      createRoot(container).render(
        <MockedProvider mocks={[mocks]}>
          <App />
        </MockedProvider>
      )
    })

    expect(screen.queryByText('Server is not accessible')).toBeTruthy();
  });
})

describe('Home', () => {
  test('is not crashing on start', async () => {
    const root = act(() => {
      createRoot(container).render(
        <MockedProvider>
          <Home />
        </MockedProvider>
      )
    });

    await waitFor(() => {
      expect(container).toBeTruthy();
      expect(container.textContent).toContain('Home');
    });
  });
});