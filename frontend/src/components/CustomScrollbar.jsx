import { useEffect, useRef, useState } from 'react'
import './CustomScrollbar.css'

/**
 * Renders a visible, draggable scrollbar thumb for the scrollable element
 * referenced by `targetRef`. Needed because modern Chrome/Edge "overlay
 * scrollbars" render natively invisible-until-hover and ignore custom
 * ::-webkit-scrollbar CSS entirely - so we replace the scrollbar with a
 * normal positioned element instead of fighting the browser for control
 * of the native one.
 */
export default function CustomScrollbar({ targetRef }) {
  const [thumb, setThumb] = useState({ top: 0, height: 0, visible: false })
  const draggingRef = useRef(null)

  useEffect(() => {
    const el = targetRef.current
    if (!el) return

    function update() {
      const { scrollTop, scrollHeight, clientHeight } = el
      if (scrollHeight <= clientHeight + 1) {
        setThumb((t) => ({ ...t, visible: false }))
        return
      }
      const thumbHeight = Math.max((clientHeight / scrollHeight) * clientHeight, 28)
      const maxTop = clientHeight - thumbHeight
      const top = (scrollTop / (scrollHeight - clientHeight)) * maxTop
      setThumb({ top, height: thumbHeight, visible: true })
    }

    update()
    el.addEventListener('scroll', update, { passive: true })
    const ro = new ResizeObserver(update)
    ro.observe(el)
    window.addEventListener('resize', update)
    return () => {
      el.removeEventListener('scroll', update)
      ro.disconnect()
      window.removeEventListener('resize', update)
    }
  }, [targetRef])

  const onThumbMouseDown = (e) => {
    e.preventDefault()
    const el = targetRef.current
    if (!el) return
    draggingRef.current = {
      startY: e.clientY,
      startScrollTop: el.scrollTop,
      clientHeight: el.clientHeight,
      scrollHeight: el.scrollHeight,
      thumbHeight: thumb.height,
    }
    document.addEventListener('mousemove', onMouseMove)
    document.addEventListener('mouseup', onMouseUp)
  }

  const onMouseMove = (e) => {
    const el = targetRef.current
    const drag = draggingRef.current
    if (!el || !drag) return
    const delta = e.clientY - drag.startY
    const trackRange = drag.clientHeight - drag.thumbHeight
    const scrollRange = drag.scrollHeight - drag.clientHeight
    if (trackRange <= 0) return
    el.scrollTop = drag.startScrollTop + (delta / trackRange) * scrollRange
  }

  const onMouseUp = () => {
    draggingRef.current = null
    document.removeEventListener('mousemove', onMouseMove)
    document.removeEventListener('mouseup', onMouseUp)
  }

  const onTrackClick = (e) => {
    const el = targetRef.current
    if (!el || e.target.classList.contains('custom-scrollbar-thumb')) return
    const trackRect = e.currentTarget.getBoundingClientRect()
    const clickY = e.clientY - trackRect.top
    const ratio = clickY / trackRect.height
    el.scrollTop = ratio * (el.scrollHeight - el.clientHeight)
  }

  if (!thumb.visible) return null

  return (
    <div className="custom-scrollbar-track" onClick={onTrackClick}>
      <div
        className="custom-scrollbar-thumb"
        style={{ top: thumb.top, height: thumb.height }}
        onMouseDown={onThumbMouseDown}
      />
    </div>
  )
}
