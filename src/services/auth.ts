import { supabase } from "../supabaseClient";
import { AuthError, Session, User } from "@supabase/supabase-js";

export const signup = async (email: string, password: string): Promise<{ user: User | null; session: Session | null }> => {
  const { data, error }: { data: { user: User | null; session: Session | null }, error: AuthError | null } = await supabase.auth.signUp({
    email,
    password,
  });
  if (error) throw error;
  return data;
};

export const login = async (email: string, password: string): Promise<{ user: User | null; session: Session | null }> => {
  const { data, error }: { data: { user: User | null; session: Session | null }, error: AuthError | null } = await supabase.auth.signInWithPassword({
    email,
    password,
  });
  if (error) throw error;
  return data;
};

export const logout = async (): Promise<void> => {
  const { error } = await supabase.auth.signOut();
  if (error) throw error;
};
