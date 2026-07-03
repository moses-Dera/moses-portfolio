import { getSession } from "@/lib/auth";
import { AdminDashboard } from "./AdminDashboard";
import { LoginForm } from "./LoginForm";

export default async function MozeCmdCenter() {
  const session = await getSession();

  if (!session) {
    return (
      <main className="min-h-screen pt-32 px-6 pb-24 relative z-10">
        <div className="max-w-md mx-auto">
          <div className="mb-12">
            <h1 className="text-4xl font-bold tracking-tight mb-2">
              Command <span className="text-zinc-500">Center</span>
            </h1>
            <p className="text-zinc-400 font-mono text-sm uppercase tracking-widest">
              Restricted Access
            </p>
          </div>
          <LoginForm />
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen pt-32 px-6 pb-24 relative z-10">
      <AdminDashboard />
    </main>
  );
}
