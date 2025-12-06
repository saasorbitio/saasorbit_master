import { FormSubmission, FormStats } from '../types';

// Mock form submissions data
export const mockSubmissions: FormSubmission[] = [
  {
    id: '1',
    form_type: 'user',
    data: {
      name: 'John Smith',
      email: 'john.smith@company.com',
      company: 'Tech Solutions Inc',
      role: 'Product Manager',
      team_size: '10-25',
      use_case: 'Looking for analytics tools to track user engagement and conversion rates for our SaaS platform.',
      budget: '$5,000-$10,000'
    },
    created_at: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
    status: 'new',
    notes: ''
  },
  {
    id: '2',
    form_type: 'saas_vendor',
    data: {
      name: 'Sarah Johnson',
      email: 'sarah.j@cloudplatform.io',
      company: 'CloudPlatform Solutions',
      product_name: 'CloudFlow Analytics',
      integration_type: 'API Partnership',
      monthly_users: '50,000+',
      description: 'We provide cloud infrastructure analytics and would like to integrate SaasOrbit for enhanced user behavior tracking.'
    },
    created_at: new Date(Date.now() - 5 * 60 * 60 * 1000).toISOString(),
    status: 'reviewed',
    notes: 'Scheduled integration call for next Tuesday'
  },
  {
    id: '3',
    form_type: 'freelancer',
    data: {
      name: 'Alex Rodriguez',
      email: 'alex.dev@freelancer.com',
      specialization: 'Full-Stack Development',
      experience: '5+ years',
      portfolio: 'https://alexdev.portfolio.com',
      services: ['Web Development', 'Analytics Implementation', 'Dashboard Creation'],
      hourly_rate: '$75-$100',
      availability: 'Available immediately'
    },
    created_at: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
    status: 'new',
    notes: ''
  },
  {
    id: '4',
    form_type: 'media',
    data: {
      name: 'Michael Chen',
      email: 'michael@techjournal.com',
      publication: 'TechJournal Weekly',
      role: 'Senior Technology Reporter',
      audience_size: '250,000 subscribers',
      content_type: 'Product Review',
      deadline: '2025-02-15',
      focus_area: 'SaaS Analytics Tools Comparison'
    },
    created_at: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
    status: 'responded',
    notes: 'Interview scheduled, press kit sent'
  },
  {
    id: '5',
    form_type: 'user',
    data: {
      name: 'Emily Rodriguez',
      email: 'emily.r@designstudio.com',
      company: 'Creative Design Studio',
      role: 'Creative Director',
      team_size: '5-10',
      use_case: 'Need analytics for tracking client website performance and user engagement across multiple projects.',
      budget: '$2,000-$5,000'
    },
    created_at: new Date(Date.now() - 6 * 60 * 60 * 1000).toISOString(),
    status: 'new',
    notes: ''
  },
  {
    id: '6',
    form_type: 'saas_vendor',
    data: {
      name: 'David Park',
      email: 'partnerships@ecommerce.platform',
      company: 'E-commerce Platform Pro',
      product_name: 'ShopFlow Analytics',
      integration_type: 'White-label Solution',
      monthly_users: '100,000+',
      description: 'Leading e-commerce platform seeking to white-label SaasOrbit analytics for our merchant dashboard.'
    },
    created_at: new Date(Date.now() - 12 * 60 * 60 * 1000).toISOString(),
    status: 'reviewed',
    notes: 'High-value partnership opportunity'
  },
  {
    id: '7',
    form_type: 'freelancer',
    data: {
      name: 'Lisa Wang',
      email: 'lisa@digitalmarketing.expert',
      specialization: 'Digital Marketing & Analytics',
      experience: '8+ years',
      portfolio: 'https://lisamarketing.pro',
      services: ['Marketing Analytics', 'Conversion Optimization', 'A/B Testing'],
      hourly_rate: '$100-$150',
      availability: 'Available in 2 weeks'
    },
    created_at: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
    status: 'new',
    notes: ''
  },
  {
    id: '8',
    form_type: 'media',
    data: {
      name: 'Robert Thompson',
      email: 'rob@saasreview.blog',
      publication: 'SaaS Review Blog',
      role: 'Editor-in-Chief',
      audience_size: '150,000 monthly readers',
      content_type: 'Feature Article',
      deadline: '2025-02-28',
      focus_area: 'Emerging Analytics Platforms for Small Business'
    },
    created_at: new Date(Date.now() - 8 * 60 * 60 * 1000).toISOString(),
    status: 'reviewed',
    notes: 'Sent product demo access'
  },
  {
    id: '9',
    form_type: 'user',
    data: {
      name: 'Jennifer Lee',
      email: 'jen@healthtech.startup',
      company: 'HealthTech Innovations',
      role: 'Founder & CEO',
      team_size: '15-25',
      use_case: 'Healthcare SaaS platform needs comprehensive analytics for patient engagement and provider dashboard insights.',
      budget: '$10,000+'
    },
    created_at: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
    status: 'new',
    notes: ''
  },
  {
    id: '10',
    form_type: 'saas_vendor',
    data: {
      name: 'Carlos Martinez',
      email: 'carlos@projectmanagement.tools',
      company: 'ProjectFlow Systems',
      product_name: 'TaskMaster Pro',
      integration_type: 'Plugin Integration',
      monthly_users: '25,000+',
      description: 'Project management platform looking to integrate advanced analytics capabilities for project performance tracking.'
    },
    created_at: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000).toISOString(),
    status: 'new',
    notes: ''
  },
  {
    id: '11',
    form_type: 'freelancer',
    data: {
      name: 'Amanda Foster',
      email: 'amanda@uxdesign.studio',
      specialization: 'UX/UI Design & Research',
      experience: '6+ years',
      portfolio: 'https://amandauxdesign.com',
      services: ['User Research', 'Dashboard Design', 'Analytics UX'],
      hourly_rate: '$85-$120',
      availability: 'Available next month'
    },
    created_at: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
    status: 'reviewed',
    notes: 'Portfolio review completed'
  },
  {
    id: '12',
    form_type: 'media',
    data: {
      name: 'Kevin Zhang',
      email: 'kevin@techpodcast.fm',
      publication: 'Future of SaaS Podcast',
      role: 'Host & Producer',
      audience_size: '75,000 monthly listeners',
      content_type: 'Podcast Interview',
      deadline: '2025-03-10',
      focus_area: 'Innovation in Analytics and Data Visualization'
    },
    created_at: new Date(Date.now() - 6 * 24 * 60 * 60 * 1000).toISOString(),
    status: 'new',
    notes: ''
  }
];

