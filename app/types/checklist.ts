import { DefaultResponseData } from "./shared";

export type Checklist = {
  id: number;
  name: string;
  items: any[];
  checklistCompletionStatus: boolean;
};

export type GetAllChecklistResponse = DefaultResponseData<Checklist[]>;

export type AddChecklistResponse = DefaultResponseData<any>;
