/*! angular-appservice */
/*! Le Duong <me@leduong.com> */
/*! version: 0.0.1 09-10-2015 */
"use strict";

angular.module("dd.service").factory("appService", [ "cookieService", "storageService", function(cookieService, storageService) {
    return "undefined" != typeof Storage ? storageService : cookieService;
} ]).factory("sessionService", function() {
    var exports;
    return exports = {
        get: function(key) {
            var record;
            return record = JSON.parse(sessionStorage.getItem(key)), record ? new Date().getTime() < record.timestamp && JSON.parse(record.value) : !1;
        },
        set: function(key, val, time) {
            var expire, record;
            return expire = time ? 60 * time * 1e3 : 864e3, record = {
                value: JSON.stringify(val),
                timestamp: new Date().getTime() + expire
            }, sessionStorage.setItem(key, JSON.stringify(record)), val;
        },
        unset: function(key) {
            return sessionStorage.removeItem(key);
        }
    };
}).factory("storageService", function() {
    var exports;
    return exports = {
        get: function(key) {
            var val;
            return val = localStorage.getItem(key), val ? JSON.parse(val) : !1;
        },
        set: function(key, val) {
            return localStorage.setItem(key, JSON.stringify(val)), val;
        },
        unset: function(key) {
            return localStorage.removeItem(key);
        },
        remove: function(key) {
            return localStorage.removeItem(key);
        }
    };
}).factory("cookieService", [ "$cookieStore", function($cookieStore) {
    var exports;
    return exports = {
        get: function(key) {
            var val;
            return val = $cookieStore.get(key), val ? JSON.parse(val) : !1;
        },
        set: function(key, val) {
            return $cookieStore.put(key, JSON.stringify(val)), val;
        },
        unset: function(key) {
            return $cookieStore.remove(key);
        },
        remove: function(key) {
            return $cookieStore.remove(key);
        }
    };
} ]);