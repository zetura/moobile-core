/*
---

name: ViewTransition.Cover.Page

description: Provides a view transition that covers the current view.

license: MIT-style license.

authors:
	- Jean-Philippe Dery (jeanphilippe.dery@gmail.com)

requires:
	- ViewTransition.Cover

provides:
	- ViewTransition.Cover

...
*/

/**
 * @see    http://moobilejs.com/doc/latest/ViewTransition/ViewTransition.Cover.Page
 * @author Jean-Philippe Dery (jeanphilippe.dery@gmail.com)
 * @edited 0.2.0
 * @since  0.1.0
 */
Moobile.ViewTransition.Cover.Page = new Class({

	Extends: Moobile.ViewTransition,

	/**
	 * @hidden
	 * @author Jean-Philippe Dery (jeanphilippe.dery@gmail.com)
	 * @since  0.1.0
	 */
	overlay: null,

	/**
	 * @hidden
	 * @author Jean-Philippe Dery (jeanphilippe.dery@gmail.com)
	 * @since  0.2.0
	 */
	wrapper: null,

	/**
	 * @overridden
	 * @author Jean-Philippe Dery (jeanphilippe.dery@gmail.com)
	 * @since  0.1.0
	 */
	firstAnimation: function(viewToShow, parentView) {
		throw new Error('You cannot use this transition for the first view of a stack');
	},

	/**
	 * @overridden
	 * @author Jean-Philippe Dery (jeanphilippe.dery@gmail.com)
	 * @edited 0.2.0
	 * @since  0.1.0
	 */
	enterAnimation: function(viewToShow, viewToHide, parentView) {

		var parentElem = parentView.getContentElement();

		this.overlay = new Moobile.Overlay();
		this.overlay.addClass('transition-cover-page-overlay');
		this.overlay.hide();

		parentView.addChildComponent(this.overlay);

		this.wrapper = document.createElement('div');
		this.wrapper.addClass('transition-cover-page-foreground-view-wrapper');
		this.wrapper.wraps(viewToShow);

		var onStart = function() {
			parentElem.addClass('transition-cover-page-enter');
			viewToHide.addClass('transition-cover-page-background-view');
			viewToShow.addClass('transition-cover-page-foreground-view');
			this.overlay.showAnimated();
		}.bind(this);

		var onEnd = function() {
			parentElem.removeClass('transition-cover-page-enter');
			this.didEnter(viewToShow, viewToHide, parentView);
		}.bind(this);

		var animation = new Moobile.Animation(this.wrapper);
		animation.addEvent('start', onStart);
		animation.addEvent('end', onEnd);
		animation.start();
	},

	/**
	 * @overridden
	 * @author Jean-Philippe Dery (jeanphilippe.dery@gmail.com)
	 * @edited 0.2.0
	 * @since  0.1.0
	 */
	leaveAnimation: function(viewToShow, viewToHide, parentView) {

		var parentElem = parentView.getContentElement();

		var onStart = function() {
			parentElem.addClass('transition-cover-page-leave');
			this.overlay.hideAnimated();
		}.bind(this);

		var onEnd = function() {

			parentElem.removeClass('transition-cover-page-leave');
			viewToShow.removeClass('transition-cover-page-background-view');
			viewToHide.removeClass('transition-cover-page-foreground-view');

			this.overlay.removeFromParentComponent();
			this.overlay.destroy();
			this.overlay = null;

			this.didLeave(viewToShow, viewToHide, parentView);

			this.wrapper.destroy();
			this.wrapper = null;

		}.bind(this);

		var animation = new Moobile.Animation(this.wrapper);
		animation.addEvent('start', onStart);
		animation.addEvent('end', onEnd);
		animation.start();
	},

	/**
	 * @overridden
	 * @author Jean-Philippe Dery (jeanphilippe.dery@gmail.com)
	 * @since  0.2.0
	 */
	shouldHideViewToHideOnEnter: function(viewToShow, viewToHide, parentView) {
		return false;
	}

});
