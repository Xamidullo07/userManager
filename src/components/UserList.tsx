import React, { useState } from 'react';
import { Pencil, Trash2, X, Check } from 'lucide-react';
import { useUsers } from '../contexts/UserContext';

export default function UserList() {
  const { users, editUser, deleteUser } = useUsers();
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editForm, setEditForm] = useState({
    name: '',
    email: '',
    phone: '',
  });

  const startEditing = (user: any) => {
    setEditingId(user.id);
    setEditForm({
      name: user.name,
      email: user.email,
      phone: user.phone,
    });
  };

  const handleEdit = (id: string) => {
    editUser(id, editForm);
    setEditingId(null);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEditForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {users.map((user) => (
        <div key={user.id} className="bg-white p-4 rounded-lg shadow-md">
          {editingId === user.id ? (
            <div className="space-y-2">
              <input
                type="text"
                name="name"
                value={editForm.name}
                onChange={handleChange}
                className="w-full p-2 border rounded-md"
              />
              <input
                type="email"
                name="email"
                value={editForm.email}
                onChange={handleChange}
                className="w-full p-2 border rounded-md"
              />
              <input
                type="tel"
                name="phone"
                value={editForm.phone}
                onChange={handleChange}
                className="w-full p-2 border rounded-md"
              />
              <div className="flex justify-end space-x-2">
                <button
                  onClick={() => handleEdit(user.id)}
                  className="p-1 text-green-600 hover:text-green-800"
                >
                  <Check size={20} />
                </button>
                <button
                  onClick={() => setEditingId(null)}
                  className="p-1 text-red-600 hover:text-red-800"
                >
                  <X size={20} />
                </button>
              </div>
            </div>
          ) : (
            <>
              <div className="mb-2">
                <h3 className="text-lg font-semibold">{user.name}</h3>
                <p className="text-gray-600">{user.email}</p>
                <p className="text-gray-600">{user.phone}</p>
              </div>
              <div className="flex justify-end space-x-2">
                <button
                  onClick={() => startEditing(user)}
                  className="p-1 text-blue-600 hover:text-blue-800"
                >
                  <Pencil size={20} />
                </button>
                <button
                  onClick={() => deleteUser(user.id)}
                  className="p-1 text-red-600 hover:text-red-800"
                >
                  <Trash2 size={20} />
                </button>
              </div>
            </>
          )}
        </div>
      ))}
    </div>
  );
}