/**
 * Common Methods
 *
 * @package WordPress
 * @subpackage Baker Design Theme 1.0
 * @since 2.0
 **/

/**
 * Create new unique ID
 */
function newUniqueID() {
    function s4() {
        return Math.floor((1 + Math.random()) * 0x10000)
            .toString(16)
            .substring(1);
    }
    return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
}

/**
 * Clean a slug up
 */
function cleanSlug(text) {
    return (
        text.toString().toLowerCase()
        .replace(/\s+/g, '-') /* Replace spaces with - */
        .replace(/[^\w\-]+/g, '') /* Remove all non-word chars */
        .replace(/\-\-+/g, '-') /* Replace multiple '--' with '-' */
        .replace(/^-+/, '').replace(/-+$/, '') /* Trim text */
    );
}

/**
 * Clean empty items from object
 */
Project.cleanObject = function(obj) {
    var newObj = {};
    Object.keys(obj).forEach(function(prop) {
        if (obj[prop]) {
            newObj[prop] = obj[prop];
        }
    });
    return newObj;
};

/**
 * Push history state to browser and update page title
 */
Project.pushHistoryState = function(permalink) {
    if (history.pushState) {
        window.history.pushState(null, permalink.replace('/', ''), permalink);
    }
};

Project.pushHashState = function(permalink) {
    if (history.pushState) {
        window.history.pushState(null, permalink.replace('/', ''), permalink);
    }
};

Project.isMobile = function() {
    return ($(window).width() <= $.GLOBALS.mediumBreak);
};

Project.getHashPath = function(url) {
    url = (typeof url == 'undefined') ? document.location.hash : url;
    return (url.indexOf('#') > -1) ? url.split('#')[1] : '';
};

Project.getHashSlug = function(url) {
    url = (typeof url == 'undefined') ? document.location.hash : url;
    return Project.getHashPath(url).replaceAll('/', '');
};

Project.getParameterByName = function(name, url) {
    if (typeof url === 'undefined') {
        url = window.location.href;
    }
    if (!url) {
        url = window.location.href;
    }
    name = name.replace(/[\[\]]/g, "\\$&");
    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
        results = regex.exec(url);
    if (!results) {
        return null;
    }
    if (!results[2]) {
        return '';
    }
    return decodeURIComponent(results[2].replace(/\+/g, " "));
};

/**
 * Scroll To Element
 *
 * @param string selector [optional | default: 'body'] - the selector of the element to scroll to
 * @param int time [optional | default 1000] - time in miliseconds for slide transition
 * @param string overrideselector [optional | default: 'html, body'] - the selector of the animate element
 * @return void
 */
Project.scrollToElement = function(selector, offset, time, overrideselector) {
    $('html,body').addClass('scrollable');
    selector = (typeof selector === 'undefined') ? 'body' : selector;
    offset = (typeof offset === 'undefined') ? 0 : offset;
    time = (typeof time === 'undefined') ? 1000 : time;
    overrideselector = (typeof overrideselector === 'undefined') ? 'html, body' : overrideselector;
    if ($(selector).length) {
        $(overrideselector).animate({
            scrollTop: $(selector).offset().top + (offset)
        }, time);
    }
    $('html,body').removeClass('scrollable');
};

/**
 * Return the first relative parent of an element
 *
 * @param child element
 * @return Object
 * @uses jQuery
 */
Project.closestRelativeParent = function(elem) {
    var rel = false,
        par = elem.parent();
    while (rel === false) {
        rel = (par.css('position') === 'relative' || par.is('body'));
        if (rel !== true) {
            par = par.parent();
        }
    }
    return par;
};

/**
 * Get page title of provided URL
 *
 * @param url
 * @return String
 */
Project.pageTitle = function(url, update) {
    var result = "";
    update = update || false;
    $.ajax({
        url: url,
        async: false,
        success: function(data) {
            result = data;
        }
    });
    if (update) {
        document.title = result.match(/<(title)>[\s\S]*?<\/\1>/gi)[0].replace('<title>', '').replace(
            '</title>', '');
    }
    return result.match(/<(title)>[\s\S]*?<\/\1>/gi)[0].replace('<title>', '').replace(
        '</title>', '');
};

/**
 * Check if variable is defined
 *
 * @param variable name as string
 * @return Bool
 * @usage isSet('varNameAsString')
 */
