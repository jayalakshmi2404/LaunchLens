import { useEffect, useRef } from 'react'
import Chart from 'chart.js/auto'

export default function TrendChart({ tamGrowth, samGrowth }) {
  const canvasRef = useRef(null)
  const chartRef = useRef(null)

  useEffect(() => {
    const years = ['2020', '2021', '2022', '2023', '2024', '2025', '2026']

    const buildSeries = (endRate) => {
      const start = endRate * 0.5
      return years.map((_, i) => +(start + ((endRate - start) * i) / (years.length - 1)).toFixed(1))
    }

    if (chartRef.current) {
      chartRef.current.destroy()
    }

    const ctx = canvasRef.current.getContext('2d')

    const tamGradient = ctx.createLinearGradient(0, 0, 0, 260)
    tamGradient.addColorStop(0, 'rgba(251,113,133,0.30)')
    tamGradient.addColorStop(1, 'rgba(251,113,133,0.02)')

    const samGradient = ctx.createLinearGradient(0, 0, 0, 260)
    samGradient.addColorStop(0, 'rgba(52,211,153,0.30)')
    samGradient.addColorStop(1, 'rgba(52,211,153,0.02)')

    chartRef.current = new Chart(canvasRef.current, {
      type: 'line',
      data: {
        labels: years,
        datasets: [
          {
            label: 'TAM Growth Rate (%)',
            data: buildSeries(tamGrowth),
            borderColor: '#fb7185',
            backgroundColor: tamGradient,
            tension: 0.4,
            fill: true,
            borderWidth: 2.5,
            pointRadius: 0,
            pointHoverRadius: 6,
            pointHoverBackgroundColor: '#fb7185',
            pointHoverBorderColor: '#0a0c1c',
            pointHoverBorderWidth: 2,
          },
          {
            label: 'SAM Growth Rate (%)',
            data: buildSeries(samGrowth),
            borderColor: '#34d399',
            backgroundColor: samGradient,
            tension: 0.4,
            fill: true,
            borderWidth: 2.5,
            pointRadius: 0,
            pointHoverRadius: 6,
            pointHoverBackgroundColor: '#34d399',
            pointHoverBorderColor: '#0a0c1c',
            pointHoverBorderWidth: 2,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        interaction: { mode: 'index', intersect: false },
        plugins: {
          legend: {
            display: true,
            position: 'top',
            align: 'end',
            labels: {
              usePointStyle: true,
              pointStyle: 'circle',
              font: { size: 12, family: 'Inter' },
              color: '#a8adcf',
              padding: 16,
            },
          },
          tooltip: {
            backgroundColor: 'rgba(10,12,28,0.95)',
            titleFont: { family: 'Inter', size: 12, weight: '600' },
            bodyFont: { family: 'IBM Plex Mono', size: 12 },
            padding: 10,
            cornerRadius: 8,
            borderColor: 'rgba(255,255,255,0.1)',
            borderWidth: 1,
            callbacks: { label: (c) => ' ' + c.dataset.label + ': ' + c.parsed.y + '%' },
          },
        },
        scales: {
          y: {
            grid: { color: 'rgba(255,255,255,0.07)' },
            border: { display: false },
            ticks: { callback: (v) => v + '%', font: { size: 11, family: 'Inter' }, color: '#6b7299', padding: 8 },
            title: { display: true, text: 'Growth Rate (%)', font: { size: 12, weight: '600', family: 'Inter' }, color: '#a8adcf' },
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
  }, [tamGrowth, samGrowth])

  return (
    <div style={{ height: 260 }}>
      <canvas ref={canvasRef} />
    </div>
  )
}
