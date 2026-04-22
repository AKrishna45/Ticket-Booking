import React, { useState } from 'react';
import Icon from '../icons';

// Generate a random ticket ID once
function genId() {
  return 'TKT-' + Math.random().toString(36).slice(2, 6).toUpperCase() +
    '-' + Math.random().toString(36).slice(2, 6).toUpperCase();
}

// Decorative barcode
function Barcode() {
  const heights = [22, 36, 28, 18, 42, 24, 32, 16, 40, 26, 20, 34, 28, 18, 44, 25, 30, 15, 38, 22, 28, 18, 40, 26, 32, 20, 36, 18, 24, 42];
  return (
    <div className="barcode">
      {heights.map((h, i) => (
        <div key={i} className="bar" style={{ width: 3, height: h, background: 'var(--muted)', borderRadius: 1 }} />
      ))}
    </div>
  );
}

function SuccessPage({ booking, form, onHome }) {
  const { event, selectedType, qty, total } = booking;
  const [ticketId] = useState(genId);

  const eticketFields = [
    { label: 'Attendee', value: form.name },
    { label: 'Roll No.', value: form.rollno },
    { label: 'Ticket Type', value: selectedType.label },
    { label: 'Quantity', value: `${qty} ticket(s)` },
    { label: 'Date', value: event.date },
    { label: 'Venue', value: event.venue },
    { label: 'Department', value: form.dept },
    { label: 'Amount Paid', value: `₹${total}` },
  ];

  return (
    <div className="success-page page-enter">
      {/* Icon */}
      <div className="success-icon">
        <span style={{ color: '#06D6A0' }}>
          <Icon name="check" size={38} />
        </span>
      </div>

      <h1 className="success-title">Booking Confirmed! 🎉</h1>
      <p className="success-sub">
        Your ticket has been booked successfully. A confirmation will be sent to{' '}
        <strong style={{ color: 'var(--text)' }}>{form.email}</strong>
      </p>

      {/* E-Ticket */}
      <div className="eticket">
        <div className="eticket-top">
          <div
            className="eticket-accent"
            style={{ background: `linear-gradient(90deg, ${event.color}, ${event.accent})` }}
          />
          <div className="eticket-event">{event.title}</div>
          <div className="eticket-sub">{event.subtitle}</div>
          <div className="eticket-meta">
            {eticketFields.map((f) => (
              <div className="eticket-field" key={f.label}>
                <label>{f.label}</label>
                <span>{f.value}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Tear line */}
        <div className="eticket-divider">
          <div className="eticket-notch" />
        </div>

        <div className="eticket-bottom">
          <div>
            <div className="ticket-id-label">Ticket ID</div>
            <div className="ticket-id" style={{ color: event.color }}>{ticketId}</div>
          </div>
          <Barcode />
        </div>
      </div>

      {/* Actions */}
      <div className="success-actions">
        <button
          className="btn-secondary"
          style={{ display: 'flex', alignItems: 'center', gap: 8 }}
          onClick={() => window.print()}
        >
          <Icon name="download" size={15} /> Download / Print
        </button>
        <button
          className="btn-primary"
          style={{ background: event.color, color: 'white' }}
          onClick={onHome}
        >
          <Icon name="home" size={15} /> Back to Events
        </button>
      </div>
    </div>
  );
}

export default SuccessPage;
