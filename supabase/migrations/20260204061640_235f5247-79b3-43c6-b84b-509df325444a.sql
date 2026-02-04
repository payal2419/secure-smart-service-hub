-- Create enum for user roles
CREATE TYPE public.app_role AS ENUM ('admin', 'technician', 'customer');

-- Create enum for service request status
CREATE TYPE public.service_status AS ENUM ('pending', 'assigned', 'in_progress', 'completed', 'cancelled');

-- Create enum for AMC status
CREATE TYPE public.amc_status AS ENUM ('active', 'expired', 'cancelled');

-- Create profiles table for basic user info
CREATE TABLE public.profiles (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL UNIQUE,
    full_name TEXT NOT NULL,
    phone TEXT,
    email TEXT,
    avatar_url TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL
);

-- Create user_roles table (separate from profiles for security)
CREATE TABLE public.user_roles (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
    role app_role NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL,
    UNIQUE (user_id, role)
);

-- Create customers table
CREATE TABLE public.customers (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
    full_name TEXT NOT NULL,
    phone TEXT NOT NULL,
    email TEXT,
    address TEXT,
    city TEXT,
    pincode TEXT,
    notes TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL
);

-- Create technicians table
CREATE TABLE public.technicians (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL UNIQUE,
    employee_id TEXT UNIQUE,
    full_name TEXT NOT NULL,
    phone TEXT NOT NULL,
    email TEXT,
    specialization TEXT,
    is_active BOOLEAN DEFAULT true NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL
);

-- Create AMC contracts table
CREATE TABLE public.amc_contracts (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    customer_id UUID REFERENCES public.customers(id) ON DELETE CASCADE NOT NULL,
    contract_number TEXT UNIQUE NOT NULL,
    plan_name TEXT NOT NULL,
    start_date DATE NOT NULL,
    end_date DATE NOT NULL,
    amount DECIMAL(10,2) NOT NULL,
    status amc_status DEFAULT 'active' NOT NULL,
    services_included TEXT[],
    visits_per_year INTEGER DEFAULT 4,
    notes TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL
);

-- Create service requests table
CREATE TABLE public.service_requests (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    request_number TEXT UNIQUE NOT NULL,
    customer_id UUID REFERENCES public.customers(id) ON DELETE CASCADE NOT NULL,
    technician_id UUID REFERENCES public.technicians(id) ON DELETE SET NULL,
    amc_contract_id UUID REFERENCES public.amc_contracts(id) ON DELETE SET NULL,
    service_type TEXT NOT NULL,
    description TEXT NOT NULL,
    address TEXT NOT NULL,
    city TEXT NOT NULL,
    pincode TEXT NOT NULL,
    preferred_date DATE,
    preferred_time_slot TEXT,
    status service_status DEFAULT 'pending' NOT NULL,
    priority TEXT DEFAULT 'normal',
    assigned_at TIMESTAMP WITH TIME ZONE,
    started_at TIMESTAMP WITH TIME ZONE,
    completed_at TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL
);

-- Create service request notes table (for updates/progress)
CREATE TABLE public.service_request_notes (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    service_request_id UUID REFERENCES public.service_requests(id) ON DELETE CASCADE NOT NULL,
    user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
    note TEXT NOT NULL,
    is_internal BOOLEAN DEFAULT false,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL
);

-- Create service request media table (for uploaded images/videos)
CREATE TABLE public.service_request_media (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    service_request_id UUID REFERENCES public.service_requests(id) ON DELETE CASCADE NOT NULL,
    uploaded_by UUID REFERENCES auth.users(id) ON DELETE SET NULL,
    file_url TEXT NOT NULL,
    file_type TEXT NOT NULL,
    file_name TEXT,
    uploaded_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL
);

-- Create invoices table
CREATE TABLE public.invoices (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    invoice_number TEXT UNIQUE NOT NULL,
    service_request_id UUID REFERENCES public.service_requests(id) ON DELETE SET NULL,
    customer_id UUID REFERENCES public.customers(id) ON DELETE CASCADE NOT NULL,
    amount DECIMAL(10,2) NOT NULL,
    tax_amount DECIMAL(10,2) DEFAULT 0,
    total_amount DECIMAL(10,2) NOT NULL,
    status TEXT DEFAULT 'pending' NOT NULL,
    due_date DATE,
    paid_at TIMESTAMP WITH TIME ZONE,
    notes TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL
);

