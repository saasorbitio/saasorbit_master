// src/services/waitlistService.ts
import { requireSupabase, isSupabaseConfigured } from '../config/supabase';

export interface WaitlistEntry {

  id: string
  name: string;
  email: string;
  company?: string;
  role?: string;
  linkedin?: string;
  // type-specific fields
  productUrl?: string;
  companySize?: string;
  useCase?: string;
  industry?: string;
  services?: string;
  portfolio?: string;
  publication?: string;
  audienceSize?: string;
  contentFocus?: string;
  created_at?: string; // timestamp from DB
  type: 'buyer' | 'vendor' | 'freelancer' | 'media';
}

const API_ENDPOINTS: Record<WaitlistEntry["type"], string> = {
  buyer: "https://form1-l2jvyugjwa-uc.a.run.app",
  vendor: "https://form2-l2jvyugjwa-uc.a.run.app",
  freelancer: "https://form3-l2jvyugjwa-uc.a.run.app",
  media: "https://form4-l2jvyugjwa-uc.a.run.app",
};

const SUCCESS_MESSAGES: Record<WaitlistEntry["type"], string> = {
  buyer: "🎉 Thanks Buyer! You're on the waitlist.",
  vendor: "🚀 Vendor added successfully! We'll contact you soon.",
  freelancer: "💼 Freelancer waitlist success! We'll match you soon.",
  media: "📰 Media partner request received! Thanks for joining.",
};

export async function addToWaitlist(
  entry: WaitlistEntry
): Promise<{ message: string }> {
  const endpoint = API_ENDPOINTS[entry.type];
  if (!endpoint) {
    throw new Error("Invalid user type. No API endpoint available.");
  }

  const response = await fetch(endpoint, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(entry),
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(errorText || "Failed to submit waitlist form");
  }

  // ignore backend message, return friendly text
  return { message: SUCCESS_MESSAGES[entry.type] };
}

export const getWaitlistStats = async () => {
  try {
    if (!isSupabaseConfigured) {
      return {
        total: 0,
        vendor: 0,
        buyer: 0,
        freelancer: 0,
        media: 0,
        recent: 0
      };
    }

    const supabase = requireSupabase();

    const { data, error } = await supabase
      .from('waitlist')
      .select('type, created_at');

    if (error) {
      console.error('❌ Error fetching stats from Supabase:', error);
      throw new Error(`Database error: ${error.message}`);
    }

    const stats = {
      total: data.length,
      vendor: data.filter(entry => entry.type === 'vendor').length,
      buyer: data.filter(entry => entry.type === 'buyer').length,
      freelancer: data.filter(entry => entry.type === 'freelancer').length,
      media: data.filter(entry => entry.type === 'media').length,
      recent: data.filter(entry => {
        const entryDate = new Date(entry.created_at);
        const dayAgo = new Date(Date.now() - 24 * 60 * 60 * 1000);
        return entryDate > dayAgo;
      }).length
    };

    console.log('📈 Database stats:', stats);
    return stats;
  } catch (error) {
    console.error('❌ Error fetching waitlist stats:', error);
    return {
      total: 0,
      vendor: 0,
      buyer: 0,
      freelancer: 0,
      media: 0,
      recent: 0
    };
  }

}

// Query all waitlist entries - REQUIRES Supabase database connection
export const getAllWaitlistEntries = async (): Promise<WaitlistEntry[]> => {
  try {
    if (!isSupabaseConfigured) {
      console.warn('⚠️ Database not connected - no entries available');
      return [];
    }

    const supabase = requireSupabase();

    const { data, error } = await supabase
      .from('waitlist')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('❌ Error fetching from Supabase:', error);
      throw new Error(`Database error: ${error.message}`);
    }

    console.log('📊 Fetched', data.length, 'entries from database');

    // Transform Supabase data to match our interface
    return data.map(item => ({
      id: item.id,
      type: item.type,
      name: item.name,
      email: item.email,
      company: item.company,
      role: item.role,
      linkedin: item.linkedin,
      productUrl: item.product_url,
      companySize: item.company_size,
      useCase: item.use_case,
      industry: item.industry,
      services: item.services,
      portfolio: item.portfolio,
      publication: item.publication,
      audienceSize: item.audience_size,
      contentFocus: item.content_focus,
      status: item.status,
      source: item.source,
      created_at: item.created_at
    }));
  } catch (error) {
    console.error('❌ Error fetching waitlist entries:', error);
    return [];
  }
};


