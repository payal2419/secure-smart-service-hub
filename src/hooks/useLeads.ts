import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export interface Lead {
  id: string;
  name: string;
  mobile: string;
  email: string | null;
  location: string | null;
  service_type: string | null;
  message: string | null;
  status: string;
  admin_notes: string | null;
  created_at: string;
  updated_at: string;
}

export interface CreateLeadInput {
  name: string;
  mobile: string;
  email?: string;
  location?: string;
  service_type?: string;
  message?: string;
}

export function useLeads(filters?: { status?: string; search?: string }) {
  return useQuery({
    queryKey: ["leads", filters],
    queryFn: async () => {
      let query = supabase
        .from("leads")
        .select("*")
        .order("created_at", { ascending: false });

      if (filters?.status && filters.status !== "all") {
        query = query.eq("status", filters.status);
      }

      if (filters?.search) {
        query = query.or(
          `name.ilike.%${filters.search}%,mobile.ilike.%${filters.search}%`
        );
      }

      const { data, error } = await query;
      if (error) throw error;
      return data as Lead[];
    },
  });
}

export function useCreateLead() {
  return useMutation({
    mutationFn: async (input: CreateLeadInput) => {
      const { data, error } = await supabase
        .from("leads")
        .insert({
          name: input.name,
          mobile: input.mobile,
          email: input.email || null,
          location: input.location || null,
          service_type: input.service_type || null,
          message: input.message || null,
          status: "New",
        })
        .select()
        .single();

      if (error) throw error;

      // Trigger email notification (fire and forget)
      try {
        await supabase.functions.invoke("notify-new-lead", {
          body: { leadId: data.id },
        });
      } catch (e) {
        console.warn("Email notification failed:", e);
      }

      return data as Lead;
    },
  });
}

export function useUpdateLead() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      id,
      updates,
    }: {
      id: string;
      updates: Partial<Pick<Lead, "status" | "admin_notes">>;
    }) => {
      const { data, error } = await supabase
        .from("leads")
        .update(updates)
        .eq("id", id)
        .select()
        .single();

      if (error) throw error;
      return data as Lead;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["leads"] });
    },
  });
}

export function useDeleteLead() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from("leads").delete().eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["leads"] });
    },
  });
}
