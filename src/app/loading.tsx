export default function Loading() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-pink-50 to-amber-50">
      <div className="text-center">
        <div className="mb-4 inline-block size-16 animate-spin rounded-full border-4 border-pink-200 border-t-pink-600"></div>
        <p className="text-lg font-medium text-slate-700">Loading the Candyverse...</p>
      </div>
    </div>
  );
}
