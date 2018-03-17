import path from 'path';
import fs from 'fs';

import makeGetTemplate from 'ServerSource/template/makeGetTemplate';

describe('template loader', () => {
  const fixturePath = path.resolve(__dirname, 'template.html');
  const expectedString = fs.readFileSync(fixturePath, 'utf8');
  const getTemplate = makeGetTemplate(fixturePath);

  it('returns the template', () => {
    const result = getTemplate();
    expect(result).toBe(expectedString);
  });
});
