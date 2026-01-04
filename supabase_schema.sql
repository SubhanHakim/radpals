-- Reset Database Schema for Redpals RAG

-- 1. CLEANUP (Drop existing objects to avoid conflicts)
drop function if exists match_documents;
drop table if exists documents cascade;

-- 2. SETUP
create extension if not exists vector;

-- 3. TABLE CREATION
create table documents (
  id bigserial primary key,
  source_id text not null unique, -- Unique constraint enables UPSERT by source_id
  content text,
  embedding vector(1536)
);

-- 4. FUNCTION CREATION
create or replace function match_documents (
  query_embedding vector(1536),
  match_threshold float,
  match_count int
)
returns table (
  id bigint,
  content text,
  similarity float
)
language plpgsql
as $$
begin
  return query
  select
    documents.id,
    documents.content,
    1 - (documents.embedding <=> query_embedding) as similarity
  from documents
  where 1 - (documents.embedding <=> query_embedding) > match_threshold
  order by documents.embedding <=> query_embedding
  limit match_count;
end;
$$;
