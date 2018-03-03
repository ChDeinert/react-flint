module.exports = (assetManifest, renderedContent) => `<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Hello World!</title>
    ${assetManifest['main.css']
    ? `<link rel="stylesheet" href="/assets/${assetManifest['main.css']}" />`
    : ''}
  </head>
  <body>
    <div id="main">${renderedContent}</div>
    <script type="text/javascript" src="/assets/${assetManifest['main.js'] || 'js/main.js'}"></script>
  </body>
</html>`;
