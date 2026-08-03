export interface IAccount {
  id: number;
  username: string;
  avatarUrl: string;
  subscribersAmount: number;
  firstName: string;
  lastName: string;
  isActive: boolean;
  stack: string[];
  city: string;
  description: string;
}

export interface IGetAccounts {
  stack: string;
  firstName: string;
  lastName: string;
  city: string | null;
  orderBy: string | null;
  page: number;
  size: number;
}

export interface IGetSubscribers {
  stack: string;
  firstLastName: string;
  account_id: number;
  city: string | null;
  orderBy: string | null;
  page: number;
  size: number;
}

export interface Pageble<T> {
  items: T[];
  total: number;
  page: number;
  size: number;
  pages: number;
}
