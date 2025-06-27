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

import { useReactHookForm } from '@/registry/hooks/use-react-hook-form';

export default function UseReactHookFormDemo() {
  const {
    register,
    onSubmit,
    formState: { errors },
  } = useReactHookForm<{ firstName: string; lastName: string }>({
    defaultValues: { firstName: '', lastName: '' },
  });

  const handleFormSubmit = (data: { firstName: string; lastName: string }) => {
    console.log('Form Data:', data);
    toast.success(`Hello, ${data.firstName} ${data.lastName}!`);
  };

  return (
    <Card className="max-w-md w-full">
      <CardHeader>
        <CardTitle>useReactHookForm</CardTitle>
        <CardDescription>Simplified React Hook Form usage</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid gap-2">
          <Label htmlFor="firstName">First Name</Label>
          <Input
            id="firstName"
            {...register('firstName', { required: 'First name is required' })}
          />
          {errors.firstName && (
            <p className="text-destructive">{errors.firstName.message}</p>
          )}
        </div>
        <div className="grid gap-2">
          <Label htmlFor="lastName">Last Name</Label>
          <Input
            id="lastName"
            {...register('lastName', { required: 'Last name is required' })}
          />
          {errors.lastName && (
            <p className="text-destructive">{errors.lastName.message}</p>
          )}
        </div>
      </CardContent>
      <CardFooter>
        <Button onClick={onSubmit(handleFormSubmit)} className="w-full">
          Submit
        </Button>
      </CardFooter>
    </Card>
  );
}
