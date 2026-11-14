# Filter Ease

<img width="1408" alt="SCR-20240703-kgrk" src="https://github.com/nyintosh/filter-ease/assets/56629705/6e52d04f-bac0-4990-80ee-4c7d063887b5">

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
- TanStack Query
- Zod
- Cloudflare Vectorize

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

Products are stored in a [Cloudflare Vectorize](https://developers.cloudflare.com/vectorize/) index as `[color, size, price]` vectors, with their details as metadata. Filters run as metadata filters, and sorting by price queries for the vector nearest the lowest or highest price.

To set it up in your own Cloudflare account (all within the free plan):

```bash
npm install --global cf && cf auth login
cf vectorize create --name filter-ease --config-dimensions 32 --config-metric euclidean
cf vectorize metadata-index create filter-ease --property-name color --index-type string
cf vectorize metadata-index create filter-ease --property-name size --index-type string
cf vectorize metadata-index create filter-ease --property-name price --index-type number
pnpm db:seed
```

## Environment Variables

Copy `.env.example` to `.env` and set:

- `CLOUDFLARE_ACCOUNT_ID`
- `CLOUDFLARE_API_TOKEN`: an API token with the **Vectorize Read** permission

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
