'use strict';
angular.module('dd.service').


/**=========================================================
 * Module: app-service.js
 * appService
 * require angular-cookie
 =========================================================*/

factory('appService', [
	'cookieService', 'storageService',
	function(cookieService, storageService) {
		if (typeof(Storage) !== 'undefined') {
			return storageService;
			// Code for localStorage/sessionStorage.
		} else {
			// Sorry! No Web Storage support..
			return cookieService;
		}
	}
]).


factory('sessionService', function() {
	var exports;
	exports = {
		get: function(key) {
			var record;
			record = JSON.parse(sessionStorage.getItem(key));
			if (!record) {
				return false;
			}
			return new Date().getTime() < record.timestamp && JSON.parse(record.value);
		},
		set: function(key, val, time) {
			var expire, record;
			expire = time ? (time * 60 * 1000) : 864000;
			record = {
				value: JSON.stringify(val),
				timestamp: new Date().getTime() + expire
			};
			sessionStorage.setItem(key, JSON.stringify(record));
			return val;
		},
		unset: function(key) {
			return sessionStorage.removeItem(key);
		}
	};
	return exports;
}).


factory('storageService', function() {
	var exports;
	exports = {
		get: function(key) {
			var val;
			val = localStorage.getItem(key);
			if (!val) {
				return false;
			}
			return JSON.parse(val);
		},
		set: function(key, val) {
			localStorage.setItem(key, JSON.stringify(val));
			return val;
		},
		unset: function(key) {
			return localStorage.removeItem(key);
		},
		remove: function(key) {
			return localStorage.removeItem(key);
		}
	};
	return exports;
}).

factory('cookieService', [
	'$cookieStore',
	function($cookieStore) {
		var exports;
		exports = {
			get: function(key) {
				var val;
				val = $cookieStore.get(key);
				if (!val) {
					return false;
				}
				return JSON.parse(val);
			},
			set: function(key, val) {
				$cookieStore.put(key, JSON.stringify(val));
				return val;
			},
			unset: function(key) {
				return $cookieStore.remove(key);
			},
			remove: function(key) {
				return $cookieStore.remove(key);
			}
		};
		return exports;
	}
]);