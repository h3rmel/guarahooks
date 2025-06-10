'use client';

import { useCallback } from 'react';

import {
  FieldValues,
  SubmitHandler,
  useForm,
  UseFormProps,
  UseFormReturn,
} from 'react-hook-form';

export type UseReactHookFormReturn<T extends FieldValues> = UseFormReturn<T> & {
  onSubmit: (
    handler: SubmitHandler<T>,
  ) => (e?: React.BaseSyntheticEvent) => Promise<void>;
};

export function useReactHookForm<T extends FieldValues>(
  options?: UseFormProps<T>,
): UseReactHookFormReturn<T> {
  const methods = useForm<T>(options);

  const onSubmit = useCallback(
    (handler: SubmitHandler<T>) => methods.handleSubmit(handler),
    [methods],
  );

  return { ...methods, onSubmit };
}
