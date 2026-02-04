import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

interface NotifyRequest {
  leadId: string;
}

const handler = async (req: Request): Promise<Response> => {
  // Handle CORS preflight
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { leadId }: NotifyRequest = await req.json();

    if (!leadId) {
      throw new Error("Missing leadId");
    }

    // Create Supabase client with service role
    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    // Fetch the lead details
    const { data: lead, error: leadError } = await supabase
      .from("leads")
      .select("*")
      .eq("id", leadId)
      .single();

    if (leadError || !lead) {
      throw new Error("Lead not found");
    }

    // Check if RESEND_API_KEY is configured
    const resendApiKey = Deno.env.get("RESEND_API_KEY");
    
    if (!resendApiKey) {
      console.log("RESEND_API_KEY not configured. Skipping email notification.");
      console.log("New lead received:", {
        name: lead.name,
        mobile: lead.mobile,
        email: lead.email,
        service_type: lead.service_type,
        created_at: lead.created_at,
      });
      
      return new Response(
        JSON.stringify({ 
          success: true, 
          message: "Lead logged (email not configured)" 
        }),
        {
          status: 200,
          headers: { "Content-Type": "application/json", ...corsHeaders },
        }
      );
    }

    // Send email notification using Resend
    const adminEmail = Deno.env.get("ADMIN_EMAIL") || "admin@ssksolutionzs.com";
    
    const emailResponse = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${resendApiKey}`,
      },
      body: JSON.stringify({
        from: "SSK Solutionzs <noreply@ssksolutionzs.com>",
        to: [adminEmail],
        subject: `New Lead: ${lead.name} - ${lead.service_type || "General Enquiry"}`,
        html: `
          <h2>New Lead Received</h2>
          <table style="border-collapse: collapse; width: 100%; max-width: 500px;">
            <tr>
              <td style="padding: 8px; border: 1px solid #ddd; font-weight: bold;">Name</td>
              <td style="padding: 8px; border: 1px solid #ddd;">${lead.name}</td>
            </tr>
            <tr>
              <td style="padding: 8px; border: 1px solid #ddd; font-weight: bold;">Mobile</td>
              <td style="padding: 8px; border: 1px solid #ddd;">${lead.mobile}</td>
            </tr>
            <tr>
              <td style="padding: 8px; border: 1px solid #ddd; font-weight: bold;">Email</td>
              <td style="padding: 8px; border: 1px solid #ddd;">${lead.email || "Not provided"}</td>
            </tr>
            <tr>
              <td style="padding: 8px; border: 1px solid #ddd; font-weight: bold;">Location</td>
              <td style="padding: 8px; border: 1px solid #ddd;">${lead.location || "Not provided"}</td>
            </tr>
            <tr>
              <td style="padding: 8px; border: 1px solid #ddd; font-weight: bold;">Service Type</td>
              <td style="padding: 8px; border: 1px solid #ddd;">${lead.service_type || "Not specified"}</td>
            </tr>
            <tr>
              <td style="padding: 8px; border: 1px solid #ddd; font-weight: bold;">Message</td>
              <td style="padding: 8px; border: 1px solid #ddd;">${lead.message || "No message"}</td>
            </tr>
          </table>
          <p style="margin-top: 20px;">
            <a href="${supabaseUrl.replace('.supabase.co', '')}/admin/leads" 
               style="background: #2563eb; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px;">
              View in Admin Dashboard
            </a>
          </p>
        `,
      }),
    });

    if (!emailResponse.ok) {
      const errorText = await emailResponse.text();
      console.error("Resend API error:", errorText);
      throw new Error("Failed to send email");
    }

    console.log("Email notification sent for lead:", leadId);

    return new Response(
      JSON.stringify({ success: true, message: "Email notification sent" }),
      {
        status: 200,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : "Unknown error";
    console.error("Error in notify-new-lead function:", errorMessage);
    
    return new Response(
      JSON.stringify({ error: errorMessage }),
      {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  }
};

serve(handler);
