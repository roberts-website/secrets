/// component.

export default function WrappedField({
  label = undefined,

  children,
}: {
  label?: string | undefined

  children: React.ReactNode
}) {
  return <div className='flex flex-col gap-1'>
    {label && <label>{label}</label>}
    {children}
  </div>
}