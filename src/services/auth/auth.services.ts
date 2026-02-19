import Account from "@/models/account/account.model";

import {
  AccountDocumentType,
  AccountFilterType,
  AccountType,
} from "@/types/account/account.type";

export const findAccountS = async (
  filter: AccountFilterType,
): Promise<AccountDocumentType | null> => {
  const account = await Account.findOne(filter).exec();
  return account as AccountDocumentType | null;
};

export const registerS = async (data: AccountType) => {
  const account = await Account.create(data);
  return account;
};

export const getAccountS = async (id: string) => {
  const account = await Account.findById(id);

  if (!account) {
    throw new Error("Account not found");
  }
  return account;
};
export const updateAccountS = async (
  id: string,
  data: Partial<AccountType>,
) => {
  const user = await Account.findById(id);

  if (!user) {
    throw new Error("Task not found!");
  }

  Object.assign(user, data);
  await user.save();

  return user;
};
