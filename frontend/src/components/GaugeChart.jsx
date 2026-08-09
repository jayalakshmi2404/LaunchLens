import { useEffect, useRef } from 'react'
import Chart from 'chart.js/auto'

export default function GaugeChart({ value }) {
  const canvasRef = useRef(null)
  const chartRef = useRef(null)

  useEffect(() => {
    if (chartRef.current) chartRef.current.destroy()

    chartRef.current = new Chart(canvasRef.current, {
      type: 'doughnut',
      data: {
        datasets: [
          {
            data: [value, 100 - value],
            backgroundColor: ['#7c3aed', 'rgba(255,255,255,0.08)'],
            borderWidth: 0,
          },
        ],
      },
      options: {
        circumference: 180,
        rotation: 270,
        cutout: '75%',
        plugins: { legend: { display: false }, tooltip: { enabled: false } },
      },
    })

    return () => {
      if (chartRef.current) chartRef.current.destroy()
    }
  }, [value])

  return (
    <div style={{ width: 180, height: 110, margin: '0 auto' }}>
      <canvas ref={canvasRef} width={180} height={110} />
    </div>
  )
}
