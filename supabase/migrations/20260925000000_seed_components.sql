insert into public.components (registry_id, title, description, status, tags, type, "order")
values
  ('continue-button', 'Continue Button', 'A button with a smooth continue animation.', 'published', '{"Html & css", "Next js", "Figma"}', 'button', 1),
  ('generate-button', 'Generate 3D Button', 'A button that sparkles when hovered.', 'published', '{"Html & css", "Next js", "Figma"}', 'button', 2),
  ('accept-button', 'Accept Shine Button', 'An accept button with a success state.', 'published', '{"Html & css", "Next js", "Figma"}', 'button', 3),
  ('get-access-button', 'Get Access Dashed Button', 'A button designed for gating access.', 'published', '{"Html & css", "Next js", "Figma"}', 'button', 4),
  ('mail-button', 'Mail Icon Button', 'A button with a mail envelope animation.', 'published', '{"Html & css", "Next js", "Figma"}', 'button', 5),
  ('delete-button', 'Brutalist Delete Button', 'A brutalist-style delete button with hover effects.', 'published', '{"Html & css", "Next js", "Figma"}', 'button', 6),
  ('download-button', 'Download Button', 'A button that illustrates a downloading process.', 'published', '{"Html & css", "Next js", "Figma"}', 'button', 7),
  ('tabs-button', 'Navigation Tabs', 'A button style suited for tabs.', 'published', '{"Html & css", "Next js", "Figma"}', 'interactive', 8),
  ('services-indicator-button', 'Services Indicator Button', 'A button that indicates service status.', 'published', '{"Html & css", "Next js", "Figma"}', 'button', 9)
on conflict (registry_id) do nothing;
