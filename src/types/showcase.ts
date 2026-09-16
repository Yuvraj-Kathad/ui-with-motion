export interface ShowcaseItem {
  id: string;
  name: string;
  category: "button" | "interactive";
  label: string;
  row: 1 | 2 | 3;
  desktopWidth?: string; // e.g., '233px', 'flex-1', '320px'
  desktopHeight: string; // '168px', '292px', '180px'
  componentKey: string;
}
