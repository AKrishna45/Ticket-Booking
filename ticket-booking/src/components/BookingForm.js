import React, { useState } from 'react';
import Icon from '../icons';
import { DEPARTMENTS, YEARS } from '../data';
import SuccessPage from './SuccessPage';

const STEPS = ['Your Details', 'Payment', 'Confirmation'];

function BookingForm({ booking, onSuccess, onBack }) {
  const { event, selectedType, qty, total } = booking;

  const [step, setStep] = useState(0);
  const [form, setForm] = useState({
    name: '', email: '', phone: '', dept: '', rollno: '', year: '',
  });
  const [errors, setErrors] = useState({});
  const [payMethod, setPayMethod] = useState('upi');
  const [upiId, setUpiId] = useState('');
  const [agreed, setAgreed] = useState(false);
  const [processing, setProcessing] = useState(false);

  const upd = (k, v) => {
    setForm((f) => ({ ...f, [k]: v }));
    setErrors((e) => ({ ...e, [k]: '' }));
  };

  const validate = () => {
    const e = {};
    if (!form.name.trim()) e.name = 'Full name is required';
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = 'Enter a valid email address';
    if (!/^\d{10}$/.test(form.phone)) e.phone = 'Enter a valid 10-digit mobile number';
    if (!form.dept) e.dept = 'Please select your department';
    if (!form.rollno.trim()) e.rollno = 'Roll number is required';
    if (!form.year) e.year = 'Please select your year';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleNext = () => {
    if (step === 0) {
      if (!validate()) return;
      setStep(1);
    } else if (step === 1) {
      if (!agreed) {
        alert('Please agree to the terms & conditions to proceed.');
        return;
      }
      setProcessing(true);
      setTimeout(() => {
        setProcessing(false);
        setStep(2);
      }, 2000);
    }
  };

  // Step 2 = success
  if (step === 2) {
    return <SuccessPage booking={booking} form={form} onHome={onSuccess} />;
  }

  // Processing overlay
  if (processing) {
    return (
      <div className="form-page page-enter">
        <div className="processing">
          <div className="spinner" />
          <div className="processing-text">Processing your payment…</div>
        </div>
      </div>
    );
  }

  const fields1 = [
    { k: 'name', label: 'Full Name', icon: 'user', placeholder: 'e.g. Arjun Sharma', type: 'text' },
    { k: 'email', label: 'Email Address', icon: 'mail', placeholder: 'you@college.edu', type: 'email' },
    { k: 'phone', label: 'Mobile Number', icon: 'phone', placeholder: '10-digit number', type: 'tel' },
    { k: 'rollno', label: 'Roll Number', icon: 'idCard', placeholder: 'e.g. 21CS4567', type: 'text' },
  ];

  return (
    <div className="form-page page-enter">
      <button className="back-btn" onClick={onBack}>
        <Icon name="arrowLeft" size={15} /> Back
      </button>

      {/* Steps */}
      <div className="form-steps">
        {STEPS.map((s, i) => (
          <React.Fragment key={s}>
            <div className="step-item">
              <div className={'step-num ' + (i < step ? 'done' : i === step ? 'active' : 'inactive')}>
                {i < step ? <Icon name="check" size={13} /> : i + 1}
              </div>
              <span className={'step-label ' + (i === step ? 'active' : 'inactive')}>{s}</span>
            </div>
            {i < STEPS.length - 1 && <div className="step-connector" />}
          </React.Fragment>
        ))}
      </div>

      {/* ── STEP 0: Details ── */}
      {step === 0 && (
        <>
          <div className="form-title">Your Details</div>
          <div className="form-sub">Enter your information to complete the booking.</div>

          <div className="form-grid">
            {fields1.map((f) => (
              <div className="field" key={f.k}>
                <label className="field-label">
                  <Icon name={f.icon} size={12} /> {f.label}
                </label>
                <input
                  className={'field-input' + (errors[f.k] ? ' error' : '')}
                  type={f.type}
                  placeholder={f.placeholder}
                  value={form[f.k]}
                  onChange={(e) => upd(f.k, e.target.value)}
                />
                {errors[f.k] && <span className="field-error">{errors[f.k]}</span>}
              </div>
            ))}
          </div>

          <div className="form-grid">
            <div className="field">
              <label className="field-label">Department</label>
              <select
                className={'field-input' + (errors.dept ? ' error' : '')}
                value={form.dept}
                onChange={(e) => upd('dept', e.target.value)}
              >
                <option value="">Select department</option>
                {DEPARTMENTS.map((d) => <option key={d} value={d}>{d}</option>)}
              </select>
              {errors.dept && <span className="field-error">{errors.dept}</span>}
            </div>

            <div className="field">
              <label className="field-label">Year of Study</label>
              <select
                className={'field-input' + (errors.year ? ' error' : '')}
                value={form.year}
                onChange={(e) => upd('year', e.target.value)}
              >
                <option value="">Select year</option>
                {YEARS.map((y) => <option key={y} value={y}>{y}</option>)}
              </select>
              {errors.year && <span className="field-error">{errors.year}</span>}
            </div>
          </div>
        </>
      )}

      {/* ── STEP 1: Payment ── */}
      {step === 1 && (
        <>
          <div className="form-title">Payment</div>
          <div className="form-sub">Review your order and complete the payment.</div>

          {/* Order Summary */}
          <div className="order-summary">
            <div className="summary-title">Order Summary</div>
            {[
              ['Event', event.title],
              ['Ticket Type', selectedType.label],
              ['Quantity', `${qty} ticket(s)`],
              ['Subtotal', `₹${selectedType.price * qty}`],
              ['Convenience Fee', `₹${qty * 10}`],
            ].map(([l, v]) => (
              <div className="summary-row" key={l}>
                <span className="s-label">{l}</span>
                <span>{v}</span>
              </div>
            ))}
            <div className="summary-row total">
              <span className="s-label">Total Amount</span>
              <span style={{ color: event.color, fontFamily: 'Syne, sans-serif', fontWeight: 800, fontSize: '1.1rem' }}>
                ₹{total}
              </span>
            </div>
          </div>

          {/* Payment Method */}
          <span className="payment-section-label">Payment Method</span>
          <div className="payment-methods">
            {[
              ['upi', '💳 UPI / QR Code'],
              ['netbanking', '🏦 Net Banking'],
              ['card', '💳 Debit / Credit Card'],
              ['wallet', '👝 Wallet'],
            ].map(([id, label]) => (
              <div
                key={id}
                className={'pay-method' + (payMethod === id ? ' selected' : '')}
                style={payMethod === id ? { borderColor: event.color, background: event.color + '10' } : {}}
                onClick={() => setPayMethod(id)}
              >
                {label}
              </div>
            ))}
          </div>

          {/* UPI Input */}
          {payMethod === 'upi' && (
            <div className="field" style={{ marginBottom: 20 }}>
              <label className="field-label">UPI ID</label>
              <input
                className="field-input"
                type="text"
                placeholder="yourname@upi"
                value={upiId}
                onChange={(e) => setUpiId(e.target.value)}
              />
            </div>
          )}

          {/* Card Inputs */}
          {payMethod === 'card' && (
            <div style={{ marginBottom: 20 }}>
              <div className="field" style={{ marginBottom: 14 }}>
                <label className="field-label"><Icon name="creditCard" size={12} /> Card Number</label>
                <input className="field-input" type="text" placeholder="1234 5678 9012 3456" maxLength={19} />
              </div>
              <div className="form-grid" style={{ marginBottom: 0 }}>
                <div className="field">
                  <label className="field-label">Expiry Date</label>
                  <input className="field-input" type="text" placeholder="MM / YY" maxLength={7} />
                </div>
                <div className="field">
                  <label className="field-label">CVV</label>
                  <input className="field-input" type="password" placeholder="•••" maxLength={4} />
                </div>
              </div>
            </div>
          )}

          {/* Terms */}
          <label className="terms-row">
            <input
              type="checkbox"
              checked={agreed}
              onChange={(e) => setAgreed(e.target.checked)}
            />
            I agree to the event terms & conditions. I understand tickets are non-refundable once booked and all information provided is accurate.
          </label>
        </>
      )}

      {/* Actions */}
      <div className="form-actions">
        {step > 0 && (
          <button className="btn-secondary" onClick={() => setStep((s) => s - 1)}>
            Back
          </button>
        )}
        <button
          className="btn-primary"
          style={{ background: event.color, color: 'white' }}
          onClick={handleNext}
        >
          {step === 1
            ? <><Icon name="ticket" size={16} /> Confirm & Pay</>
            : <>Next <Icon name="arrowRight" size={16} /></>}
        </button>
      </div>
    </div>
  );
}

export default BookingForm;
