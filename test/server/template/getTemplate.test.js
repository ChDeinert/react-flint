import path from 'path';
import fs from 'fs';

import getTemplate from 'ServerSource/template/getTemplate';

describe('template loader', () => {
  const fixturePath = path.resolve(__dirname, 'template.html');
  const expectedString = fs.readFileSync(fixturePath, 'utf8');

  it('returns the template', () => {
    const result = getTemplate(fixturePath);
    expect(result).toBe(expectedString);
  });
});
