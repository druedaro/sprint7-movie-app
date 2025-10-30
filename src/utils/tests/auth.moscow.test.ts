import { describe, it, expect, vi, beforeEach } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useAuth } from '../../hooks/useAuth';
import { AuthProvider } from '../../auth/AuthProvider';
import { mockUser, ERROR_MESSAGES } from './__mocks__/apiMocks';
import { supabase } from '../../config/supabase';

vi.mock('../../config/supabase');

const mockSignIn = vi.fn();
const mockSignOut = vi.fn();
const mockGetSession = vi.fn();
const mockOnAuthStateChange = vi.fn();

interface SupabaseAuthMock {
  signInWithPassword: typeof mockSignIn;
  signOut: typeof mockSignOut;
  getSession: typeof mockGetSession;
  onAuthStateChange: typeof mockOnAuthStateChange;
}

beforeEach(() => {
  vi.clearAllMocks();
  (supabase as unknown as { auth: SupabaseAuthMock }).auth = {
    signInWithPassword: mockSignIn,
    signOut: mockSignOut,
    getSession: mockGetSession,
    onAuthStateChange: mockOnAuthStateChange,
  };
  mockGetSession.mockResolvedValue({ data: { session: { user: null } } });
  mockOnAuthStateChange.mockReturnValue({ data: { subscription: { unsubscribe: vi.fn() } } });
});

describe('Auth Hook Moscow Method', () => {
  it('Success: Should login successfully', async () => {
    mockSignIn.mockResolvedValue({ data: { user: mockUser }, error: null });
    const { result } = renderHook(() => useAuth(), { wrapper: AuthProvider });

    await act(async () => {
      await result.current.login('david@test.com', '123456');
    });

    expect(result.current.user?.email).toBe(mockUser.email);
    expect(result.current.loading).toBe(false);
  });

  it('Failure: Should handle login error (invalid credentials)', async () => {
    mockSignIn.mockResolvedValue({ data: {}, error: { message: ERROR_MESSAGES.INVALID_CREDENTIALS } });
    const { result } = renderHook(() => useAuth(), { wrapper: AuthProvider });

    await act(async () => {
      try {
        await result.current.login('david@test.com', 'wrongpass');
      } catch (e) {
        expect((e as Error).message).toBe(ERROR_MESSAGES.INVALID_CREDENTIALS);
      }
    });

    expect(result.current.user).toBeNull();
    expect(result.current.loading).toBe(false);
  });

  it('Failure: Should handle login error (network failure)', async () => {
    mockSignIn.mockRejectedValue(new Error(ERROR_MESSAGES.NETWORK_ERROR));
    const { result } = renderHook(() => useAuth(), { wrapper: AuthProvider });

    await act(async () => {
      try {
        await result.current.login('david@test.com', 'any');
      } catch (e) {
        expect((e as Error).message).toBe(ERROR_MESSAGES.NETWORK_ERROR);
      }
    });

    expect(result.current.user).toBeNull();
    expect(result.current.loading).toBe(false);
  });
});