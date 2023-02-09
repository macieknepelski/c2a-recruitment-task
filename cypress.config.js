const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
      const fs = require('fs');
      const pdf = require('pdf-parse');
      on('task', {
        readPdf({ path }) {
          const fileBuffer = fs.readFileSync(path);
          return pdf(fileBuffer)
        }
      });
      on('task', {
        removeSpacesAndLineBreaks({text}) {
          const noSpaces = text.replace(/  /g, ' ');
          const noLineBreaks = noSpaces.replace(/\n/g, '');
          return noLineBreaks
        }
      })
    },
  },
});
