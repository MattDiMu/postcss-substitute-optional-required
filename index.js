var postcss = require('postcss');

var requiredRegex = new RegExp(':required', 'gi');
var requiredReplace = ':not(:optional)';

var optionalRegex = new RegExp(':optional', 'gi');
var optionalReplace = ':not(:required)';


module.exports = postcss.plugin('postcss-substitute-optional-required', function (opts) {
    opts = opts || {};
    var shimRequired = false;
    var shimOptional = false;

    switch (opts.method) {
    case 'shim-optional':
        shimOptional = true;
        break;
    case 'shim-required':
        shimRequired = true;
        break;
    case 'shim-all':
    default:
        shimRequired = true;
        shimOptional = true;
    }

    return function (css, result) { // eslint-disable-line no-unused-vars
        css.walkRules(function (rule) {

            var appendSelectors = '';

            rule.selectors.forEach(function (selector) {
                if (shimRequired && selector.match(requiredRegex)) {
                    appendSelectors += selector.replace(requiredRegex, requiredReplace) + ',';
                }
                if (shimOptional && selector.match(optionalRegex)) {
                    appendSelectors += selector.replace(optionalRegex, optionalReplace) + ',';
                }
            });
            if (appendSelectors.length > 0) {
                rule.selector = appendSelectors + rule.selector;
            }
        });
    };
});
