import { useEffect, useRef, useState } from 'react'
import './Select.css'

export default function Select({ label, value, options, onChange }) {
  const [open, setOpen] = useState(false)
  const rootRef = useRef(null)

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (rootRef.current && !rootRef.current.contains(e.target)) {
        setOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  return (
    <div className="select-root" ref={rootRef}>
      {label && <label className="select-label">{label}</label>}
      <button
        type="button"
        className={'select-trigger' + (open ? ' open' : '')}
        onClick={() => setOpen((o) => !o)}
      >
        <span>{value}</span>
        <svg
          width="14"
          height="14"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.4"
          className={'chevron' + (open ? ' flipped' : '')}
        >
          <path d="M6 9l6 6 6-6" />
        </svg>
      </button>

      {open && (
        <ul className="select-menu">
          {options.map((opt) => (
            <li
              key={opt}
              className={'select-option' + (opt === value ? ' selected' : '')}
              onClick={() => {
                onChange(opt)
                setOpen(false)
              }}
            >
              {opt}
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
