import { db } from '@/lib/db';
import Link from 'next/link';
import { FaPlus } from 'react-icons/fa';

export default async function UsersAdminPage() {
    const users = await db.user.findMany({
        orderBy: { createdAt: 'desc' },
    });

    return (
        <div className="w-full">
            <div className="flex w-full items-center justify-between mb-8">
                <h1 className="text-2xl font-bold text-gray-900">Admin Users</h1>
                <Link
                    href="/admin/users/create"
                    className="flex h-10 items-center rounded-lg bg-[#ee3425] px-4 text-sm font-medium text-white transition-colors hover:bg-red-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600"
                >
                    <span className="hidden md:block">Add User</span>{' '}
                    <FaPlus className="h-5 md:ml-4" />
                </Link>
            </div>

            <div className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-200">
                <table className="w-full text-left text-sm md:text-base">
                    <thead className="bg-gray-50 text-gray-600 border-b border-gray-200">
                        <tr>
                            <th className="p-4 font-medium">Name</th>
                            <th className="p-4 font-medium">Email</th>
                            <th className="p-4 font-medium hidden md:table-cell">Role</th>
                            <th className="p-4 font-medium hidden md:table-cell">Joined</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                        {users.map((user) => (
                            <tr key={user.id} className="hover:bg-gray-50 transition-colors text-gray-800">
                                <td className="p-4 font-medium">{user.name}</td>
                                <td className="p-4 text-gray-500">{user.email}</td>
                                <td className="p-4 hidden md:table-cell">
                                    <span className="px-2 py-1 rounded text-xs font-medium bg-blue-100 text-blue-700">
                                        {user.role}
                                    </span>
                                </td>
                                <td className="p-4 hidden md:table-cell text-gray-500">
                                    {user.createdAt.toLocaleDateString()}
                                </td>
                            </tr>
                        ))}
                        {users.length === 0 && (
                            <tr>
                                <td colSpan={4} className="p-6 text-center text-gray-500">No users found.</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
