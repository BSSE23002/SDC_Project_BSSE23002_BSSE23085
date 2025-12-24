
# ITU Department Resource Booking System

A university-level production architecture for departmental resource management.

## 📁 Project Structure
- **/frontend**: React 18 SPA (Vite/TS/Tailwind)
  - `App.tsx`: Auth & Routing logic
  - `services/api.ts`: Real Axios communication with backend
- **/backend**: Node.js & Express.js REST API
  - `server.ts`: API entry point
  - `routes/`: Modular endpoints for Auth, Resources, and Bookings
  - `middleware/`: JWT verification and RBAC
  - `db/`: DynamoDB-ready data access layer

## 🚀 AWS Academy Deployment Logic

### 1. Frontend (Static Hosting)
- **Service**: Amazon S3 + Amazon CloudFront
- **Steps**:
  1. `npm run build` from the frontend root.
  2. Upload `dist/` to an S3 bucket configured for static website hosting.
  3. Create a CloudFront Distribution for HTTPS and edge caching.

### 2. Backend (Application Layer)
- **Service**: Amazon EC2 + Application Load Balancer
- **Steps**:
  1. Launch EC2 (Amazon Linux 2) in a **Private Subnet**.
  2. Install Node.js and dependencies.
  3. Use PM2 or systemd to keep the `backend/server.ts` running.
  4. Place an ALB in the **Public Subnet** to forward port 80/443 to the EC2 instance.
  5. Use a **NAT Gateway** so EC2 can communicate with DynamoDB.

### 3. Database (Persistence)
- **Service**: Amazon DynamoDB
- **Tables**:
  - `Users`: (Partition Key: `email`)
  - `Resources`: (Partition Key: `id`)
  - `Bookings`: (Partition Key: `id`, GSI: `userId`, `resourceId`)

## 🔐 Security (IAM)
- The EC2 instance must have an IAM Role with permissions:
  - `dynamodb:PutItem`, `dynamodb:GetItem`, `dynamodb:UpdateItem`, `dynamodb:Query`
  - `logs:CreateLogStream`, `logs:PutLogEvents` (for CloudWatch)

## 🧪 Quick Test
- **Admin**: `admin@itu.edu.pk` / `password`
- **Domain Restriction**: Only emails ending in `@itu.edu.pk` are permitted.
