-- EduInsight Pro initial schema

create extension if not exists "pgcrypto";

--------------------------------------------------
-- ENUM TYPES
--------------------------------------------------

do $$
begin
  if not exists (select 1 from pg_type where typname = 'user_role') then
    create type public.user_role as enum ('student','teacher','admin','parent');
  end if;
end$$;

do $$
begin
  if not exists (select 1 from pg_type where typname = 'assessment_status') then
    create type public.assessment_status as enum ('draft','published','archived');
  end if;
end$$;

do $$
begin
  if not exists (select 1 from pg_type where typname = 'question_type') then
    create type public.question_type as enum (
      'multiple_choice',
      'multi_select',
      'true_false',
      'short_answer',
      'essay',
      'numeric'
    );
  end if;
end$$;

do $$
begin
  if not exists (select 1 from pg_type where typname = 'difficulty_level') then
    create type public.difficulty_level as enum ('emerging','proficient','advanced');
  end if;
end$$;

do $$
begin
  if not exists (select 1 from pg_type where typname = 'mastery_level') then
    create type public.mastery_level as enum ('emerging','approaching','proficient','advanced');
  end if;
end$$;

do $$
begin
  if not exists (select 1 from pg_type where typname = 'enrollment_status') then
    create type public.enrollment_status as enum ('active','withdrawn');
  end if;
end$$;

do $$
begin
  if not exists (select 1 from pg_type where typname = 'report_status') then
    create type public.report_status as enum ('queued','generating','ready','failed');
  end if;
end$$;

do $$
begin
  if not exists (select 1 from pg_type where typname = 'intervention_status') then
    create type public.intervention_status as enum ('planned','active','completed','archived');
  end if;
end$$;

do $$
begin
  if not exists (select 1 from pg_type where typname = 'goal_status') then
    create type public.goal_status as enum ('active','achieved','paused','archived');
  end if;
end$$;

--------------------------------------------------
-- CORE TABLES
--------------------------------------------------

create table if not exists public.schools (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  district_name text,
  timezone text not null default 'UTC',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.users (
  id uuid primary key references auth.users(id) on delete cascade,
  role public.user_role not null default 'student',
  name text,
  email text not null,
  school_id uuid references public.schools(id) on delete set null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint users_email_unique unique (email)
);

create table if not exists public.classes (
  id uuid primary key default gen_random_uuid(),
  school_id uuid not null references public.schools(id) on delete cascade,
  teacher_id uuid references public.users(id) on delete set null,
  name text not null,
  subject text not null,
  grade_band text not null,
  term text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.enrollments (
  id uuid primary key default gen_random_uuid(),
  class_id uuid not null references public.classes(id) on delete cascade,
  student_id uuid not null references public.users(id) on delete cascade,
  status public.enrollment_status not null default 'active',
  enrolled_at timestamptz not null default now(),
  constraint enrollments_unique unique (class_id, student_id)
);

--------------------------------------------------
-- ASSESSMENTS
--------------------------------------------------

create table if not exists public.assessments (
  id uuid primary key default gen_random_uuid(),
  class_id uuid not null references public.classes(id) on delete cascade,
  title text not null,
  status public.assessment_status not null default 'draft',
  scheduled_for timestamptz,
  due_at timestamptz,
  created_by uuid references public.users(id) on delete set null,
  published_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.learning_standards (
  id uuid primary key default gen_random_uuid(),
  code text not null,
  description text not null,
  subject text not null,
  grade_band text not null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint learning_standards_code_unique unique (code)
);

create table if not exists public.questions (
  id uuid primary key default gen_random_uuid(),
  school_id uuid not null references public.schools(id) on delete cascade,
  standard_id uuid references public.learning_standards(id) on delete set null,
  prompt text not null,
  question_type public.question_type not null,
  difficulty public.difficulty_level not null default 'proficient',
  points numeric(6,2) not null default 1,
  metadata jsonb not null default '{}'::jsonb,
  created_by uuid references public.users(id) on delete set null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.question_options (
  id uuid primary key default gen_random_uuid(),
  question_id uuid not null references public.questions(id) on delete cascade,
  label text not null,
  is_correct boolean not null default false,
  order_index integer not null default 0
);

--------------------------------------------------
-- UPDATED_AT TRIGGER
--------------------------------------------------

create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

create trigger schools_set_updated_at
before update on public.schools
for each row execute function public.set_updated_at();

create trigger users_set_updated_at
before update on public.users
for each row execute function public.set_updated_at();

create trigger classes_set_updated_at
before update on public.classes
for each row execute function public.set_updated_at();

create trigger assessments_set_updated_at
before update on public.assessments
for each row execute function public.set_updated_at();

--------------------------------------------------
-- AUTH USER SYNC
--------------------------------------------------

create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.users (id,email,name,role)
  values (
    new.id,
    new.email,
    coalesce(new.raw_user_meta_data->>'full_name',new.email),
    'student'
  )
  on conflict (id)
  do update set email = excluded.email;

  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;

create trigger on_auth_user_created
after insert on auth.users
for each row execute function public.handle_new_user();

--------------------------------------------------
-- RLS ENABLE
--------------------------------------------------

alter table public.schools enable row level security;
alter table public.users enable row level security;
alter table public.classes enable row level security;
alter table public.enrollments enable row level security;
alter table public.assessments enable row level security;
alter table public.questions enable row level security;
alter table public.question_options enable row level security;