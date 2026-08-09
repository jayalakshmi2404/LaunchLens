import { useEffect, useRef } from 'react'
import Chart from 'chart.js/auto'

export default function BarChart({ data, labels }) {
  const canvasRef = useRef(null)
  const chartRef = useRef(null)

  useEffect(() => {
    if (chartRef.current) chartRef.current.destroy()

    const ctx = canvasRef.current.getContext('2d')
    const gradient = ctx.createLinearGradient(0, 0, 0, 300)
    gradient.addColorStop(0, '#7c3aed')
    gradient.addColorStop(1, '#06b6d4')

    chartRef.current = new Chart(canvasRef.current, {
      type: 'bar',
      data: {
        labels,
        datasets: [
          {
            label: 'SOM (₹ Cr)',
            data,
            backgroundColor: gradient,
            borderRadius: 8,
            maxBarThickness: 40,
            hoverBackgroundColor: '#a78bfa',
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            display: true,
            position: 'top',
            align: 'end',
            labels: { usePointStyle: true, pointStyle: 'rect', font: { size: 12, family: 'Inter' }, color: '#a8adcf' },
          },
          tooltip: {
            backgroundColor: 'rgba(10,12,28,0.95)',
            titleFont: { family: 'Inter', size: 12, weight: '600' },
            bodyFont: { family: 'IBM Plex Mono', size: 12 },
            padding: 10,
            cornerRadius: 8,
            borderColor: 'rgba(255,255,255,0.1)',
            borderWidth: 1,
            displayColors: false,
            callbacks: { label: (c) => ' ₹' + c.parsed.y + ' Cr' },
          },
        },
        scales: {
          y: {
            grid: { color: 'rgba(255,255,255,0.07)' },
            border: { display: false },
            ticks: { callback: (v) => '₹' + v + 'Cr', font: { size: 11, family: 'Inter' }, color: '#6b7299', padding: 8 },
            title: { display: true, text: 'SOM (₹ Crore)', font: { size: 12, weight: '600', family: 'Inter' }, color: '#a8adcf' },
          },
          x: {
            grid: { display: false },
            border: { color: 'rgba(255,255,255,0.12)' },
            ticks: { font: { size: 11, family: 'Inter' }, color: '#6b7299' },
            title: { display: true, text: 'Year', font: { size: 12, weight: '600', family: 'Inter' }, color: '#a8adcf' },
          },
        },
      },
    })

    return () => {
      if (chartRef.current) chartRef.current.destroy()
    }
  }, [data, labels])

  return (
    <div style={{ height: 300 }}>
      <canvas ref={canvasRef} />
    </div>
  )
}
