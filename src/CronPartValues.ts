export default class CronPartValues {
  /**
   * Constructs a new CronPartValues object.
   *
   * @param {string} type - the type of the cron part (e.g. "minute", "hour", etc.)
   * @param {string} value - the value of the cron part (e.g. "*", "1-5", etc.)
   */
  constructor(
    readonly type: string,
    readonly value: string
  ) {}

  /**
   * Expands the value of the cron part into an array of numbers.
   *
   * Given the type and value of the cron part, returns an array of numbers
   * representing the corresponding values. For example, if the type is "minute"
   * and the value is "*", returns an array of numbers from 0 to 59.
   *
   * Throws an error if the type is unknown.
   * @return {number[]} - an array of numbers representing the values
   */
  public getValues() {
    switch (this.type) {
      case 'minute':
        return this.expandNumeric(0, 59);
      case 'hour':
        return this.expandNumeric(0, 23);
      case 'dayOfMonth':
        return this.expandNumeric(1, 31);
      case 'month':
        return this.expandNumeric(1, 12);
      case 'dayOfWeek':
        return this.expandNumeric(0, 6);
      default:
        throw new Error(`Unknown type: ${this.type}`);
    }
  }

  /**
   * Expands a value of a cron part into an array of numbers, given its min and max.
   *
   * Given a value of a cron part and its min and max, returns an array of numbers
   * representing the corresponding values.
   *
   * If the value is '*', returns an array of numbers from min to max.
   * If the value includes '-', expands the range (inclusive) into an array.
   * If the value includes '/', expands the interval (inclusive) into an array.
   * If the value includes ',', expands the list into an array.
   * Otherwise, returns an array with a single number: the value itself.
   * @param {number} min - the minimum value of the cron part
   * @param {number} max - the maximum value of the cron part
   * @return {number[]} - an array of numbers representing the values
   */
  private expandNumeric(min: number, max: number) {
    if (this.value === '*') {
      return Array.from({ length: max - min + 1 }, (_, i) => i + min);
    } else if (this.value.includes('-')) {
      return this.handRange();
    } else if (this.value.includes('/')) {
      return this.handInterval(min, max);
    } else if (this.value.includes(',')) {
      return this.handList();
    } else {
      this.checkIfNumber(this.value);
      return [parseInt(this.value, 10)];
    }
  }

  /**
   * Given a range, expands it into an array of numbers.
   *
   * Given a value of a cron part in the form 'start-end', returns an array of numbers
   * from start to end (inclusive).
   * @return {number[]} - an array of numbers representing the values
   */
  private handRange() {
    const [startStr, endStr] = this.value.split('-', 2);
    const start = parseInt(startStr, 10);
    const end = parseInt(endStr, 10);

    return Array.from({ length: end - start + 1 }, (_, i) => i + start);
  }

  /**
   * Given an interval, expands it into an array of numbers.
   *
   * Given a value of a cron part in the form 'start/step', returns an array of numbers
   * from start to max (inclusive) with a step of step.
   * @param {number} min - the minimum value of the cron part
   * @param {number} max - the maximum value of the cron part
   * @return {number[]} - an array of numbers representing the values
   */
  private handInterval(min: number, max: number) {
    const [startStr, stepStr] = this.value.split('/', 2);

    const start = startStr === '*' ? min : parseInt(startStr, 10);
    const step = parseInt(stepStr, 10);
    this.checkIfNumber(start);
    this.checkIfNumber(step);
    return Array.from(
      { length: (max - start + 1) / step },
      (_, i) => i * step + start
    );
  }

  /**
   * Given a list, expands it into an array of numbers.
   *
   * Given a value of a cron part in the form 'a,b,c', returns an array of numbers
   * [a, b, c].
   * @return {number[]} - an array of numbers representing the values
   */
  private handList() {
    const values = this.value.split(',');

    return values.map((value) => {
      this.checkIfNumber(value);
      return parseInt(value, 10);
    });
  }

  /**
   * Throws an error if the value is not a number.
   *
   * If the value is not a number, throws an error with the message "Invalid cron string".
   * @param {string | number} value - the value to check
   */
  private checkIfNumber(value: string | number) {
    if (isNaN(parseInt(value?.toString(), 10))) {
      throw new Error(`Invalid cron string`);
    }
  }

  //TODO handle names of months, days of week
}
