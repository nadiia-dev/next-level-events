# Next Level Events

Next Level Events is a web application designed to help users discover and explore various events. Built with Next.js, it offers a seamless and dynamic user experience.

## Features

- **Event Listings**: Browse a comprehensive list of upcoming events.
- **Event Search**: Filter events by year and month to find exactly what you're looking for.
- **Event Details**: View detailed information about each event, including date, location, and description.
- **Comments Section**: Engage with other users by reading and posting comments on event pages.

## Technologies Used

- **Next.js**: A React framework for server-rendered applications.
- **React**: A JavaScript library for building user interfaces.
- **CSS Modules**: For styling components in a modular and maintainable way.
- **MongoDb**: A NoSQL database for storing event data.
- **Mongoose**: An ODM (Object Data Modeling) library for MongoDB.

## Getting Started

To get a local copy up and running, follow these steps:

### Prerequisites

Ensure you have the following installed:

- [Node.js](https://nodejs.org/) (v14 or later)
- [npm](https://www.npmjs.com/) (comes with Node.js)

### Installation

1. **Clone the repository**:

```bash
git clone https://github.com/nadiia-dev/next-level-events.git
```

2. Navigate to the project directory:

```bash
cd next-level-events
```

3. Install dependencies:

```bash
npm install
```

4. Set up environment variables:

Create a .env file in the root directory and define the necessary environment variables.

```env
DB_URL= #your mongodb connection url
NEXT_PUBLIC_BASE_URL= #your app url
```

5. Start the development server:

```bash
npm run dev
```

Open http://localhost:3000 in your browser to view the application.

### Deployment

This project is deployed on Vercel.
