/// component.

export default function WrappedField({
  label,
  children,
}: {
  label: string
  children: React.ReactNode
}) {
  return <div className='flex flex-col gap-1'>
    <label>{label}</label>
    {children}
  </div>
}