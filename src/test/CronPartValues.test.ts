import CronPartValues from '../CronPartValues';

describe('CronPartValues.getValues', () => {
  it('should return minutes 0-59 for type minute', () => {
    const cronPartValues = new CronPartValues('minute', '*');
    expect(cronPartValues.getValues()).toEqual(
      Array.from({ length: 60 }, (_, i) => i)
    );
  });

  it('should return hours 0-23 for type hour', () => {
    const cronPartValues = new CronPartValues('hour', '*');
    expect(cronPartValues.getValues()).toEqual(
      Array.from({ length: 24 }, (_, i) => i)
    );
  });

  it('should return days of month 1-31 for type dayOfMonth', () => {
    const cronPartValues = new CronPartValues('dayOfMonth', '*');
    expect(cronPartValues.getValues()).toEqual(
      Array.from({ length: 31 }, (_, i) => i + 1)
    );
  });

  it('should return months 1-12 for type month', () => {
    const cronPartValues = new CronPartValues('month', '*');
    expect(cronPartValues.getValues()).toEqual(
      Array.from({ length: 12 }, (_, i) => i + 1)
    );
  });

  it('should return days of week 0-6 for type dayOfWeek', () => {
    const cronPartValues = new CronPartValues('dayOfWeek', '*');
    expect(cronPartValues.getValues()).toEqual(
      Array.from({ length: 7 }, (_, i) => i)
    );
  });

  it('should throw an error for unknown type', () => {
    const cronPartValues = new CronPartValues('unknown', '*');
    expect(() => cronPartValues.getValues()).toThrowError(
      'Unknown type: unknown'
    );
  });

  it('should return edge cases correctly', () => {
    const cronPartValuesMinute0 = new CronPartValues('minute', '0');
    expect(cronPartValuesMinute0.getValues()).toEqual([0]);

    const cronPartValuesHour23 = new CronPartValues('hour', '23');
    expect(cronPartValuesHour23.getValues()).toEqual([23]);
  });
});
