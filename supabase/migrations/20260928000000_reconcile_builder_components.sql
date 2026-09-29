DO $$
BEGIN
    ---------------------------------------------------------
    -- 1. PRECONDITION CHECKS
    ---------------------------------------------------------

    -- Precondition A: Ensure the target canonical rows DO NOT already exist.
    -- If any exist, this means the migration was already run or the DB state is dirty.
    IF EXISTS (
        SELECT 1 FROM public.components 
        WHERE registry_id IN (
            'continue-button', 
            'generate-button', 
            'accept-button', 
            'delete-button', 
            'download-button', 
            'tabs-button', 
            'services-indicator-button'
        )
    ) THEN
        RAISE EXCEPTION 'Migration failed: One or more target canonical registry_ids already exist.';
    END IF;

    -- Precondition B: Ensure ALL expected source test rows DO exist.
    IF (
        SELECT count(*) FROM public.components 
        WHERE registry_id IN (
            'accept', 
            'start-button', 
            'generate-click-button', 
            'technology-page', 
            'submit'
        )
    ) != 5 THEN
        RAISE EXCEPTION 'Migration failed: One or more expected source test rows are missing.';
    END IF;

    -- Precondition C: Ensure pre-existing canonical rows DO exist and are untouched.
    IF (
        SELECT count(*) FROM public.components 
        WHERE registry_id IN (
            'get-access-button', 
            'mail-button'
        )
    ) != 2 THEN
        RAISE EXCEPTION 'Migration failed: Pre-existing canonical rows (get-access-button, mail-button) are missing.';
    END IF;

    ---------------------------------------------------------
    -- 2. INSERTS (Recovered Data)
    ---------------------------------------------------------
    
    -- Recover 'accept' -> 'accept-button'
    INSERT INTO public.components (registry_id, title, description, status, tags, type, "order", source_type, snippets, schema_definition)
    SELECT 
      'accept-button', 
      'Accept Shine Button', 
      'An accept button with a success state.', 
      'published', 
      '{"Html & css", "Next js", "Figma"}', 
      'button', 
      3,
      source_type,
      snippets,
      schema_definition
    FROM public.components WHERE registry_id = 'accept';

    -- Recover 'start-button' -> 'continue-button'
    INSERT INTO public.components (registry_id, title, description, status, tags, type, "order", source_type, snippets, schema_definition)
    SELECT 
      'continue-button', 
      'Continue Button', 
      'A button with a smooth continue animation.', 
      'published', 
      '{"Html & css", "Next js", "Figma"}', 
      'button', 
      1,
      source_type,
      snippets,
      schema_definition
    FROM public.components WHERE registry_id = 'start-button';

    -- Recover 'generate-click-button' -> 'generate-button'
    INSERT INTO public.components (registry_id, title, description, status, tags, type, "order", source_type, snippets, schema_definition)
    SELECT 
      'generate-button', 
      'Generate 3D Button', 
      'A button that sparkles when hovered.', 
      'published', 
      '{"Html & css", "Next js", "Figma"}', 
      'button', 
      2,
      source_type,
      snippets,
      schema_definition
    FROM public.components WHERE registry_id = 'generate-click-button';

    -- Recover 'technology-page' -> 'delete-button'
    INSERT INTO public.components (registry_id, title, description, status, tags, type, "order", source_type, snippets, schema_definition)
    SELECT 
      'delete-button', 
      'Brutalist Delete Button', 
      'A brutalist-style delete button with hover effects.', 
      'published', 
      '{"Html & css", "Next js", "Figma"}', 
      'button', 
      6,
      source_type,
      snippets,
      schema_definition
    FROM public.components WHERE registry_id = 'technology-page';

    ---------------------------------------------------------
    -- 3. INSERTS (Missing Data)
    ---------------------------------------------------------

    INSERT INTO public.components (registry_id, title, description, status, tags, type, "order", source_type, snippets, schema_definition)
    VALUES 
      ('download-button', 'Download Button', 'A button that illustrates a downloading process.', 'published', '{"Html & css", "Next js", "Figma"}', 'button', 7, 'react', '{}'::jsonb, '[]'::jsonb),
      ('tabs-button', 'Navigation Tabs', 'A button style suited for tabs.', 'published', '{"Html & css", "Next js", "Figma"}', 'interactive', 8, 'react', '{}'::jsonb, '[]'::jsonb),
      ('services-indicator-button', 'Services Indicator Button', 'A button that indicates service status.', 'published', '{"Html & css", "Next js", "Figma"}', 'button', 9, 'react', '{}'::jsonb, '[]'::jsonb);

    ---------------------------------------------------------
    -- 4. ARCHIVE OLD ROWS
    ---------------------------------------------------------

    UPDATE public.components 
    SET status = 'archived'
    WHERE registry_id IN (
      'accept', 
      'start-button', 
      'generate-click-button', 
      'technology-page', 
      'submit'
    );

END $$;
