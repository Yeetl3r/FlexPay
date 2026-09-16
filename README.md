# FlexPay - AI-Powered Flexible Loan Repayment

FlexPay replaces rigid monthly loan installments with a flexible repayment system based on real human cash flow. It uses explainable statistical models to optimize repayment schedules, preventing defaults and ensuring borrowers maintain a healthy emergency cash buffer.

## Architecture & Tech Stack

This project uses a modern JavaScript/TypeScript stack. Instead of a traditional `requirements.txt` (which is typically used for Python), this project uses `package.json` to manage all required dependencies.

* **Framework:** Next.js 14 (App Router)
* **Database:** SQLite + Prisma ORM
* **Styling:** Tailwind CSS + shadcn/ui
* **Charts:** Recharts
* **AI/Math:** Pure TypeScript Explainable AI Engine

## Detailed Installation Instructions

Follow these steps to run the FlexPay prototype locally.

### Prerequisites
1. Ensure you have **Node.js** installed (v18.x or v20.x recommended). You can check your version by running `node -v`.
2. Ensure you have **npm** installed (comes bundled with Node.js). Check by running `npm -v`.
3. Ensure you have **Git** installed.

### 1. Clone the Repository
```bash
git clone https://github.com/Yeetl3r/FlexPay.git
cd FlexPay
```

### 2. Install Required Dependencies
All required libraries and dependencies are listed in the `package.json` file. Install them using:
```bash
npm install
```

### 3. Initialize the Database and Synthetic Data
This project uses a local SQLite database, meaning there are no complex database servers to set up.

Run the following command to create the database schema and populate it with synthetic data (like Farmer A and Vendor B profiles):
```bash
npx prisma generate
npx prisma db push
npx ts-node prisma/seed.ts
```
*Alternatively, you can just run the combined shortcut script:*
```bash
npm run db:setup
```

### 4. Start the Application
Start the local development server:
```bash
npm run dev
```

Open your browser and navigate to **[http://localhost:3000](http://localhost:3000)**.

### 5. Running Tests (Optional)
To verify the core AI constraint math and statistical logic, run the unit tests:
```bash
npm run test
```

## Demo Credentials
Use these credentials on the landing page to explore different personas:
* **Borrower (Farmer A - highly seasonal):** `farmer@flexpay.com` / `password123`
* **Borrower (Vendor B - stable low income):** `vendor@flexpay.com` / `password123`
* **Lender (Portfolio View):** `lender@flexpay.com` / `password123`

## Key Features
* **Repayment Optimiser:** Dynamically adjusts payments based on predicted disposable cash and a protected emergency buffer.
* **Repayment GPS:** Turn-by-turn guidance for the borrower's debt-free journey.
* **Life Events:** Allows borrowers to trigger temporary payment holidays for disasters/emergencies.
* **Auto Consolidation:** Simulates merging multiple fixed EMIs into one flexible payment window.
* **Explainable AI:** Every modified payment clearly states the arithmetic reason behind the adjustment. No black box ML.
