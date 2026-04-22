import React from 'react';
import Icon from '../icons';

function EventCard({ event, onSelect }) {
  const pct = Math.round((event.booked / event.capacity) * 100);
  const soldOut = pct >= 100;
  const fillColor = soldOut ? '#EF476F' : pct > 80 ? '#FFD166' : event.color;

  return (
    <div className="event-card" onClick={() => !soldOut && onSelect(event)}>
      <div className="card-header">
        <div className="card-accent-bar" style={{ background: event.color }} />
        <div
          className="card-category"
          style={{ background: event.color + '22', color: event.color }}
        >
          {event.category}
        </div>
        <div className="card-title">{event.title}</div>
        <div className="card-subtitle">{event.subtitle}</div>
        <div className="card-meta">
          <div className="meta-row">
            <Icon name="calendar" size={14} /> {event.date}
          </div>
          <div className="meta-row">
            <Icon name="clock" size={14} /> {event.time}
          </div>
          <div className="meta-row">
            <Icon name="location" size={14} /> {event.venue}
          </div>
        </div>
      </div>

      <div className="card-body">
        <p className="card-desc">
          {event.description.length > 115
            ? event.description.slice(0, 115) + '…'
            : event.description}
        </p>
        <div className="card-tags">
          {event.tags.map((t) => (
            <span key={t} className="tag">{t}</span>
          ))}
        </div>
      </div>

      <div className="card-footer">
        <div className="capacity-info">
          <span className="capacity-text">
            {event.booked}/{event.capacity} registered
          </span>
          <div className="capacity-bar">
            <div
              className="capacity-fill"
              style={{ width: pct + '%', background: fillColor }}
            />
          </div>
        </div>
        <button
          className="book-btn"
          disabled={soldOut}
          style={{
            background: soldOut ? 'var(--surface2)' : event.color,
            color: soldOut ? 'var(--muted)' : 'white',
          }}
          onClick={(e) => {
            e.stopPropagation();
            if (!soldOut) onSelect(event);
          }}
        >
          {soldOut ? 'Sold Out' : (
            <><Icon name="ticket" size={14} /> Book Now</>
          )}
        </button>
      </div>
    </div>
  );
}

export default EventCard;
