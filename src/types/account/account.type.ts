import { Document } from "mongoose";

export type AccountType = {
  name: string;
  email: string;
  password: string;
};

export type AccountFilterType = Partial<AccountType>;
export type AccountDocumentType = AccountType & Document;

export type TaskType = {
  task: string;
  status: string;
};
export type TaskFilterType = Partial<TaskType>;
export type TaskDocumentType = TaskType & Document;
