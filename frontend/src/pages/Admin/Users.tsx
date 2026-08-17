import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { shipmentApi } from "@/api/shipment.api";
import { useState } from "react";
import toast from "react-hot-toast";
import { Button } from "@/components/common/Button";

export default function AdminUsers() {
    const [page, setPage] = useState(1);
    const [filters, setFilters] = useState({ role: "", search: "" });
    const queryClient = useQueryClient();

    const { data, isLoading } = useQuery({
        queryKey: ["adminUsers", page, filters],
        queryFn: () =>
            shipmentApi.getAllUsers(page, 10, filters).then((res) => res.data.data),
    });

    const toggleUserStatus = useMutation({
        mutationFn: ({ id, isActive }: { id: string; isActive: boolean }) =>
            isActive ? shipmentApi.activateUser(id) : shipmentApi.deleteUser(id),
        onSuccess: (_, variables) => {
            toast.success(
                variables.isActive ? "User activated" : "User deactivated",
            );
            queryClient.invalidateQueries({ queryKey: ["adminUsers"] });
        },
        onError: (err: any) => toast.error(err.response?.data?.message || "Failed"),
    });

    return (
        <div className="max-w-7xl mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold">Users</h1>
            <div className="flex gap-4 my-4">
                <input
                    placeholder="Search by name/email"
                    className="border rounded-xl px-4 py-2"
                    onChange={(e) => setFilters({ ...filters, search: e.target.value })}
                />
                <select
                    className="border rounded-xl px-4 py-2"
                    onChange={(e) => setFilters({ ...filters, role: e.target.value })}
                >
                    <option value="">All Roles</option>
                    <option value="CUSTOMER">Customer</option>
                    <option value="TRANSPORTER">Transporter</option>
                    <option value="DRIVER">Driver</option>
                    <option value="ADMIN">Admin</option>
                </select>
            </div>
            {isLoading ? (
                <p>Loading...</p>
            ) : (
                <div className="overflow-x-auto">
                    <table className="min-w-full bg-white rounded-xl shadow overflow-hidden">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-6 py-3 text-left">Name</th>
                                <th className="px-6 py-3 text-left">Email</th>
                                <th className="px-6 py-3 text-left">Role</th>
                                <th className="px-6 py-3 text-left">Status</th>
                                <th className="px-6 py-3 text-left">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                            {data?.data?.map((user: any) => (
                                <tr key={user._id}>
                                    <td className="px-6 py-4">
                                        {user.firstName} {user.lastName}
                                    </td>
                                    <td className="px-6 py-4">{user.email}</td>
                                    <td className="px-6 py-4">{user.role}</td>
                                    <td className="px-6 py-4">
                                        {user.isActive ? "Active" : "Inactive"}
                                    </td>
                                    <td className="px-6 py-4">
                                        <button
                                            onClick={() =>
                                                toggleUserStatus.mutate({
                                                    id: user._id,
                                                    isActive: !user.isActive,
                                                })
                                            }
                                            className={user.isActive ? "text-red-600 hover:underline" : "text-green-600 hover:underline"}
                                        >
                                            {user.isActive ? "Deactivate" : "Activate"}
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    <div className="flex justify-between mt-4">
                        <Button
                            onClick={() => setPage((p) => Math.max(1, p - 1))}
                            disabled={page === 1}
                        >
                            Previous
                        </Button>
                        <span>Page {page}</span>
                        <Button
                            onClick={() => setPage((p) => p + 1)}
                            disabled={data?.data?.length < 10}
                        >
                            Next
                        </Button>
                    </div>
                </div>
            )}
        </div>
    );
}
