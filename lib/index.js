/**
 * Analytics.js
 *
 * (C) 2013 Segment.io Inc.
 */

var Integrations = require('integrations');
var Analytics = require('./analytics');
var each = require('each');

/**
 * Expose the `analytics` singleton.
 */

var analytics = module.exports = exports = new Analytics();

/**
 * Expose require
 */

analytics.require = require;

/**
 * Expose `VERSION`.
 */

exports.VERSION = '1.3.27';


/**
 * Add integrations.
 */

each(Integrations, function (name, Integration) {
  analytics.use(Integration);
});

/**
 * Run through the queued function calls, and call them
 */
if (window.bcanalytics && window.bcanalytics instanceof Array) {
    each(window.bcanalytics, function(args) {
        var method = args.shift();
        analytics[method].apply(analytics, args);
    });
}
