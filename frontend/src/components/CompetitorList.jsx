import { useRef } from 'react'
import CustomScrollbar from './CustomScrollbar.jsx'

export default function CompetitorList({ competitors, liveMode, onToggleLive, liveLoading }) {
  const listRef = useRef(null)

  // Always ranked by market share - highest first - so position #1/#2/#3
  // has a consistent meaning without needing a manual sort toggle.
  const list = [...competitors].sort((a, b) => b.share - a.share)

  return (
    <div className="card">
      <div className="card-head">
        <h2>Competitor Landscape</h2>
      </div>

      <label className="live-toggle">
        <input type="checkbox" checked={liveMode} onChange={onToggleLive} />
        <span>{liveLoading ? 'Fetching live stock quotes…' : 'Show live stock data (public companies only)'}</span>
      </label>

      <div className="scroll-region comp-list-region">
        <div className="comp-list" ref={listRef}>
          {list.map((c, i) => (
            <div className={'comp-card ' + c.type} key={c.name}>
              <div className="comp-top">
                <div className="comp-name">
                  <span className="rank-badge">#{i + 1}</span>
                  {c.name}
                  {c.isPublic && <span className="public-tag">NSE: {c.stockSymbol}</span>}
                </div>
                <span className={'badge ' + c.type}>{c.type}</span>
              </div>
              <div className="comp-metrics">
                <div>
                  <div className="comp-metric-label">Market Share</div>
                  <div className="comp-metric-value">{c.share}%</div>
                </div>
                <div>
                  <div className="comp-metric-label">Revenue</div>
                  <div className="comp-metric-value">{c.revenue}</div>
                </div>
                <div>
                  <div className="comp-metric-label">Growth</div>
                  <div className="comp-metric-value growth">{c.growth}</div>
                </div>
              </div>

              {liveMode && c.isPublic && (
                <div className="live-row">
                  {c.live ? (
                    <>
                      <span className="live-dot" /> Live: ₹{c.live.price} ({c.live.changePercent >= 0 ? '+' : ''}
                      {c.live.changePercent?.toFixed(2)}%) · Mkt Cap ₹{c.live.marketCapCr?.toLocaleString('en-IN')} Cr
                    </>
                  ) : (
                    <span className="live-unavailable">{c.liveError || 'Live quote unavailable right now'}</span>
                  )}
                </div>
              )}

              <div className="bar-label">Market Position</div>
              <div className="bar-track">
                <div className="bar-fill" style={{ width: c.share * 2.6 + '%' }} />
              </div>
              <div className="source-note" title={c.source}>
                Source: {c.source} · as of {c.asOf}
              </div>
            </div>
          ))}
        </div>
        <CustomScrollbar targetRef={listRef} />
      </div>
    </div>
  )
}
