import React, { useState } from 'react';
import Icon from '../icons';

function EventDetail({ event, onBook, onBack }) {
  const [selectedType, setSelectedType] = useState(event.ticketTypes[0]);
  const [qty, setQty] = useState(1);

  const pct = Math.round((event.booked / event.capacity) * 100);
  const remaining = event.capacity - event.booked;
  const subtotal = selectedType.price * qty;
  const fee = qty * 10;
  const total = subtotal + fee;

  const metaItems = [
    { icon: 'calendar', label: 'Date', value: event.date },
    { icon: 'clock', label: 'Time', value: event.time },
    { icon: 'location', label: 'Venue', value: event.venue },
    { icon: 'users', label: 'Capacity', value: `${event.booked}/${event.capacity} booked (${pct}%)` },
  ];

  return (
    <div className="detail-page page-enter">
      <button className="back-btn" onClick={onBack}>
        <Icon name="arrowLeft" size={15} /> All Events
      </button>

      <div className="detail-grid">
        {/* LEFT */}
        <div className="detail-left">
          <div
            className="detail-badge"
            style={{ background: event.color + '22', color: event.color }}
          >
            <Icon name="star" size={12} /> {event.category}
          </div>

          <h1 className="detail-title">{event.title}</h1>
          <p className="detail-subtitle">{event.subtitle}</p>

          <div className="detail-meta-grid">
            {metaItems.map((m) => (
              <div className="detail-meta-item" key={m.label}>
                <span className="detail-meta-icon" style={{ color: event.color }}>
                  <Icon name={m.icon} size={18} />
                </span>
                <div>
                  <div className="detail-meta-label">{m.label}</div>
                  <div className="detail-meta-value">{m.value}</div>
                </div>
              </div>
            ))}
          </div>

          <p className="detail-desc">{event.description}</p>

          <div className="detail-tags">
            {event.tags.map((t) => (
              <span key={t} className="detail-tag">{t}</span>
            ))}
          </div>
        </div>

        {/* RIGHT — TICKET PANEL */}
        <div className="ticket-panel">
          <div className="panel-card">
            <div
              className="panel-header"
              style={{ borderTop: `3px solid ${event.color}` }}
            >
              <div className="panel-title">Select Ticket</div>
              <div className="panel-sub">
                Starting from ₹{Math.min(...event.ticketTypes.map((t) => t.price))}
              </div>
            </div>

            <div className="panel-body">
              {/* Ticket Types */}
              <div className="ticket-types">
                {event.ticketTypes.map((t) => {
                  const isSelected = selectedType.id === t.id;
                  return (
                    <div
                      key={t.id}
                      className="ticket-type"
                      style={
                        isSelected
                          ? { borderColor: event.color, background: event.color + '10' }
                          : {}
                      }
                      onClick={() => setSelectedType(t)}
                    >
                      <div className="ticket-type-top">
                        <span className="ticket-label">{t.label}</span>
                        <span
                          className="ticket-price"
                          style={isSelected ? { color: event.color } : {}}
                        >
                          ₹{t.price}
                        </span>
                      </div>
                      <div className="ticket-perks">
                        {t.perks.map((p) => (
                          <div className="perk" key={p}>
                            <span style={{ color: event.color }}>
                              <Icon name="check" size={11} />
                            </span>
                            {p}
                          </div>
                        ))}
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Quantity */}
              <div className="qty-row">
                <span className="qty-label">Quantity</span>
                <div className="qty-ctrl">
                  <button
                    className="qty-btn"
                    disabled={qty <= 1}
                    onClick={() => setQty((q) => q - 1)}
                  >
                    −
                  </button>
                  <span className="qty-num">{qty}</span>
                  <button
                    className="qty-btn"
                    disabled={qty >= Math.min(5, remaining)}
                    onClick={() => setQty((q) => q + 1)}
                  >
                    +
                  </button>
                </div>
              </div>

              {/* Price Summary */}
              <div className="price-summary">
                <div className="price-row">
                  <span>₹{selectedType.price} × {qty}</span>
                  <span>₹{subtotal}</span>
                </div>
                <div className="price-row">
                  <span>Convenience fee</span>
                  <span>₹{fee}</span>
                </div>
                <div className="price-row">
                  <span>Total</span>
                  <span style={{ color: event.color, fontFamily: 'Syne, sans-serif', fontWeight: 800 }}>
                    ₹{total}
                  </span>
                </div>
              </div>

              <button
                className="cta-btn"
                style={{ background: event.color, color: 'white' }}
                onClick={() => onBook({ event, selectedType, qty, total })}
              >
                <Icon name="ticket" size={16} /> Proceed to Book
              </button>

              <div className="seats-left">
                {remaining <= 20
                  ? `⚠️ Only ${remaining} seats left!`
                  : `${remaining} seats remaining`}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EventDetail;
