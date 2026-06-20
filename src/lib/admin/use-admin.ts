import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";

export type AdminState = {
  loading: boolean;
  userId: string | null;
  email: string | null;
  isAdmin: boolean;
};

export function useAdminAuth(): AdminState {
  const [state, setState] = useState<AdminState>({
    loading: true,
    userId: null,
    email: null,
    isAdmin: false,
  });

  useEffect(() => {
    let mounted = true;
    async function load() {
      const { data: userRes } = await supabase.auth.getUser();
      const user = userRes.user;
      if (!user) {
        if (mounted) setState({ loading: false, userId: null, email: null, isAdmin: false });
        return;
      }
      const { data: roles } = await supabase
        .from("user_roles")
        .select("role")
        .eq("user_id", user.id);
      const isAdmin = !!roles?.some((r) => r.role === "admin");
      if (mounted)
        setState({
          loading: false,
          userId: user.id,
          email: user.email ?? null,
          isAdmin,
        });
    }
    load();
    const { data: sub } = supabase.auth.onAuthStateChange(() => load());
    return () => {
      mounted = false;
      sub.subscription.unsubscribe();
    };
  }, []);

  return state;
}
