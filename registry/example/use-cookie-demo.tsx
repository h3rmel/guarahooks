'use client';

import React, { useState } from 'react';

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

import { useCookie } from '@/registry/hooks/use-cookie';

export default function UseCookieDemo() {
  // useCookie hook for a demo cookie
  const [cookieValue, setCookie, removeCookie] = useCookie<string>(
    'demo-cookie',
    'hermione',
  );
  const [input, setInput] = useState('');

  // Handle setting the cookie
  const handleSet = () => {
    setCookie(input, { path: '/' });
  };

  // Handle removing the cookie
  const handleRemove = () => {
    removeCookie();
    setInput('');
  };

  return (
    <Card className="relative max-w-sm w-full">
      <CardHeader>
        <CardTitle>useCookie</CardTitle>
        <CardDescription>
          This component uses the <code>useCookie</code> hook to manage a
          cookie.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <Input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Enter cookie value"
        />
        <pre className="text-sm text-muted-foreground bg-accent w-fit px-1 py-0.5 rounded-xs">
          {cookieValue}
        </pre>
      </CardContent>
      <CardFooter className="flex gap-2">
        <Button onClick={handleSet} variant="secondary">
          Set Cookie
        </Button>
        <Button onClick={handleRemove} variant="destructive">
          Remove Cookie
        </Button>
      </CardFooter>
    </Card>
    // <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-md border border-gray-200">
    //   <h2 className="text-2xl font-bold mb-4 text-gray-800">useCookie Demo</h2>
    //   <div className="mb-4">
    //     <label className="block text-gray-700 mb-1">
    //       Current cookie value:
    //     </label>
    //     <div className="p-2 bg-gray-100 rounded text-gray-900 min-h-[2rem]">
    //       {cookieValue !== undefined ? (
    //         cookieValue
    //       ) : (
    //         <span className="italic text-gray-400">(no value)</span>
    //       )}
    //     </div>
    //   </div>
    //   <div className="mb-4">
    //     <label htmlFor="cookie-input" className="block text-gray-700 mb-1">
    //       Set new value:
    //     </label>
    //     <input
    //       id="cookie-input"
    //       type="text"
    //       value={input}
    //       onChange={(e) => setInput(e.target.value)}
    //       className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
    //       placeholder="Enter cookie value"
    //     />
    //   </div>
    //   <div className="flex gap-2">
    //     <button
    //       onClick={handleSet}
    //       className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
    //     >
    //       Set Cookie
    //     </button>
    //     <button
    //       onClick={handleRemove}
    //       className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition"
    //     >
    //       Remove Cookie
    //     </button>
    //   </div>
    // </div>
  );
}
