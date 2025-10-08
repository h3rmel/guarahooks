'use client';

import { useCallback, useEffect } from 'react';

import {
  FieldValues,
  SubmitErrorHandler,
  SubmitHandler,
  useForm,
  UseFormProps,
  UseFormReturn,
} from 'react-hook-form';

/**
 * Extended React Hook Form return type with a simplified onSubmit handler.
 */
export interface UseReactHookFormReturn<T extends FieldValues>
  extends UseFormReturn<T> {
  /**
   * Returns a memoized submit handler that wraps React Hook Form's handleSubmit.
   *
   * @param onValid Function called when the form is valid.
   * @param onInvalid Optional function called on validation errors.
   */
  onSubmit: (
    onValid: SubmitHandler<T>,
    onInvalid?: SubmitErrorHandler<T>,
  ) => (e?: React.BaseSyntheticEvent) => Promise<void>;
}

/**
 * Custom hook wrapping React Hook Form's useForm, providing a simplified onSubmit handler
 * and optional debug logging of form state changes.
 *
 * @param options React Hook Form options.
 * @returns Form methods and a memoized onSubmit helper.
 */
export function useReactHookForm<T extends FieldValues = FieldValues>(
  options?: UseFormProps<T>,
): UseReactHookFormReturn<T> {
  const methods = useForm<T>(options);
  const { handleSubmit, formState } = methods;

  const onSubmit = useCallback(
    (onValid: SubmitHandler<T>, onInvalid?: SubmitErrorHandler<T>) =>
      handleSubmit(onValid, onInvalid),
    [handleSubmit],
  );

  // Debug: Log form state changes in development mode
  useEffect(() => {
    if (process.env.NODE_ENV === 'development') {
      console.debug('[useReactHookForm] formState changed:', formState);
    }
  }, [formState]);

  return { ...methods, onSubmit };
}
