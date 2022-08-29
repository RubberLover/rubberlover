import { ToPrettyUrlPipe } from './to-pretty-url.pipe';

describe('ToPrettyUrlPipe', () => {
  it('create an instance', () => {
    const pipe = new ToPrettyUrlPipe();
    expect(pipe).toBeTruthy();
  });
});
