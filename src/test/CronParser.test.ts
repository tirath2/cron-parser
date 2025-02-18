import CronParser from '../CronParser';

describe('CronParser.parse', () => {
  let parser: CronParser;

  beforeEach(() => {
    parser = new CronParser();
  });

  it('should parse a valid cron string with all fields', () => {
    const cronString = '0 0 1 1 1 /usr/bin/find';
    const result = parser.parse(cronString);
    expect(result.minute).toEqual([0]);
    expect(result.hour).toEqual([0]);
    expect(result.dayOfMonth).toEqual([1]);
    expect(result.month).toEqual([1]);
    expect(result.dayOfWeek).toEqual([1]);
    expect(result.command).toBe('/usr/bin/find');
  });

  it('should parse a valid cron string with wildcard (*) in minute field', () => {
    const cronString = '* 0 1 1 1 /usr/bin/find';
    const result = parser.parse(cronString);
    expect(result.minute.length).toBe(60);
    expect(result.minute[0]).toBe(0);
    expect(result.minute[59]).toBe(59);
  });

  it('should parse a valid cron string with step value (e.g. */15) in minute field', () => {
    const cronString = '*/15 0 1 1 1 /usr/bin/find';
    const result = parser.parse(cronString);
    expect(result.minute).toEqual([0, 15, 30, 45]);
  });

  it('should parse a valid cron string with range (e.g. 1-5) in minute field', () => {
    const cronString = '1-5 0 1 1 1 /usr/bin/find';
    const result = parser.parse(cronString);
    expect(result.minute).toEqual([1, 2, 3, 4, 5]);
  });

  it('should parse a valid cron string with list (e.g. 1,2,3) in minute field', () => {
    const cronString = '1,2,3 0 1 1 1 /usr/bin/find';
    const result = parser.parse(cronString);
    expect(result.minute).toEqual([1, 2, 3]);
  });

  it('should throw an error for invalid cron string with less than 6 fields', () => {
    const cronString = '0 0 1 1';
    expect(() => parser.parse(cronString)).toThrow(
      'Invalid cron string: must have six fields'
    );
  });

  it('should throw an error for invalid cron string with invalid characters', () => {
    const cronString = 'abc 0 1 1 1 /usr/bin/find';
    expect(() => parser.parse(cronString)).toThrow('Invalid cron string');
  });
});
