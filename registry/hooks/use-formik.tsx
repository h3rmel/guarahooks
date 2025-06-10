'use client';

import { useCallback } from 'react';

import { FormikConfig, FormikHelpers, FormikValues, useFormik } from 'formik';

export type UseFormikReturn<T extends FormikValues> = ReturnType<
  typeof useFormik<T>
> & {
  onSubmit: (
    handler: FormikConfig<T>['onSubmit'],
  ) => (e?: React.FormEvent<HTMLFormElement>) => void;
};

export function useFormikHook<T extends FormikValues>(
  config: FormikConfig<T>,
): UseFormikReturn<T> {
  const formik = useFormik<T>(config);

  const onSubmit = useCallback(
    (handler: FormikConfig<T>['onSubmit']) => formik.handleSubmit(handler),
    [formik],
  );

  return { ...formik, onSubmit } as UseFormikReturn<T>;
}
