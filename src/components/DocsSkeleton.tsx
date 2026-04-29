function Shimmer({ className = '' }: { className?: string }) {
  return (
    <div
      className={`
        relative overflow-hidden rounded-md bg-muted
        before:absolute before:inset-0
        before:-translate-x-full
        before:animate-[shimmer_1.5s_infinite]
        before:bg-linear-to-r
        before:from-transparent
        before:via-white/20
        before:to-transparent
        ${className}
      `}
    />
  )
}
function SkeletonTitle() {
  return <Shimmer className="h-8 w-1/2" />
}
function SkeletonDescription() {
  return <Shimmer className="h-4 w-1/3" />
}

function SkeletonParagraph({ lines = 4 }: { lines?: number }) {
  return (
    <div className="space-y-2">
      {Array.from({ length: lines }).map((_, i) => (
        <Shimmer
          key={i}
          className={`h-4 ${i === lines - 1 ? 'w-3/4' : 'w-full'}`}
        />
      ))}
    </div>
  )
}

function SkeletonCode() {
  return (
    <div className="space-y-2">
      <Shimmer className="h-4 w-1/4" /> 
      <div className="bg-muted/50 rounded-lg p-4 space-y-2">
        <Shimmer className="h-3 w-full" />
        <Shimmer className="h-3 w-5/6" />
        <Shimmer className="h-3 w-4/6" />
        <Shimmer className="h-3 w-3/6" />
      </div>
    </div>
  )
}

function SkeletonToolbar() {
  return (
    <div className="flex gap-2">
      <Shimmer className="h-8 w-20" />
      <Shimmer className="h-8 w-20" />
    </div>
  )
}

function DocsSkeleton() {
  return (
    <div className="px-6 py-8 space-y-6">
      <SkeletonTitle />
      <SkeletonDescription />

      <div className="border-b pb-6">
        <SkeletonToolbar />
      </div>

      <div className="space-y-6 pt-4">
        <SkeletonParagraph lines={4} />
        <SkeletonParagraph lines={3} />
        <SkeletonCode />
        <SkeletonParagraph lines={5} />
      </div>
    </div>
  )
}

export default DocsSkeleton
