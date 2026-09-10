export default function PageShell({ title, description, icon: Icon }) {
  return (
    <div className="flex h-full flex-col items-center justify-center gap-3 p-8 text-center">
      {Icon && (
        <span className="flex h-12 w-12 items-center justify-center rounded-full bg-gray-100 text-gray-500">
          <Icon size={22} />
        </span>
      )}
      <h1 className="text-xl font-semibold text-gray-900">{title}</h1>
      <p className="max-w-sm text-sm text-gray-500">{description}</p>
    </div>
  )
}
