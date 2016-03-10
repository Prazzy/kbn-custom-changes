require('plugins/kibana/discover/index');
require('plugins/kibana/visualize/index');
require('plugins/kibana/dashboard/index');
require('plugins/kibana/settings/index');
require('plugins/kibana/doc/index');
require('ui/timepicker');

var moment = require('moment-timezone');

var chrome = require('ui/chrome');
var routes = require('ui/routes');
var modules = require('ui/modules');

var kibanaLogoUrl = require('ui/images/kibana.svg');

routes.enable();

routes
.otherwise({
  //redirectTo: `/${chrome.getInjected('kbnDefaultAppId', 'discover')}`
  redirectTo: `/Media-Usage`
});

chrome
.setBrand({
  'logo': 'url(' + kibanaLogoUrl + ') left no-repeat',
  'smallLogo': 'url(' + kibanaLogoUrl + ') left no-repeat'
})
.setNavBackground('#222222')
.setTabDefaults({
  resetWhenActive: true,
  lastUrlStore: window.sessionStore,
  activeIndicatorColor: '#656a76'
})
.setTabs([
  {
    id: 'Usage-Summary',
    title: 'Usage Summary'
  },
  {
    id: 'IFE-Usage',
    title: 'IFE Usage'
  },
  {
    id: 'IFE-LOPA',
    title: 'IFE LOPA'
  },
  {
    id: 'Portal-Usage',
    title: 'Portal Usage'
  },
  {
    id: 'Portal-Click-Path',
    title: 'Portal Click Path'
  }
])
.setRootController('kibana', function ($scope, $rootScope, courier, config) {
  function setDefaultTimezone() {
    moment.tz.setDefault(config.get('dateFormat:tz'));
  }

  // wait for the application to finish loading
  $scope.$on('application.load', function () {
    courier.start();
  });

  $scope.$on('init:config', setDefaultTimezone);
  $scope.$on('change:config.dateFormat:tz', setDefaultTimezone);
});