-- Enable RLS on all tables
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.customers ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.technicians ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.amc_contracts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.service_requests ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.service_request_notes ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.service_request_media ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.invoices ENABLE ROW LEVEL SECURITY;

-- Create security definer function to check roles (prevents RLS recursion)
CREATE OR REPLACE FUNCTION public.has_role(_user_id UUID, _role app_role)
RETURNS BOOLEAN
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
    SELECT EXISTS (
        SELECT 1
        FROM public.user_roles
        WHERE user_id = _user_id
          AND role = _role
    )
$$;

-- Create function to get user's technician_id
CREATE OR REPLACE FUNCTION public.get_technician_id(_user_id UUID)
RETURNS UUID
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
    SELECT id FROM public.technicians WHERE user_id = _user_id LIMIT 1
$$;

-- Create updated_at trigger function
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

-- Create triggers for updated_at
CREATE TRIGGER update_profiles_updated_at BEFORE UPDATE ON public.profiles FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_customers_updated_at BEFORE UPDATE ON public.customers FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_technicians_updated_at BEFORE UPDATE ON public.technicians FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_amc_contracts_updated_at BEFORE UPDATE ON public.amc_contracts FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_service_requests_updated_at BEFORE UPDATE ON public.service_requests FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_invoices_updated_at BEFORE UPDATE ON public.invoices FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- Function to generate request number
CREATE OR REPLACE FUNCTION public.generate_request_number()
RETURNS TRIGGER AS $$
BEGIN
    NEW.request_number = 'SR' || TO_CHAR(NOW(), 'YYMMDD') || '-' || LPAD(NEXTVAL('service_request_seq')::TEXT, 4, '0');
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

CREATE SEQUENCE IF NOT EXISTS service_request_seq START 1;

CREATE TRIGGER set_request_number BEFORE INSERT ON public.service_requests FOR EACH ROW EXECUTE FUNCTION public.generate_request_number();

-- Function to generate contract number
CREATE OR REPLACE FUNCTION public.generate_contract_number()
RETURNS TRIGGER AS $$
BEGIN
    NEW.contract_number = 'AMC' || TO_CHAR(NOW(), 'YYMMDD') || '-' || LPAD(NEXTVAL('contract_seq')::TEXT, 4, '0');
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

CREATE SEQUENCE IF NOT EXISTS contract_seq START 1;

CREATE TRIGGER set_contract_number BEFORE INSERT ON public.amc_contracts FOR EACH ROW EXECUTE FUNCTION public.generate_contract_number();

-- Function to generate invoice number
CREATE OR REPLACE FUNCTION public.generate_invoice_number()
RETURNS TRIGGER AS $$
BEGIN
    NEW.invoice_number = 'INV' || TO_CHAR(NOW(), 'YYMMDD') || '-' || LPAD(NEXTVAL('invoice_seq')::TEXT, 4, '0');
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

CREATE SEQUENCE IF NOT EXISTS invoice_seq START 1;

CREATE TRIGGER set_invoice_number BEFORE INSERT ON public.invoices FOR EACH ROW EXECUTE FUNCTION public.generate_invoice_number();

-- RLS Policies for profiles
CREATE POLICY "Users can view own profile" ON public.profiles FOR SELECT TO authenticated USING (auth.uid() = user_id);
CREATE POLICY "Users can update own profile" ON public.profiles FOR UPDATE TO authenticated USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own profile" ON public.profiles FOR INSERT TO authenticated WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Admins can view all profiles" ON public.profiles FOR SELECT TO authenticated USING (public.has_role(auth.uid(), 'admin'));

