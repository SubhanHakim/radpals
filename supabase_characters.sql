-- Create Characters Table for Dynamic Updates
create table if not exists characters (
  id bigserial primary key,
  name text not null,
  role text not null,
  image_url text not null,
  bio text,
  traits text[], -- Array of strings for traits like ['Stealth', 'Hacking']
  status text default 'ACTIVE', -- ACTIVE, MIA, KIA
  created_at timestamptz default now()
);

-- Enable Row Level Security (read-only for public)
alter table characters enable row level security;

create policy "Enable read access for all users"
on characters for select
using (true);

-- Insert the first character (Mascot / ZYKO?)
-- Assuming "Mascot" is Zyko based on previous context, or a generic Radpal.
-- Let's stick to the file name "mascot" but give it a cool name if not specified.
-- User just said "mascot.jpg". I will call it "VANGUARD" or similar if no name provided, 
-- but wait, user previously mentioned ZYKO. Let's assume this might be Zyko or a standard Radpal.
-- I'll use a placeholder insert that you can run.

insert into characters (name, role, image_url, bio, traits, status)
values
(
  'ZYKO', 
  'Autonomous Courier', 
  '/characters/mascot.jpg', 
  'Emerging from the ruins of the old net, Zyko delivers data packages that others fear to touch.',
  ARRAY['Silent', 'Precise', 'Uncensored'], 
  'ACTIVE'
);
