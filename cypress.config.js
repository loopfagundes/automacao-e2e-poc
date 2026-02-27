const { defineConfig } = require('cypress');
const { createHtmlReport } = require('axe-html-reporter');
const path = require('node:path');
const fs = require('node:fs');

let a11yResults = [];

module.exports = defineConfig({
  e2e: {
    baseUrl: 'https://www.youcom.com.br',
    video: true,
    screenshotOnRunFailure: true,
    allowCypressEnv: false,

    setupNodeEvents(on, config) {
      on('task', {
        a11yAdd({ testName, url, violations }) {
          a11yResults.push({ testName, url, violations });
          return null;
        },

        a11yReport() {
          const reportDir = path.join(__dirname, 'reports');
          if (!fs.existsSync(reportDir)) fs.mkdirSync(reportDir, { recursive: true });

          const html = createHtmlReport({
            results: {
              violations: a11yResults.flatMap((r) =>
                r.violations.map((v) => ({
                  ...v,
                  help: `${v.help} (Teste: ${r.testName})`,
                  description: `${v.description} | URL: ${r.url}`,
                }))
              ),
            },
            options: {
              projectKey: 'Renner youcom POC',
              outputDir: 'reports',
              reportFileName: 'renner-youcom-report.html',
            },
          });

          return html || null;
        },

        log(message) {
          console.log(message);
          return null;
        },
      });

      on('before:run', () => {
        a11yResults = [];
      });

      return config;
    },
  },
});