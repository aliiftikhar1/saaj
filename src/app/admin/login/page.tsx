import { AdminLoginForm } from "./AdminLoginForm";

export const metadata = {
  title: "Admin Login | Saaj Tradition",
};

export default async function AdminLoginPage({
  searchParams,
}: {
  searchParams: Promise<{ redirect?: string }>;
}) {
  const { redirect } = await searchParams;

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="w-full max-w-md mx-auto p-8">
        <div className="bg-white rounded-2xl shadow-lg p-8">
          <div className="text-center mb-8">
            <h1 className="text-2xl font-semibold text-gray-900">
              Saaj Tradition
            </h1>
            <p className="text-sm text-gray-500 mt-2">Admin Panel Login</p>
          </div>
          <AdminLoginForm redirect={redirect} />
        </div>
      </div>
    </div>
  );
}
