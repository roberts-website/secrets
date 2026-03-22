/// component.

export default function Modal({
  children,
  title,
  zIndex = 1,

  onClose = undefined,
}: {
  children: React.ReactNode
  title:    string
  zIndex?:  number

  onClose?: () => void
}) {
  return <div className='fixed inset-0 flex items-center justify-center'>
    <div
      className='fixed inset-0 bg-[var(--background-color)] opacity-70'
      style    ={{ zIndex }}

      onClick={onClose}
    />
    
    <div
      className='border-2 border-[var(--foreground-color)] bg-[var(--background-color)] p-4 flex flex-col gap-8'
      style    ={{ zIndex }}
    >
      <h2>{title}</h2>
      <div>
        {children}
      </div>
    </div>
  </div>
}