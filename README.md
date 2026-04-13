# Government Scheme Awareness Portal

A comprehensive, production-ready web application designed to help citizens discover, understand, and apply for central and state government schemes easily. Built with modern web technologies for a fast, responsive, and seamless user experience.

## ✨ Features
- **Categorized Search**: Filter schemes by categories like Education, Health, Agriculture, Women & Child, and Employment.
- **Detailed Scheme Pages**: Each scheme is laid out properly detailing Eligibility, Benefits, Required Documents, and the Application Process.
- **Interactive & Accessible UI**: Responsive design with Framer Motion animations to provide a premium, government-grade frontend layout.
- **Admin Dashboard**: Secure backend for managing and adding new schemes to the database.
- **Pre-populated Database**: Contains realistic seed data for immediate testing and deployment.

## 🛠 Tech Stack
- **Framework**: [Next.js 14+ (App Router)](https://nextjs.org/)
- **UI & Styling**: [Tailwind CSS v4](https://tailwindcss.com/)
- **Database**: SQLite
- **ORM**: [Prisma v6](https://www.prisma.io/)
- **Animations**: [Framer Motion](https://www.framer.com/motion/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Validation**: [Zod](https://zod.dev/)
- **Notifications**: [Sonner](https://sonner.emilkowal.ski/)

## 🚀 Getting Started

Follow these instructions to get a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites
You need to have the following installed on your machine:
- **Node.js**: `v18.17.0` or higher
- **npm** (comes with Node.js) or **yarn** / **pnpm**
- Git

### Installation

1. **Clone the repository**
   ```bash
   git clone <your-repository-url>
   cd govproject
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up Environment Variables**
   Create a `.env` file in the root of your project directory and add your SQLite database connection string:
   ```env
   DATABASE_URL="file:./dev.db"
   ```

4. **Initialize the Database**
   This command structures your SQLite database, runs migrations, and generates the Prisma client needed for the application to interact with it:
   ```bash
   npx prisma db push
   ```

5. **Seed the Database**
   Populate the database with the initial categories and a mock catalog of 11+ government schemes to make the application immediately usable:
   ```bash
   npx prisma db seed
   ```
   *(Note: The seed script uses `tsx` defined in the package.json to run the TypeScript seeding logic.)*

6. **Start the Development Server**
   ```bash
   npm run dev
   ```

7. **Open the Application**
   Open your browser and navigate to [http://localhost:3000](http://localhost:3000) to see the portal in action!

## 📂 Project Structure Overview

- `/app`: Contains all Next.js App Router endpoints, Layouts (Header/Footer), Pages (Home, Admin, Scheme specifics), and API routes.
- `/components`: Reusable React components like `HeroSection`, `SchemeCard`, and UI components.
- `/prisma`: Contains the `schema.prisma` definition, database configurations, and `seed.ts` file for mocking data.
- `/public`: Static assets, images, and icons.

## 📜 License
This project is for demonstration and developmental purposes. Feel free to fork and customize for your needs.
