var $ = require('jquery');

var InView = {};
InView.install = function (Vue) {
	Vue.directive('inview', {
		bind: function (el, binding, vnode) {
			if (typeof binding.value !== 'function') {
				console.warn('[vue-inview] invalid value.')
			}
			setTimeout( function() {
				var fn = binding.value;
				var pos = $(el).offset().top - $(window).height();
				if ($(window).scrollTop() > pos) {
					fn();
					if (binding.arg !== 'each') {
						return;
					}
				}
				var scrollable = el.getAttribute('data-scrollable') ? el.getAttribute('data-scrollable') : window;
				var callback = function () {
					var pos = $(el).offset().top - $(window).height();
					if ($(window).scrollTop() > pos) {
						fn();
						$(scrollable).unbind("scroll", callback);
						if (binding.arg === 'each' ) {
							// rebind
							$(scrollable).bind("scroll", function() {
								var pos = $(el).offset().top - $(window).height();
								if ($(window).scrollTop() <= pos) {
									$(scrollable).bind("scroll", callback);
								}
							});
						}
					}
				};
				$(scrollable).bind("scroll", callback);
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