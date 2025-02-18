import CronPartValues from './CronPartValues';
import { iCronParts, iCronPartValues, partType } from './types';

export default class CronParser {
  constructor() {}

  /**
   * Parses a cron string and returns an object with the corresponding values.
   *
   * Given a cron string, parses it and returns an object with the following
   * properties:
   *   - minute: an array of numbers from 0-59
   *   - hour: an array of numbers from 0-23
   *   - dayOfMonth: an array of numbers from 1-31
   *   - month: an array of numbers from 1-12
   *   - dayOfWeek: an array of numbers from 0-6 (0 = Sunday, 1 = Monday, etc.)
   *   - command: a string representing the command to run
   *
   * Throws an error if the cronString is not valid.
   * @param {string} cronString - a valid cron string
   * @return {iCronPartValues} - an object with the parsed values
   */
  public parse(cronString: string) {
    const parts: iCronParts = this.splitCronString(cronString);
    const result: iCronPartValues = {
      minute: [],
      hour: [],
      dayOfMonth: [],
      month: [],
      dayOfWeek: [],
      command: '',
    };
    for (const part in parts) {
      if (part === 'command') {
        result.command = parts.command;
        continue;
      }
      const value = parts[part as partType];
      const cronPartValues = new CronPartValues(part as partType, value);
      result[part as partType] = cronPartValues.getValues();
    }
    return result;
  }

  /**
   * Splits a cron string into its component parts.
   *
   * Throws an error if the cronString is not valid.
   * @param {string} cronString - a valid cron string
   * @return {iCronParts} - an object with the corresponding values
   */
  private splitCronString(cronString: string): iCronParts {
    const parts = cronString.split(' ');
    if (parts.length < 6) {
      throw new Error('Invalid cron string: must have six fields');
    }
    const command = parts.slice(5).join(' ');
    return {
      minute: parts[0],
      hour: parts[1],
      dayOfMonth: parts[2],
      month: parts[3],
      dayOfWeek: parts[4],
      command,
    };
  }

  /**
   * A simple formatter that logs the values of a cron string to the console.
   *
   * The output is of the form:
   * minute          0 15 30 45
   * hour            0
   * day of month    1 15
   * month           1 2 3 4 5 6 7 8 9 10 11 12
   * day of week     1 2 3 4 5
   * command         /usr/bin/find
   */
  public formatter(cronPartValues: iCronPartValues) {
    console.log(this.formatLabel('minute'), cronPartValues.minute.join(' '));
    console.log(this.formatLabel('hour'), cronPartValues.hour.join(' '));
    console.log(
      this.formatLabel('dayOfMonth'),
      cronPartValues.dayOfMonth.join(' ')
    );
    console.log(this.formatLabel('month'), cronPartValues.month.join(' '));
    console.log(
      this.formatLabel('dayOfWeek'),
      cronPartValues.dayOfWeek.join(' ')
    );
    console.log(this.formatLabel('command'), cronPartValues.command);
  }

  /**
   * Pads a string to be at least 16 characters long by adding spaces to the end.
   * @param {string} label - the string to pad
   * @return {string} the padded string
   */
  private formatLabel(label: string) {
    const values = label.split('');
    while (values.length < 16) {
      values.push(' ');
    }
    return values.join('');
  }
}
