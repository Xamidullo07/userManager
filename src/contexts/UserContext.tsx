import React, { createContext, useContext, useState, ReactNode } from 'react';

interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
}

interface UserContextType {
  users: User[];
  addUser: (user: Omit<User, 'id'>) => void;
  editUser: (id: string, updatedUser: Omit<User, 'id'>) => void;
  deleteUser: (id: string) => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export function UserProvider({ children }: { children: ReactNode }) {
  const [users, setUsers] = useState<User[]>([]);

  const addUser = (user: Omit<User, 'id'>) => {
    const newUser = {
      ...user,
      id: crypto.randomUUID(),
    };
    setUsers((prev) => [...prev, newUser]);
  };

  const editUser = (id: string, updatedUser: Omit<User, 'id'>) => {
    setUsers((prev) =>
      prev.map((user) =>
        user.id === id ? { ...updatedUser, id } : user
      )
    );
  };

  const deleteUser = (id: string) => {
    setUsers((prev) => prev.filter((user) => user.id !== id));
  };

  return (
    <UserContext.Provider value={{ users, addUser, editUser, deleteUser }}>
      {children}
    </UserContext.Provider>
  );
}

export function useUsers() {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUsers must be used within a UserProvider');
  }
  return context;
}