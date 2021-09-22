export type ToDo = {
  id: string;
  description: string;
  dueDate: string | null;
  isComplete: boolean;
}

export type ToDosJSONResponse = ToDo[];
