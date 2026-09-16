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

---

## 🛠️ Absolute Beginner Guide (For a Fresh PC)

If you are setting this up on a brand new computer that has **no development tools installed**, follow these steps from scratch:

### 1. Install Git
Git allows you to download (clone) the code from GitHub.
* **Windows:** Download and install from [gitforwindows.org](https://gitforwindows.org/)
* **Mac:** Open the Terminal app and type `git --version`. It will prompt you to install the Apple Developer Tools if you don't have them. (Alternatively, download from [git-scm.com](https://git-scm.com/downloads)).

### 2. Install Node.js & npm
Node.js is the runtime environment that powers the application, and `npm` is the package manager that installs the required dependencies.
* Go to [nodejs.org](https://nodejs.org/).
* Download and install the **LTS (Long Term Support)** version.
* *Note: The installer automatically includes `npm`.*

### 3. Open your Terminal / Command Prompt
* **Windows:** Press the Windows Key, type `cmd` or `PowerShell`, and hit Enter.
* **Mac:** Press Command + Space, type `Terminal`, and hit Enter.

### 4. Verify Installations
Type these commands and press Enter to ensure they were installed correctly (you should see version numbers):
```bash
git --version
node -v
npm -v
```

### 5. Download and Run FlexPay
Now you can follow the standard setup process. Paste these commands one by one into your terminal:

```bash
# Download the code to your computer
git clone https://github.com/Yeetl3r/FlexPay.git

# Enter the project folder
cd FlexPay

# Install all the project dependencies
npm install

# Setup the database and generate demo data
npm run db:setup

# Start the application!
npm run dev
```

Open your web browser and go to **[http://localhost:3000](http://localhost:3000)**!
