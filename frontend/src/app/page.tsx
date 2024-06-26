import ProtectedRoute from "@/hoc/ProtectedRoute";

export default function Home() {
  return (
    <ProtectedRoute>
      <main>
        <h1>Home Page</h1>
      </main>
    </ProtectedRoute>
  );
}
