import { camelCaseToWords } from './camel_case_to_words';

describe('camelCaseToWords', () => {
  it('should convert camelCase to words', () => {
    const result = camelCaseToWords('helloWorld');

    expect(result).toBe('Hello World');
  });

  it('should handle single word strings', () => {
    const result = camelCaseToWords('hello');

    expect(result).toBe('Hello');
  });

  it('should handle strings with multiple camelCase parts', () => {
    const result = camelCaseToWords('thisIsATest');

    expect(result).toBe('This Is A Test');
  });

  it('should return empty string if input is empty', () => {
    const result = camelCaseToWords('');

    expect(result).toBe('');
  });
});
