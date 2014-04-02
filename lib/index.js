/**
 * Analytics.js
 *
 * (C) 2013 Segment.io Inc.
 */

var Analytics = require('./analytics');
var createIntegration = require('integration');
var each = require('each');
var Integrations = require('integrations');

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

exports.VERSION = '1.3.16';


/**
 * Add integrations.
 */

each(Integrations, function (name, Integration) {
  analytics.use(Integration);
});

/**
 * Run through the queued function calls, and call them
 */
if (window.analytics && window.analytics instanceof Array) {
    each(window.analytics, function(args) {
        var method = args.shift();
        analytics[method].apply(analytics, args);
    });
}