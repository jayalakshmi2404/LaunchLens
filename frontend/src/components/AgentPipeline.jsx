import { useEffect, useState, useRef } from 'react'
import './AgentPipeline.css'

/**
 * Shows a sequence of "agent" steps running one after another (spinner ->
 * checkmark), then calls onComplete. Purely presentational - it does not
 * fetch or compute anything itself; the parent still does the real data
 * fetching in parallel and decides when to actually reveal results.
 */
export default function AgentPipeline({ steps, active, onComplete }) {
  const [currentIndex, setCurrentIndex] = useState(-1)
  const timeoutRef = useRef(null)
  const onCompleteRef = useRef(onComplete)
  onCompleteRef.current = onComplete

  useEffect(() => {
    if (!active) {
      setCurrentIndex(-1)
      return
    }

    setCurrentIndex(0)
    let i = 0

    function tick() {
      i += 1
      if (i >= steps.length) {
        setCurrentIndex(steps.length) // all done
        timeoutRef.current = setTimeout(() => onCompleteRef.current?.(), 350)
        return
      }
      setCurrentIndex(i)
      timeoutRef.current = setTimeout(tick, 550 + Math.random() * 300)
    }

    timeoutRef.current = setTimeout(tick, 550 + Math.random() * 300)

    return () => clearTimeout(timeoutRef.current)
  }, [active, steps])

  if (!active) return null

  return (
    <div className="agent-pipeline">
      <div className="agent-pipeline-header">
        <span className="agent-pulse-dot" />
        AI Analysis Agent running
      </div>
      <ul className="agent-steps">
        {steps.map((step, i) => {
          const state = i < currentIndex ? 'done' : i === currentIndex ? 'active' : 'pending'
          return (
            <li key={step} className={'agent-step ' + state}>
              <span className="agent-step-icon">
                {state === 'done' && (
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                    <path d="M20 6L9 17l-5-5" />
                  </svg>
                )}
                {state === 'active' && <span className="agent-spinner" />}
                {state === 'pending' && <span className="agent-step-dot" />}
              </span>
              <span className="agent-step-label">{step}</span>
            </li>
          )
        })}
      </ul>
    </div>
  )
}
