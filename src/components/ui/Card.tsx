export function Card({
  title,
  children,
  icon,
}: {
  title?: string
  children: React.ReactNode
  icon?: string
}) {
  return (
    <div className="rounded-xl border border-zinc-200 dark:border-zinc-800 p-5 bg-white/80 dark:bg-zinc-900/80 backdrop-blur-sm">
      {title && (
        <h3 className="font-medium text-base mb-2 flex items-center gap-2 text-zinc-800 dark:text-zinc-200">
          {icon && <span className="opacity-70">{icon}</span>}
          {title}
        </h3>
      )}
      <div className="text-sm text-zinc-600 dark:text-zinc-400">{children}</div>
    </div>
  )
}

export function CardGrid({ children }: { children: React.ReactNode }) {
  return <div className="grid md:grid-cols-2 gap-4 my-4">{children}</div>
}
