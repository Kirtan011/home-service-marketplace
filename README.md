# Home Services Marketplace

A MERN stack application implementing an on-demand home services marketplace platform.

## Design Decisions, Trade-offs, and Assumptions

### Design Decisions

#### State Management

Bookings progress through strict state transitions: `PENDING` → `ASSIGNED` → `IN_PROGRESS` → `COMPLETED`. This prevents invalid state combinations and enforces business logic constraints.

#### Authentication Model

**Explicit Trade-off**: The system implements role-based access without user authentication. This assumes a trusted environment and enables rapid prototyping. Production implementation requires JWT-based authentication with secure token storage.

#### Data Modeling

Single `Booking` collection with role-specific fields (`customerName`, `providerName`, `status`). Denormalized design prioritizes query simplicity over normalized database structure.

#### Technology Selection

- **React 19**: Component-based architecture with hooks for state management
- **Vite**: Fast build tool with <1s module replacement during development
- **Express.js + TypeScript**: Type-safe backend with compile-time error detection
- **MongoDB + Mongoose**: Cloud database with schema validation

### Trade-offs

| Aspect                          | Choice                   | Trade-off                                           |
| ------------------------------- | ------------------------ | --------------------------------------------------- |
| **Simplicity vs Features**      | Core functionality only  | Missing authentication, payments, real-time updates |
| **Learning vs Production**      | Educational code clarity | Not optimized for performance or security           |
| **Monolithic vs Microservices** | Single deployment        | No horizontal scaling support                       |
| **Synchronous vs Event-driven** | Request/response API     | No message queue or event broker                    |
| **Denormalized vs Normalized**  | Single collection        | Query simplicity over data consistency              |

### Key Assumptions

1. **Trusted Users**: No authentication layer - assumes known, trusted access only
2. **Single Instance Deployment**: Designed for localhost; not scaled for multiple users
3. **Hardcoded Demo Users**: Kirtan (customer) and Bhavesh (provider) are fixtures; real implementation requires user management
4. **No Real Payments**: Bookings tracked but no payment processing
5. **Synchronous Operations**: All requests complete within response cycle; no background jobs
6. **Development Environment**: Assumes Node.js 18+, npm 9+, and MongoDB Atlas account

## Installation and Running Instructions

### Prerequisites

- Node.js 18.x or higher
- npm 9.x or higher
- MongoDB Atlas account with connection string

### Backend Setup

```bash
cd server
npm install
```

Create `.env` file in the `server` directory:

```
MONGO_URI=mongodb+srv://<username>:<password>@<cluster>.mongodb.net/<database>
PORT=5000
NODE_ENV=development
```

### Frontend Setup

```bash
cd client
npm install
```

### Running the Application

**Terminal 1 - Start Backend Service**

```bash
cd server
npm start              # Production mode
npm run dev           # Development mode with auto-reload
npm run seed          # Initialize database with sample data
```

Backend listens on `http://localhost:5000`

**Terminal 2 - Start Frontend Application**

```bash
cd client
npm run dev           # Development server with HMR
```

Frontend accessible at `http://localhost:5173`

---
