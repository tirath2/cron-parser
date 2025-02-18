# Cron Parser

A command-line application to parse and expand cron strings. This application handles standard cron format with five time fields (minute, hour, day of month, month, and day of week) plus a command.

## Features

- Parses cron strings and expands each field to show the times at which it will run.
- Handles wildcards (`*`), ranges (`a-b`), steps (`*/n` or `a-b/n`), and lists (`a,b,c`).
- Outputs the expanded times in a table format.

## Missing Features

- Handling of special characters `L`, `W`, and `#`.
- Handling of month and day names (e.g., `JAN`, `MON`).

## Prerequisites

- Node.js (v14 or higher)
- npm (v6 or higher)

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/your-repo/cron-parser.git
   cd cron-parser
    ```
2. Install dependencies:
    ```bash
    npm install
    ```




## Usage
To parse a cron string, run the following command:

```bash
npm start -- "*/15 0 1,15 * 1-5 /usr/bin/find"
```
Example Output

```bash
minute          0 15 30 45
hour            0
day of month    1 15
month           1 2 3 4 5 6 7 8 9 10 11 12
day of week     1 2 3 4 5
command         /usr/bin/find
```

## Running Tests

To run the tests, use the following command:

```bash
npm test
```