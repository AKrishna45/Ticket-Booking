# EventPass — Department Ticket Booking App

A React JS web application for booking tickets to internal department events like tech fests, seminars, and hackathons.

## 🚀 How to Run

### Prerequisites
- Node.js installed (download from https://nodejs.org if not installed)
- VS Code or any terminal

### Steps

1. **Open the project folder in terminal / VS Code terminal**

2. **Install dependencies** (only needed once):
   ```bash
   npm install
   ```

3. **Start the app**:
   ```bash
   npm start
   ```

4. The app will open automatically at **http://localhost:3000**

---

## 📁 Project Structure

```
ticket-booking/
├── public/
│   └── index.html          ← HTML entry point
├── src/
│   ├── components/
│   │   ├── EventCard.js     ← Event listing card
│   │   ├── EventDetail.js   ← Event detail + ticket selection
│   │   ├── BookingForm.js   ← 2-step booking form
│   │   └── SuccessPage.js   ← Booking confirmation + e-ticket
│   ├── App.js               ← Main app with page routing
│   ├── data.js              ← Events data
│   ├── icons.js             ← SVG icon components
│   ├── styles.css           ← All styles
│   ├── index.css            ← Global reset
│   └── index.js             ← React entry point
├── package.json
└── README.md
```

## ✨ Features

- Browse 3 events: TechFest, DevSummit, CodeSprint
- View event details with ticket types & pricing
- 2-step booking form with validation
- Multiple payment methods (UPI, Card, Net Banking, Wallet)
- E-ticket generation with unique Ticket ID
- Capacity tracking with progress bars
- Fully responsive design
