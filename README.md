# Advent of Code 2025

Solutions for Advent of Code 2025 in TypeScript.

## Setup

Install dependencies:

```bash
yarn install
```

## Project Structure

Each day has its own folder (`day-1`, `day-2`, etc.) containing:
- `index.ts` - Main solution code
- `index.test.ts` - Test file with Vitest
- `input.txt` - Puzzle input

## Running Solutions

Run a specific day's solution:

```bash
yarn day day-1/index.ts
```

## Testing

Run all tests:

```bash
yarn test
```

Run tests in watch mode:

```bash
yarn test
```

Run tests with UI:

```bash
yarn test:ui
```

Run tests once:

```bash
yarn test:run
```

## Creating a New Day

Create a new folder for each day following the pattern:

```bash
mkdir day-2
cp day-1/index.ts day-2/
cp day-1/index.test.ts day-2/
cp day-1/input.txt day-2/
```

Then update the solution in `day-2/index.ts` and add your input to `day-2/input.txt`.
