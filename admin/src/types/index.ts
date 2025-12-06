export interface FormSubmission {
  id: string;
  form_type: 'user' | 'saas_vendor' | 'freelancer' | 'media';
  data: Record<string, any>;
  created_at: string;
  status: 'new' | 'reviewed' | 'responded' | 'archived';
  notes?: string;
}

export interface FormStats {
  form_type: string;
  count: number;
  today_count: number;
  week_count: number;
  month_count: number;
}

export interface AdminUser {
  id: string;
  email: string;
  created_at: string;
}