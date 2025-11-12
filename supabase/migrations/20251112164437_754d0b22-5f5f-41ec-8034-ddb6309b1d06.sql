-- Fix search_path for update_idea_votes_count function
CREATE OR REPLACE FUNCTION update_idea_votes_count()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  IF TG_OP = 'INSERT' THEN
    UPDATE public.ideas
    SET votes_count = votes_count + 1
    WHERE id = NEW.idea_id;
  ELSIF TG_OP = 'DELETE' THEN
    UPDATE public.ideas
    SET votes_count = votes_count - 1
    WHERE id = OLD.idea_id;
  END IF;
  RETURN NULL;
END;
$$;