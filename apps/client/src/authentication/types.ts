export interface User {
  id: string;
  email: string;
}

export interface Auth {
  setUser: React.Dispatch<React.SetStateAction<User | null>> | (() => void);
  user: User | null;
}
