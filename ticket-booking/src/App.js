import React, { useState } from 'react';
import './index.css';
import './styles.css';
import { EVENTS } from './data';
import Icon from './icons';
import EventCard from './components/EventCard';
import EventDetail from './components/EventDetail';
import BookingForm from './components/BookingForm';

function App() {
  const [page, setPage] = useState('home');       // 'home' | 'detail' | 'book'
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [bookingData, setBookingData] = useState(null);

  const goHome = () => {
    setPage('home');
    setSelectedEvent(null);
    setBookingData(null);
  };

  const handleSelectEvent = (event) => {
    setSelectedEvent(event);
    setPage('detail');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleBook = (data) => {
    setBookingData(data);
    setPage('book');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleBackFromBook = () => {
    setPage('detail');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const totalRegistered = EVENTS.reduce((a, e) => a + e.booked, 0);

  return (
    <div className="app">
      {/* NAV */}
      <nav className="nav">
        <div className="nav-brand" onClick={goHome}>
          <div className="nav-dot" />
          EventPass
        </div>
        <div className="nav-badge">Internal Department Events</div>
      </nav>

      {/* HOME */}
      {page === 'home' && (
        <>
          <section className="hero">
            <div className="hero-eyebrow">
              <Icon name="star" size={12} /> Department Events Portal
            </div>
            <h1 className="hero-title">
              Book Your <span className="outline">Spot</span>
              <br />at the Best
              <br />Events
            </h1>
            <p className="hero-sub">
              Discover and register for technical fests, seminars, hackathons, and
              workshops happening across departments.
            </p>
            <div className="hero-stats">
              <div className="stat">
                <span className="stat-num">{EVENTS.length}</span>
                <span className="stat-label">Upcoming Events</span>
              </div>
              <div className="stat">
                <span className="stat-num">{totalRegistered}</span>
                <span className="stat-label">Already Registered</span>
              </div>
              <div className="stat">
                <span className="stat-num">₹1.5L</span>
                <span className="stat-label">Prize Pool</span>
              </div>
            </div>
          </section>

          <section className="section">
            <div className="section-header">
              <span className="section-title">Upcoming Events</span>
              <span className="section-count">{EVENTS.length} events</span>
            </div>
            <div className="events-grid">
              {EVENTS.map((e) => (
                <EventCard key={e.id} event={e} onSelect={handleSelectEvent} />
              ))}
            </div>
          </section>
        </>
      )}

      {/* DETAIL */}
      {page === 'detail' && selectedEvent && (
        <EventDetail
          event={selectedEvent}
          onBook={handleBook}
          onBack={goHome}
        />
      )}

      {/* BOOKING FORM */}
      {page === 'book' && bookingData && (
        <BookingForm
          booking={bookingData}
          onSuccess={goHome}
          onBack={handleBackFromBook}
        />
      )}
    </div>
  );
}

export default App;
