'use client';

import { useCallback, useEffect } from 'react';

import { FormikConfig, FormikHelpers, FormikValues, useFormik } from 'formik';

/**
 * Extended Formik return type with a simplified onSubmit handler.
 */
export type UseFormikReturn<T extends FormikValues> = ReturnType<
  typeof useFormik<T>
> & {
  /**
   * Returns a memoized submit handler that wraps Formik's handleSubmit.
   *
   * @param handler Function called when the form is submitted.
   */
  onSubmit: (
    handler: (
      values: T,
      formikHelpers: FormikHelpers<T>,
    ) => void | Promise<void>,
  ) => (e?: React.FormEvent<HTMLFormElement>) => void;
};

/**
 * Custom hook wrapping Formik's useFormik, providing a simplified onSubmit handler
 * and optional debug logging of form state changes.
 *
 * @param config Formik configuration options.
 * @returns Form methods and a memoized onSubmit helper.
 */
export function useFormikHook<T extends FormikValues = FormikValues>(
  config: FormikConfig<T>,
): UseFormikReturn<T> {
  const formik = useFormik<T>(config);

  const handleSubmit = useCallback(
    (
      handler: (
        values: T,
        formikHelpers: FormikHelpers<T>,
      ) => void | Promise<void>,
    ) => {
      return (e?: React.FormEvent<HTMLFormElement>) => {
        e?.preventDefault();
        handler(formik.values, formik);
      };
    },
    [formik],
  );

  // Debug: Log form values and errors in development mode
  useEffect(() => {
    if (process.env.NODE_ENV === 'development') {
      console.debug('[useFormikHook] values:', formik.values);
      console.debug('[useFormikHook] errors:', formik.errors);
    }
  }, [formik.values, formik.errors]);

  return { ...formik, onSubmit: handleSubmit };
}
