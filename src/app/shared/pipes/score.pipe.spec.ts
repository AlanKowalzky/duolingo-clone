import { ScorePipe } from './score.pipe';

describe('ScorePipe', () => {
  let pipe: ScorePipe;

  beforeEach(() => {
    pipe = new ScorePipe();
  });

  it('should create', () => {
    expect(pipe).toBeTruthy();
  });

  it('should format score with percentage', () => {
    expect(pipe.transform(85)).toBe('85%');
    expect(pipe.transform(100)).toBe('100%');
    expect(pipe.transform(0)).toBe('0%');
  });

  it('should handle decimal scores', () => {
    expect(pipe.transform(85.5)).toBe('86%');
    expect(pipe.transform(99.9)).toBe('100%');
  });

  it('should handle edge cases', () => {
    expect(pipe.transform(null)).toBe('0%');
    expect(pipe.transform(undefined)).toBe('0%');
    expect(pipe.transform(-5)).toBe('0%');
    expect(pipe.transform(150)).toBe('100%');
  });

  it('should handle string inputs', () => {
    expect(pipe.transform('85' as any)).toBe('85%');
    expect(pipe.transform('invalid' as any)).toBe('0%');
  });
});