
-- Create table for storing Facebook lead integration settings
CREATE TABLE public.facebook_lead_integration (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  page_id TEXT NOT NULL,
  page_name TEXT NOT NULL,
  access_token TEXT NOT NULL,
  webhook_verify_token TEXT NOT NULL,
  is_active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create table for lead distribution rules
CREATE TABLE public.lead_distribution_rules (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  source TEXT, -- facebook, website, linkedin, etc.
  priority INTEGER NOT NULL DEFAULT 1,
  distribution_type TEXT NOT NULL DEFAULT 'round_robin', -- round_robin, weighted, manual
  is_active BOOLEAN NOT NULL DEFAULT true,
  conditions JSONB DEFAULT '{}', -- conditions for rule matching
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create table for rule assignments (which users/teams get leads)
CREATE TABLE public.rule_assignments (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  rule_id UUID REFERENCES public.lead_distribution_rules(id) ON DELETE CASCADE,
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
  team_id UUID REFERENCES public.teams(id) ON DELETE CASCADE,
  weight INTEGER NOT NULL DEFAULT 1, -- for weighted distribution
  is_active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Add distribution rule tracking to leads table
ALTER TABLE public.leads ADD COLUMN distribution_rule_id UUID REFERENCES public.lead_distribution_rules(id);
ALTER TABLE public.leads ADD COLUMN facebook_lead_id TEXT; -- for tracking Facebook lead IDs

-- Enable RLS on new tables
ALTER TABLE public.facebook_lead_integration ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.lead_distribution_rules ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.rule_assignments ENABLE ROW LEVEL SECURITY;

-- Create RLS policies for facebook_lead_integration
CREATE POLICY "Users can view Facebook integrations" 
  ON public.facebook_lead_integration 
  FOR SELECT 
  USING (true);

CREATE POLICY "Admins can manage Facebook integrations" 
  ON public.facebook_lead_integration 
  FOR ALL 
  USING (
    EXISTS (
      SELECT 1 FROM public.user_roles 
      WHERE user_id = auth.uid() 
      AND role IN ('admin', 'super_admin')
    )
  );

-- Create RLS policies for lead_distribution_rules
CREATE POLICY "Users can view distribution rules" 
  ON public.lead_distribution_rules 
  FOR SELECT 
  USING (true);

CREATE POLICY "Managers can manage distribution rules" 
  ON public.lead_distribution_rules 
  FOR ALL 
  USING (
    EXISTS (
      SELECT 1 FROM public.user_roles 
      WHERE user_id = auth.uid() 
      AND role IN ('admin', 'super_admin', 'manager')
    )
  );

-- Create RLS policies for rule_assignments
CREATE POLICY "Users can view rule assignments" 
  ON public.rule_assignments 
  FOR SELECT 
  USING (true);

CREATE POLICY "Managers can manage rule assignments" 
  ON public.rule_assignments 
  FOR ALL 
  USING (
    EXISTS (
      SELECT 1 FROM public.user_roles 
      WHERE user_id = auth.uid() 
      AND role IN ('admin', 'super_admin', 'manager')
    )
  );
