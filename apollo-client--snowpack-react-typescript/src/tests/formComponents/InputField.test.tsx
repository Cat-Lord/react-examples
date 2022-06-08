import InputField from "../../formComponents/InputField"
import { act, create } from 'react-test-renderer';
import { userEvent } from "@testing-library/user-event/dist/types/setup";
import { Button, FormControl, FormErrorMessage, FormLabel } from "@chakra-ui/react";
import React from "react";
import { Form, Formik } from "formik";
import { fireEvent, screen, waitFor } from "@testing-library/react";
import { createRoot } from "react-dom/client";
import { stringify } from "ts-jest";

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

describe('InputField', () => {
  test('input field displays along with a label', () => {
    const labelText = "testing label text";
    const { root } = create(
      <Formik onSubmit={() => { }} initialValues={{ sample: "" }} >
        <Form>
          <InputField name="sample" aria-label={labelText} />
        </Form>
      </Formik >
    );
    expect(root.findByType(FormControl)).toBeTruthy();
    expect(root.findByType(FormControl)).toBeTruthy();
    expect(root.findByType(FormLabel)).toBeTruthy();
  });

  test('input field without aria-label prop displays without a label', () => {
    const { root } = create(
      <Formik onSubmit={() => { }} initialValues={{ sample: "" }} >
        <Form>
          <InputField name="sample" />
        </Form>
      </Formik >
    );
    expect(root.findByType(FormControl)).toBeTruthy();
    expect(root.findByType(FormControl)).toBeTruthy();
    expect(() => root.findByType(FormLabel)).toThrowError(/No instances found .* \"FormLabel\"/);
  });

  test('submit displays error when required input is empty', async () => {
    const validateMock = jest.fn(() => { return { 'sample': 'should not be empty' } });
    const submitMock = jest.fn();

    await act(() => {
      createRoot(container).render(
        <Formik onSubmit={submitMock} validate={validateMock} initialValues={{ sample: "" }} >
          {() => (
            <Form>
              <InputField required name="sample" />
              <Button name="submit-button" type='submit'>Submit</Button>
            </Form>
          )}
        </Formik >
      );
    })

    await act(() => {
      fireEvent.submit(screen.getByRole('button', { name: /submit/i }));
    })

    expect(screen.queryByText("should not be empty")).toBeTruthy();
    expect(validateMock.mock.calls.length).toBe(1);   // validate called and failed
    expect(submitMock.mock.calls.length).toBe(0);     // submit is not called because validate failed
  });

})