-- RLS Policies for user_roles (only admins can manage)
CREATE POLICY "Users can view own roles" ON public.user_roles FOR SELECT TO authenticated USING (auth.uid() = user_id);
CREATE POLICY "Admins can view all roles" ON public.user_roles FOR SELECT TO authenticated USING (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins can insert roles" ON public.user_roles FOR INSERT TO authenticated WITH CHECK (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins can delete roles" ON public.user_roles FOR DELETE TO authenticated USING (public.has_role(auth.uid(), 'admin'));

-- RLS Policies for customers
CREATE POLICY "Admins can do all on customers" ON public.customers FOR ALL TO authenticated USING (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Technicians can view customers" ON public.customers FOR SELECT TO authenticated USING (public.has_role(auth.uid(), 'technician'));
CREATE POLICY "Customers can view own record" ON public.customers FOR SELECT TO authenticated USING (user_id = auth.uid());

-- RLS Policies for technicians
CREATE POLICY "Admins can do all on technicians" ON public.technicians FOR ALL TO authenticated USING (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Technicians can view own record" ON public.technicians FOR SELECT TO authenticated USING (user_id = auth.uid());
CREATE POLICY "Technicians can update own record" ON public.technicians FOR UPDATE TO authenticated USING (user_id = auth.uid());

-- RLS Policies for amc_contracts
CREATE POLICY "Admins can do all on amc_contracts" ON public.amc_contracts FOR ALL TO authenticated USING (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Technicians can view amc_contracts" ON public.amc_contracts FOR SELECT TO authenticated USING (public.has_role(auth.uid(), 'technician'));

-- RLS Policies for service_requests
CREATE POLICY "Admins can do all on service_requests" ON public.service_requests FOR ALL TO authenticated USING (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Technicians can view assigned requests" ON public.service_requests FOR SELECT TO authenticated USING (technician_id = public.get_technician_id(auth.uid()));
CREATE POLICY "Technicians can update assigned requests" ON public.service_requests FOR UPDATE TO authenticated USING (technician_id = public.get_technician_id(auth.uid()));

-- RLS Policies for service_request_notes
CREATE POLICY "Admins can do all on notes" ON public.service_request_notes FOR ALL TO authenticated USING (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Technicians can view notes on assigned requests" ON public.service_request_notes FOR SELECT TO authenticated 
    USING (EXISTS (SELECT 1 FROM public.service_requests sr WHERE sr.id = service_request_id AND sr.technician_id = public.get_technician_id(auth.uid())));
CREATE POLICY "Technicians can add notes to assigned requests" ON public.service_request_notes FOR INSERT TO authenticated 
    WITH CHECK (EXISTS (SELECT 1 FROM public.service_requests sr WHERE sr.id = service_request_id AND sr.technician_id = public.get_technician_id(auth.uid())));

-- RLS Policies for service_request_media
CREATE POLICY "Admins can do all on media" ON public.service_request_media FOR ALL TO authenticated USING (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Technicians can view media on assigned requests" ON public.service_request_media FOR SELECT TO authenticated 
    USING (EXISTS (SELECT 1 FROM public.service_requests sr WHERE sr.id = service_request_id AND sr.technician_id = public.get_technician_id(auth.uid())));
CREATE POLICY "Technicians can upload media to assigned requests" ON public.service_request_media FOR INSERT TO authenticated 
    WITH CHECK (EXISTS (SELECT 1 FROM public.service_requests sr WHERE sr.id = service_request_id AND sr.technician_id = public.get_technician_id(auth.uid())));

-- RLS Policies for invoices
CREATE POLICY "Admins can do all on invoices" ON public.invoices FOR ALL TO authenticated USING (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Technicians can view invoices" ON public.invoices FOR SELECT TO authenticated USING (public.has_role(auth.uid(), 'technician'));

-- Create indexes for better performance
CREATE INDEX idx_service_requests_customer ON public.service_requests(customer_id);
CREATE INDEX idx_service_requests_technician ON public.service_requests(technician_id);
CREATE INDEX idx_service_requests_status ON public.service_requests(status);
CREATE INDEX idx_amc_contracts_customer ON public.amc_contracts(customer_id);
CREATE INDEX idx_amc_contracts_end_date ON public.amc_contracts(end_date);
CREATE INDEX idx_user_roles_user_id ON public.user_roles(user_id);
CREATE INDEX idx_technicians_user_id ON public.technicians(user_id);