// Calculate stats from mock data
export const calculateStats = (): FormStats[] => {
  const now = new Date();
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
  const monthAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);

  const formTypes = ['user', 'saas_vendor', 'freelancer', 'media'];
  
  return formTypes.map(formType => {
    const submissions = mockSubmissions.filter(s => s.form_type === formType);
    
    return {
      form_type: formType,
      count: submissions.length,
      today_count: submissions.filter(s => new Date(s.created_at) >= today).length,
      week_count: submissions.filter(s => new Date(s.created_at) >= weekAgo).length,
      month_count: submissions.filter(s => new Date(s.created_at) >= monthAgo).length,
    };
  });
};

// Mock database operations
export const mockDatabase = {
  getSubmissions: async (formType?: string) => {
    await new Promise(resolve => setTimeout(resolve, 500)); // Simulate API delay
    
    if (formType) {
      return mockSubmissions.filter(s => s.form_type === formType);
    }
    return mockSubmissions;
  },
  
  updateSubmissionStatus: async (id: string, status: string) => {
    await new Promise(resolve => setTimeout(resolve, 300));
    
    const submission = mockSubmissions.find(s => s.id === id);
    if (submission) {
      submission.status = status as any;
    }
    return { success: true };
  },
  
  addNotes: async (id: string, notes: string) => {
    await new Promise(resolve => setTimeout(resolve, 300));
    
    const submission = mockSubmissions.find(s => s.id === id);
    if (submission) {
      submission.notes = notes;
    }
    return { success: true };
  }
};