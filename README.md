# Filter Ease

## Description

A simple and efficient product filtering system, experiencing the latest technologies, streamlines your search effortlessly.

## Feature

- Product Filtering

## Table of Contents

- [Tech Stack](#tech-stack)
- [Installation](#installation)
- [Important](#important)
- [Environment Variables](#environment-variables)
- [Starting the Development Server](#starting-the-development-server)
- [Contributing](#contributing)
- [Live Preview](#live-preview)

## Tech Stack

- TypeScript
- Next.js
- Tailwind CSS
- VectorDB

## Installation

Make sure you have Node.js installed on your machine.

Clone the repository:

```bash
git clone https://github.com/nyintosh/filter-ease.git
```

Navigate to the project directory:

```bash
cd filter-ease
```

Install dependencies:
Run one of the following commands based on your preferred package manager:

- Using npm:

```bash
npm install
```

- Using yarn:

```bash
yarn install
```

- Using pnpm:

```bash
pnpm install
```

## Important

To run this locally, make sure you've set up Vector and obtained API keys from [Upstash](https://upstash.com). Alternatively, you can utilize similar technologies and update the configuration accordingly.

## Environment Variables

This project requires the following environment variables:

- `UPSTASH_VECTOR_REST_URL`
- `UPSTASH_VECTOR_REST_TOKEN`

Make sure to set these environment variables in your development environment.

## Starting the Development Server

To start the development server:
Run one of the following commands based on your preferred package manager:

- Using npm:

```bash
npm run dev
```

- Using yarn:

```bash
yarn dev
```

- Using pnpm:

```bash
pnpm dev
```

Open your browser and navigate to http://localhost:3000 to see the app live.

## Contributing

If you want to add additional features and improvements, we welcome contributions! Please follow these guidelines:

- Fork the repository
- Create a new branch
- Make your changes
- Submit a pull request

## Live Preview

You can preview the live version of the project at [https://filter-ease.vercel.app](https://filter-ease.vercel.app).
