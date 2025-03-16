import React, { createContext, useContext, useEffect, useState } from "react";
import { supabase } from "../lib/supabase";

const AuthContext = createContext<any>(null);

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<any>(null);
  const [profile, setProfile] = useState<any>(null)
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const nigga = async () => {
      const session = await supabase.auth.getSession();

      setUser(session?.data?.session ?? null);

      const q = (await supabase.from("profiles").select("*")).data;
      setProfile(q?.[0] )
    };

    nigga().finally(() => setLoading(false));

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, []);

  console.log(user);

  const value = {
    user,
    profile,
    loading,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};
