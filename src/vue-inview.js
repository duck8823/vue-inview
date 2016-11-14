var $ = require('jquery');

var InView = {};
InView.install = function (Vue) {
	Vue.directive('inview', {

		bind: function (el, binding, vnode) {
			if (typeof binding.value !== 'function') {
				console.warn('[vue-inview] invalid value.')
			}
			var key = Math.random().toString(36).slice(-8);
			var id = Math.random().toString(36).slice(-64);
			el.setAttribute('data-inview-' + key, id);
			setTimeout( function() {
				var elem = document.querySelector("[data-inview-" + key + "='" + id + "']");
				el.removeAttribute('data-inview-id');

				var fn = binding.value;
				var pos = $(elem).offset().top - $(window).height();
				if ($(window).scrollTop() > pos) {
					fn();
				} else {
					var callback = function () {
						var pos = $(elem).offset().top - $(window).height();
						if ($(window).scrollTop() > pos) {
							fn();
							$(window).unbind("scroll", callback);
						}
					};
					$(window).bind("scroll", callback);
				}
			}, 5);
		}
	});

	Vue.prototype.$onBottom = function (callback) {
		$(window).bind("scroll", function () {
			var scrollHeight = $(document).height();
			var scrollPosition = $(window).height() + $(window).scrollTop();
			if (( scrollHeight - scrollPosition ) / scrollHeight <= 0) {
				callback();
			}
		});
	};

	Vue.prototype.$onTop = function (callback) {
		$(window).bind("scroll", function () {
			if ($(window).scrollTop() <= 0) {
				callback();
			}
		});
	};
};
module.exports = InView;