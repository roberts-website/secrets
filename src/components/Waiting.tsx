/// external dependencies.

import {
  useEffect,
  useRef,
} from 'react'

/// constants.

const SPINNER_SIZE         = 100
const SPINNER_STROKE_WIDTH = 3

/// component.

export default function Waiting({
  zIndex = 1,
}: {
  zIndex?: number
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current

    if (!canvas) return

    const ctx = canvas.getContext('2d')
    
    if (!ctx) return
    
    const foreground = getComputedStyle(document.documentElement).getPropertyValue('--foreground-color').trim() || '#000000'
    const r          = (SPINNER_SIZE - SPINNER_STROKE_WIDTH) / 2
    const cx         = SPINNER_SIZE / 2
    const cy         = SPINNER_SIZE / 2

    const gradient = ctx.createConicGradient(0, cx, cy)

    gradient.addColorStop(0, 'transparent')
    gradient.addColorStop(1, foreground)

    ctx.strokeStyle = gradient
    ctx.lineWidth   = SPINNER_STROKE_WIDTH
    ctx.lineCap     = 'round'

    ctx.beginPath()
    ctx.arc(cx, cy, r, 0, 2 * Math.PI)
    ctx.stroke()
  }, [])

  return (
    <div
      className='fixed inset-0 flex items-center justify-center'
      style    ={{ zIndex }}
    >
      <div className='absolute inset-0 bg-[var(--background-color)] opacity-70' />
      <div className='animate-spin' style={{ width: SPINNER_SIZE, height: SPINNER_SIZE }}>
        <canvas
          ref={canvasRef}

          className='block'

          width ={SPINNER_SIZE}
          height={SPINNER_SIZE}
        />
      </div>
    </div>
  )
}