import { describe, it, expect, beforeEach } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useDarkMode } from './useDarkMode';

describe('useDarkMode Hook', () => {
  beforeEach(() => {
    localStorage.clear();
    document.documentElement.classList.remove('dark');
  });

  it('toggles dark mode state and updates html class list', () => {
    const { result } = renderHook(() => useDarkMode());

    expect(typeof result.current.isDark).toBe('boolean');

    act(() => {
      result.current.toggleDarkMode();
    });

    if (result.current.isDark) {
      expect(document.documentElement.classList.contains('dark')).toBe(true);
      expect(localStorage.getItem('rotafrete_theme')).toBe('dark');
    } else {
      expect(document.documentElement.classList.contains('dark')).toBe(false);
      expect(localStorage.getItem('rotafrete_theme')).toBe('light');
    }
  });
});
