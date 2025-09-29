import { TimeFormatPipe } from './time-format.pipe';

describe('TimeFormatPipe', () => {
  let pipe: TimeFormatPipe;

  beforeEach(() => {
    pipe = new TimeFormatPipe();
  });

  it('should create', () => {
    expect(pipe).toBeTruthy();
  });

  it('should format seconds correctly', () => {
    expect(pipe.transform(30)).toBe('0:30');
    expect(pipe.transform(5)).toBe('0:05');
    expect(pipe.transform(0)).toBe('0:00');
  });

  it('should format minutes and seconds', () => {
    expect(pipe.transform(65)).toBe('1:05');
    expect(pipe.transform(125)).toBe('2:05');
    expect(pipe.transform(3661)).toBe('61:01');
  });

  it('should handle edge cases', () => {
    expect(pipe.transform(null)).toBe('0:00');
    expect(pipe.transform(undefined)).toBe('0:00');
    expect(pipe.transform(-5)).toBe('0:00');
  });

  it('should handle large numbers', () => {
    expect(pipe.transform(3600)).toBe('60:00');
    expect(pipe.transform(7200)).toBe('120:00');
  });

  it('should handle string inputs', () => {
    expect(pipe.transform('30' as unknown as number)).toBe('0:30');
    expect(pipe.transform('invalid' as unknown as number)).toBe('0:00');
  });
});