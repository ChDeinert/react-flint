import React from 'react';
import path from 'path';
import fs from 'fs';
import makeServerSideRenderer from 'ServerSource/renderer.ssr';

describe('server side renderer', () => {
  const App = () => <div className="foo">bar</div>;
  const fixturePath = path.resolve(__dirname, 'template/template.html');
  const template = fs.readFileSync(fixturePath, 'utf8');

  it('injects rendered payload into template', () => {
    const serverSideRenderer = makeServerSideRenderer(template, App);
    const result = serverSideRenderer();
    expect(result).toMatch(/<div.class="foo".data-reactroot="">bar<\/div>/);
  });
});
