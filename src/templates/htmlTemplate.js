export const getHTMLTemplate = (content) => `
<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8">
    <style>
      body {
        background: transparent !important;
        color: white !important;
        font-family: Arial, sans-serif;
        margin: 0;
        padding: 20px;
      }
      * {
        color: rgba(255, 255, 255, 0.9) !important;
        text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.1);
      }
      h1,h2,h3,h4,h5,h6, p {
        margin-bottom: 1rem;
      }
    </style>
  </head>
  <body>
    ${content}
  </body>
</html>
`;