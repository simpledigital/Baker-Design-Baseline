/**
 * Browser Cookies & Local Storage
 *
 * @package WordPress
 * @subpackage Baker Design Theme 1.0
 * @since 2.0
 **/

/**
 * Check for local storage browser support
 */
Project.hasStorage = (function() {
    try {
        return !!localStorage.getItem;
    } catch (exception) {
        return false;
    }
}());

/**
 * Local Storage Extensions
 */
Storage.prototype._setItem = Storage.prototype.setItem;
Storage.prototype.setItem = function(key, value) {
    Cookies.set(key, JSON.stringify(value));
    if (Project.hasStorage) {
        this._setItem(key, JSON.stringify(value));
    }
};

Storage.prototype._getItem = Storage.prototype.getItem;
Storage.prototype.getItem = function(key) {
    if (Project.hasStorage) {
        try {
            return JSON.parse(this._getItem(key));
        } catch (e) {
            return this._getItem(key);
        }
    } else {
        return Cookies.getJSON(key);
    }
};

/**
 * Set Cookie & Local Storage
 */
Project.setCookieStorage = function(key, val) {
    localStorage.setItem(key, val);
    Cookies.set(key, val);
    return val;
};

/**
 * Get local storage item w/ cookie as backup
 */
localStorage.constructor.prototype.getItemStorage = function(key) {
    return (localStorage.getItem(key) || Cookies.get(key) || null);
};

localStorage.constructor.prototype.setItemStorage = function(key, val) {
    localStorage.setItem(key, val);
    Cookies.set(key, val);
    return val;
};
