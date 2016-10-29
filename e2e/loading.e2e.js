import { expect } from 'chai';
import testUtils from './utils';

describe('application launch', function () {


    beforeEach(testUtils.beforeEach);
    afterEach(testUtils.afterEach);

    it('[wbv] does the webview have the right src url?', function () {
        var app = this.app;

        return app.client.getAttribute('webview', 'src').then(function (url) {
            expect(url).to.equal('https://www.grepolis.com/');
        });
    });

    it('[all] is audit succeeding in main page and webview?\n', function() {
        var app = this.app;

        //Focus main page and audit it
        app.client.windowByIndex(0).then( function() {
          app.client.auditAccessibility().then(function (audit) {
            if (audit.failed) {
              console.error('Main page failed audit')
              console.error(audit.message)
            }

            //Focus <webview> tag and audit it
            app.client.windowByIndex(1).then( function() {
              app.client.auditAccessibility().then(function () {
                if (audit.failed) {
                  console.error('<webview> page failed audit')
                  console.error(audit.message)
                }
              })
            })
          })
        })
    });

});
