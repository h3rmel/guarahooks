'use client';

import React from 'react';

import { toast } from 'sonner';

import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

import { useFormikHook } from '@/registry/hooks/use-formik';

interface FormValues {
  firstName: string;
  lastName: string;
}

export default function UseFormikDemo() {
  const { values, errors, touched, handleChange, handleBlur, onSubmit } =
    useFormikHook<FormValues>({
      initialValues: { firstName: '', lastName: '' },
      validate: (values) => {
        const errors: Partial<FormValues> = {};

        if (!values.firstName) {
          errors.firstName = 'First name is required';
        }

        if (!values.lastName) {
          errors.lastName = 'Last name is required';
        }

        return errors;
      },
      onSubmit: () => {}, // This will be overridden by our onSubmit handler
    });

  const handleFormSubmit = (data: FormValues) => {
    console.log('Form Data:', data);
    toast.success(`Hello, ${data.firstName} ${data.lastName}!`);
  };

  return (
    <form onSubmit={onSubmit(handleFormSubmit)} className="max-w-md w-full">
      <Card className="w-full">
        <CardHeader>
          <CardTitle>useFormik</CardTitle>
          <CardDescription>
            Simplified Formik usage with validation
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-2">
            <Label htmlFor="firstName">First Name</Label>
            <Input
              id="firstName"
              name="firstName"
              value={values.firstName}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            {touched.firstName && errors.firstName && (
              <p className="text-destructive">{errors.firstName}</p>
            )}
          </div>
          <div className="grid gap-2">
            <Label htmlFor="lastName">Last Name</Label>
            <Input
              id="lastName"
              name="lastName"
              value={values.lastName}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            {touched.lastName && errors.lastName && (
              <p className="text-destructive">{errors.lastName}</p>
            )}
          </div>
        </CardContent>
        <CardFooter>
          <Button type="submit" className="w-full">
            Submit
          </Button>
        </CardFooter>
      </Card>
    </form>
  );
}
