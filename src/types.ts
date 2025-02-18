export type partType = 'minute' | 'hour' | 'dayOfMonth' | 'month' | 'dayOfWeek';

export interface iCronParts {
  minute: string;
  hour: string;
  dayOfMonth: string;
  month: string;
  dayOfWeek: string;
  command: string;
}

export interface iCronPartValues {
  minute: number[];
  hour: number[];
  dayOfMonth: number[];
  month: number[];
  dayOfWeek: number[];
  command: string;
}
