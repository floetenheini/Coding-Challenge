# Welcome

Welcome to your coding challenge.
The following tasks are meant to test your capability in programming and structuring a modern web application.
After you finished the challenge, we will have a short interview to discuss your solution and the decisions you made.

## Tasks

We want you to build a frontend for the GitHub GraphQL API.

The frontend should allow to browse the issues of a GitHub repository, specifically of the [official React repository](https://github.com/facebook/react).
Your app should allow to:

- Display the issues of the repository
- Display the details of a specific issue
- Display all the comments of a specific issue
- Filter the issues by different criteria (e.g. open/closed, etc.)

### Nice To Have

If you have time and want to go the extra mile, you can also implement the following features:

- Search functionality to search for issues by title or body
- Pagination to load more issues
- Unit tests for your components and functions

## Getting Started

We prepared a basic project for you to get started with your coding challenge.
It is a simple [Next.js](https://nextjs.org) project bootstrapped with [
`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app). Apart from this the tech stack is
similar to what we use for the actual MediaMarkt website. For styling we've set
up [StyledComponents](https://styled-components.com/) and data fetching is done
with [Apollo Client](https://www.apollographql.com/docs/react/). All our code uses TypeScript and is formatted with [Prettier](https://prettier.io/).

First, you need to install the dependencies:

```bash
npm install
```

Then you can run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

## Graphql

We already prepared Apollo Client pointing to the GitHub API for you to get started with Graphql.
To be able to fetch data from the GitHub API, you need to create a `.env.local` file in the root of the project and add
your GitHub token there. Check out the `.example.env`.

## Styled Components

This project uses [Styled Components](https://styled-components.com/) for styling.
You can find the global styles in `styles/GlobalStyles.tsx`.
