import { useEffect, useState, useRef } from 'react'

export default function useCountUp(target, duration = 700) {
  const [value, setValue] = useState(target)
  const frameRef = useRef(null)

  useEffect(() => {
    const start = value
    const diff = target - start
    if (diff === 0) return
    const startTime = performance.now()

    function step(now) {
      const progress = Math.min((now - startTime) / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3) // ease-out cubic
      setValue(start + diff * eased)
      if (progress < 1) {
        frameRef.current = requestAnimationFrame(step)
      } else {
        setValue(target)
      }
    }

    frameRef.current = requestAnimationFrame(step)
    return () => cancelAnimationFrame(frameRef.current)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [target, duration])

  return value
}
