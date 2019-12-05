/**
 * Extensions & Overrides to builtin JavaScript methods/objects
 *
 * @package WordPress
 * @subpackage Baker Design Theme 1.0
 * @since 2.0
 **/

/**
 * Grab array/object element by key name
 *
 * @param  array/object nestedObj - the array or object
 * @param  string key
 * @param  mixed fallback - optional
 * @return mixed
 */
$.grab = function(nestedObj, key, fallback) {
    if (nestedObj !== null && typeof nestedObj[key] !== 'undefined') {
        return nestedObj[key];
    } else {
        return (typeof fallback !== 'undefined') ? fallback : '';
    }
};

/**
 * Make jQuery's Contains non-case-sensitive
 */
$.expr[":"].Contains = $.expr.createPseudo(function(arg) {
    return function(elem) {
        return $(elem).text().toUpperCase().indexOf(arg.toUpperCase()) >=
            0;
    };
});

/**
 * Check if element has siblings
 */
$.expr[":"].Sibling = $.expr.createPseudo(function(arg) {
    return function(elem) {
        return ($(elem).siblings().size() > 0);
    };
});

$.fn.closestWithSiblings = function() {
    return function(elem) {
        var e = $(elem);
        while ( e.siblings().size() == 0 ) {
            e = e.parent();
        }
        return e;
    };
};

/**
 * Return HTML tag name
 *
 * @return string
 */
$.fn.tagName = function() {
    return this.prop("tagName").toLowerCase();
};

/**
 * triggerAll jQuery Extension
 *
 * @param  string events (e.g. 'click blur')
 * @param  params
 * @return object
 */
$.fn.extend({
    triggerAll: function(events, params) {
        var el = this,
            i, evts = events.split(' ');
        for (i = 0; i < evts.length; i += 1) {
            el.trigger(evts[i], params);
        }
        return el;
    }
});

/**
 * Extend Array with new 'containsAny' function for comparing two arrays
 */
Array.prototype.containsAny = function(arr) {
    return this.some(function(v) {
        return arr.indexOf(v) >= 0;
    });
};

/**
 * Helper String Methods/Extensions to the JS String Object
 *
 * @return String
/*

/* Reverse a string's characters */
String.prototype.reverse = function() {
    return this.split('').reverse().join('');
};
/* Check if string contains another substring | @param String search
 * @return Boolean */
String.prototype.contains = function(search) {
    return (this.indexOf(search) !== -1);
};
/**
 * Replace all instances of needle with provided string | @param String find | @param String replacement
 * @return String
 */
String.prototype.replaceAll = function(find, replacement) {
    if (this.length > 0 && this.indexOf(find) > -1) {
        return this.replace(new RegExp(find, 'g'), replacement);
    } else {
        return this.toString();
    }
};
String.prototype.replaceEach = function(find, replacements) {
    var me = this;
    if (this.length > 0) {
        find.forEach(function(a,b) {
            me = me.replaceAll(a, replacements[b]);
        });
        return me;
    } else {
        return this.toString();
    }
};
/**
 * Case conversion helper methods | @type String
 * @return String
 */
String.prototype.toTitleCase = function() {
    return this.replace(/\w\S*/g, function(txt) {
        return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
    });
};
String.prototype.camelCaseToDashed = function() {
    return this.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase();
};
String.prototype.toProperCase = function() {
    return this.replace(/\w\S*/g, function(txt) {
        return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
    });
};
String.prototype.toCamelCase = function() {
    return this.replace(/(?:^\w|\-[A-Z]|\b\w)/g, function(letter, index) {
        return index == 0 ? letter.toLowerCase() : letter.toUpperCase();
    }).replace(/\s+/g, '').replace('-', '');
};
String.prototype.toDashedCase = function() {
    return this.toCamelCase().camelCaseToDashed();
};
