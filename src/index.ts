import CronParser from './CronParser';

/**
 * Parse a cron string from the command line argument and print its parts.
 *
 * The user should provide a cron string as the first command line argument.
 * The cron string should have six fields. The first five fields represent the
 * time of day and the sixth field represents the command to run.
 *
 * Example usage:
 * node dist/index.js "0 0 1 1 1 /usr/bin/find"
 */
function main() {
  const cronString = process.argv[2];
  if (!cronString) {
    console.error('Please provide a cron string as an argument.');
    process.exit(1);
  }

  try {
    const parser = new CronParser();
    const values = parser.parse(cronString);
    parser.formatter(values);
    process.exit(1);
  } catch (e) {
    console.error(e);
    process.exit(1);
  }
}

main();
