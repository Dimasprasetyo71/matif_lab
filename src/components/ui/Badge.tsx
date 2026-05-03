export function Badge({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-block text-xs px-3 py-1 rounded bg-purple-300 text-black border border-purple-600">
      {children}
    </span>
  )
}
