export type Category = "Seminer" | "Atölye" | "Söyleşi" | "Yarışma" | "Diğer" | "";

export interface CampusEvent {
  id: string;
  title: string;
  category: Category;
  date: string;
  time: string;
  location: string;
  capacity: number;
  description: string;
}

export interface EventFormData {
  title: string;
  category: string;
  date: string;
  time: string;
  location: string;
  capacity: string;
  description: string;
}

export type EventFormErrors = Partial<Record<keyof EventFormData, string>>;

export interface RegisterErrors {
  name?: string;
  email?: string;
  password?: string;
  password2?: string;
}