Project.isSet = function(varAsStr) {
    prevItem = window;
    varSplit = varAsStr.split('.');
    x = 0;
    retVal = false;

    if (typeof(window[varSplit[0]]) !== 'undefined') {
        obj = window[varSplit[0]];
    }
    $.each(varSplit, function(i, item) {
        if (typeof(item) === 'undefined') {
            return false;
        } else {
            if (typeof prevItem[item] === 'undefined') {
                return false;
            }
            prevItem = prevItem[item];
            if (i === (varSplit.length - 1)) {
                if (typeof(item) !== 'undefined') {
                    retVal = (typeof(prevItem) !== 'undefined');
                } else {
                    retVal = false;
                }
                return retVal;
            }
        }
    });
    return retVal;
};

/**
 * Check if variable is defined
 *
 * @param variable name as string
 * @return Bool
 * @usage isSet('varNameAsString')
 */


Project.ifSetElse = function(varAsStr, elseReturn) {
    elseReturn = (typeof elseReturn === 'undefined') ? false : elseReturn;
    if (isSet(varAsStr)) {
        return window[varAsStr];
    } else {
        return elseReturn;
    }
};

/**
 * Count the properties of a JavaScript Object
 *
 * @param Object
 * @return int
 */
Project.countProperties = function(obj) {
    var count = 0;
    for (var prop in obj) {
        if (obj.hasOwnProperty(prop)) { ++count; }
    }
    return count;
};

/**
 * Find elements w/ duplicate attributes in DOM
 *
 * @param string
 */
Project.findDuplicateAttributes = function(attr) {
    $('[' + attr + ']').each(function() {
        var _this = $(this),
            allAttributes = $('[' + attr + '="' + _this.attr(attr) + '"]');
        if (allAttributes.length > 1 && allAttributes[0] == this) {
            console.log(_this);
        }
    });
};

/**
 * Append external JS file to body
 */
Project.addJavascript = function(jsname) {
    if (jsname.length > 0) {
        scriptElem = document.createElement('script');
        scriptElem.setAttribute('type', 'text/javascript');
        scriptElem.setAttribute('src', jsname);
        $('body').append(scriptElem);
    }
};

/**
 * Append external CSS file to body
 */
Project.addCSS = function(cssname) {
    if (cssname.length > 0) {
        $('body').append('<link rel="stylesheet" href="' + cssname + '" />');
    }
};

/**
 * String Helpers
 * @param string str
 * @return str
 */
Project.toCamelCase = function(str) {
    return str.toString().replace(/(?:^\w|\-[A-Z]|\b\w)/g, function(letter, index) {
        return index === 0 ? letter.toLowerCase() : letter.toUpperCase();
    }).replace(/\s+/g, '').replace('-', '');
};

Project.areCookiesEnabled = function() {
    return (navigator.cookieEnabled);
};

/**
 * Site Alert
 *
 * @param string message - the alert text/html content
 * @param string style - available options include: ['success', 'info', 'warning', 'error'] (default is 'info')
 * @param int timeout - number of milliseconds to show the alert (default is 7000)
 * @return void
 */
Project.siteAlert = function(message, style, timeout) {
    style = typeof style === 'undefined' ? 'info' : style;
    timeout = typeof timeout === 'undefined' ? 7000 : timeout;
    if ($('.site-alert').length === 0) {
        $('body').append('<div class="site-alert"></div>');
    }
    refillAlert(message, style);
    function refillAlert(message, style) {
        $('.site-alert').empty().append('<div class="content ' + style + '">' + message +
            '</div>');
        $('.site-alert').addClass('active');
        clearTimeout($.GLOBALS.alertTimeout);
        $.GLOBALS.alertTimeout = setTimeout(
            function() {
                $('.site-alert').fadeOut('slow', function() {
                    $(this).empty().show().removeClass('active');
                });
            }, timeout
        );
    }
};

/**
 * Validate an Email Address
 */
Project.validateEmail = function(email) {
    var re =
        /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
};

/**
 * Validate USD Currency
 *
 * @param  str val
 * @param  bool strict - if false, will allow missing digit (default is true)
 * @return bool
 */
validateUSD = function(val, strict) {
    var regex = (typeof strict === 'undefined' || strict == true) ? /^\d+(?:\.\d{2})$/ : /^\d+(?:\.\d{0,2})$/;
    return (regex.test(val));
};

/**
 * Convert to Boolean
 */
toBool = function(val) {
    return (false == (['false', '0', '', 'undefined', null, NaN].indexOf(String(val).toLowerCase().trim()) + 1));
};

isSet = Project.isSet;
