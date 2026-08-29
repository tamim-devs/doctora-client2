
import Link from "next/link";

export default function NotFound() {
  return (
    <main className="flex min-h-screen items-center justify-center px-6">
      <div className="text-center">
        <h1 className="text-7xl font-bold text-cyan-600">404</h1>

        <h2 className="mt-4 text-3xl font-bold">
          Page Not Found
        </h2>

        <p className="mt-3 text-gray-500">
          Sorry, the page you are looking for does not exist.
        </p>

        <Link
          href="/"
          className="mt-6 inline-block rounded-lg bg-cyan-600 px-6 py-3 font-semibold text-white hover:bg-cyan-700"
        >
          Back to Home
        </Link>
      </div>
    </main>
  );
}

