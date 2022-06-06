import React from "react";
import { createRoot } from "react-dom/client";
import { act } from "react-dom/test-utils";
import SomePage from "../SomePage";

let container: HTMLDivElement;

beforeEach(() => {
  container = document.createElement('div');
  document.body.appendChild(container);

})
afterEach(() => {
  document.body.removeChild(container);
  container.remove();
})

describe('SomePage', () => {
  const testMessage = "Test Message";

  // traditional API of React components
  test('message is displayed via props and children', () => {
    const page = SomePage({
      message: testMessage
    });

    expect(page).toBeDefined();
    expect(page?.props.children.props.children).toBe(testMessage);
  })

  // ReactTestUtils implementation
  test('message is displayed via act', () => {

    act(() => {
      createRoot(container)
        .render(<SomePage message={testMessage} />);
    })

  })
})