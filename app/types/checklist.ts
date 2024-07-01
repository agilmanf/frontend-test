import { DefaultResponseData } from "./shared";

export type Checklist = {
  id: number;
  name: string;
  items: any[];
  checklistCompletionStatus: boolean;
};

export type GetAllChecklistResponse = DefaultResponseData<Checklist[]>;
