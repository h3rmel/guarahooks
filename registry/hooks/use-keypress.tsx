'use client';

import { useCallback, useEffect, useMemo, useRef } from 'react';

interface UseKeyboardOptions {
  combo: string | string[];
  callback: (event: KeyboardEvent) => void;
  preventDefault?: boolean;
  target?: HTMLElement | null;
}

function normalizeCombo(combo: string): string {
  const parts = combo
    .toLowerCase()
    .split('+')
    .map((p) => p.trim());

  const modifiers = ['ctrl', 'alt', 'shift', 'meta'];
  const keys: string[] = [];
  const mods: string[] = [];

  for (const part of parts) {
    if (modifiers.includes(part)) {
      mods.push(part);
    } else {
      keys.push(part);
    }
  }

  // Sort modifiers for consistent comparison
  mods.sort((a, b) => modifiers.indexOf(a) - modifiers.indexOf(b));
  return [...mods, ...keys].join('+');
}

function eventMatchesCombo(
  event: KeyboardEvent,
  normalizedCombo: string,
): boolean {
  const modifiers = ['ctrl', 'alt', 'shift', 'meta'];
  const eventMods = [
    event.ctrlKey ? 'ctrl' : null,
    event.altKey ? 'alt' : null,
    event.shiftKey ? 'shift' : null,
    event.metaKey ? 'meta' : null,
  ].filter(Boolean) as string[];

  const key = event.key.toLowerCase();
  const comboParts = normalizedCombo.split('+');
  const comboMods = comboParts.filter((p) => modifiers.includes(p));
  const comboKey = comboParts.find((p) => !modifiers.includes(p));

  // All modifiers in combo must be pressed
  if (comboMods.length !== eventMods.length) return false;

  for (const mod of comboMods) {
    if (!eventMods.includes(mod)) return false;
  }

  // Key must match
  return key === comboKey;
}

export function useKeypress({
  combo,
  callback,
  preventDefault = false,
  target,
}: UseKeyboardOptions) {
  const callbackRef = useRef(callback);

  useEffect(() => {
    callbackRef.current = callback;
  }, [callback]);

  // Memoize normalized combos for performance
  const normalizedCombos = useMemo(() => {
    const combos = Array.isArray(combo) ? combo : [combo];
    return combos.map(normalizeCombo);
  }, [combo]);

  // Memoize handler to avoid unnecessary re-attachments
  const handler = useCallback(
    (event: Event) => {
      const keyboardEvent = event as KeyboardEvent;
      for (const normCombo of normalizedCombos) {
        if (eventMatchesCombo(keyboardEvent, normCombo)) {
          if (preventDefault) keyboardEvent.preventDefault();
          callbackRef.current(keyboardEvent);
          break;
        }
      }
    },
    [normalizedCombos, preventDefault],
  );

  useEffect(() => {
    const el = target ?? window;
    el.addEventListener('keydown', handler);
    return () => {
      el.removeEventListener('keydown', handler);
    };
  }, [handler, target]);
}
