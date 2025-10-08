import { useMemo } from 'react';

export enum OS {
  Undetermined = 'undetermined',
  MacOS = 'macos',
  IOS = 'ios',
  Windows = 'windows',
  Android = 'android',
  Linux = 'linux',
}

const macosPattern = /(Macintosh)|(MacIntel)|(MacPPC)|(Mac68K)/i;
const iosPattern = /(iPhone)|(iPad)|(iPod)/i;
const windowsPattern = /(Win32)|(Win64)|(Windows)|(WinCE)|(Windows)/i;
const androidPattern = /Android/i;
const linuxPattern = /Linux/i;

function detectOS(userAgent: string): OS {
  if (
    iosPattern.test(userAgent) ||
    (macosPattern.test(userAgent) &&
      typeof document !== 'undefined' &&
      'ontouchend' in document)
  ) {
    return OS.IOS;
  }
  if (macosPattern.test(userAgent)) {
    return OS.MacOS;
  }
  if (windowsPattern.test(userAgent)) {
    return OS.Windows;
  }
  if (androidPattern.test(userAgent)) {
    return OS.Android;
  }
  if (linuxPattern.test(userAgent)) {
    return OS.Linux;
  }
  return OS.Undetermined;
}

export function useOS(): OS {
  return useMemo(() => {
    if (typeof window === 'undefined' || typeof navigator === 'undefined') {
      return OS.Undetermined;
    }
    return detectOS(navigator.userAgent);
  }, []);
}
