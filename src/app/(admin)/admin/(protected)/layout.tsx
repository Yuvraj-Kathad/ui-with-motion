import { requireAdmin } from '@/lib/supabase/admin'
import AdminSidebar from '@/components/admin/AdminSidebar'

export default async function AdminProtectedLayout({
  children,
}: {
  children: React.ReactNode
}) {
  // Ensure the user is an admin before rendering protected routes
  await requireAdmin()

  return (
    <div className="flex h-screen w-full bg-[#F6F7F8] overflow-hidden">
      <AdminSidebar />
      <main className="flex-1 flex flex-col h-full overflow-y-auto">
        {children}
      </main>
    </div>
  )
}
