import { node, section } from './builders';

describe('node', () => {
  it('creates a node with a boolean value', () => {
    expect(node('CA', true)).toEqual({
      title: 'CA', value: true,
    });
  });

  it('creates a node with a string value', () => {
    expect(node('Raw Value', 'deadbeef')).toEqual({
      title: 'Raw Value', value: 'deadbeef',
    });
  });

  it('creates a node with a number value', () => {
    expect(node('Path Length Constraint', 0)).toEqual({
      title: 'Path Length Constraint', value: 0,
    });
  });
});

describe('section', () => {
  it('creates a node with title and children', () => {
    const children = [node('CA', true), node('Path Length Constraint', 0)];

    expect(section('Basic Constraints', children)).toEqual({
      title: 'Basic Constraints',
      children,
    });
  });

  it('creates a section with empty children', () => {
    expect(section('Empty', [])).toEqual({
      title: 'Empty', children: [],
    });
  });
});
