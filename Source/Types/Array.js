/*
---

name: Array

description: Provides extra methods to the Array prototype.

license: MIT-style license.

requires:
	- Core/Array

provides:
	- Array

...
*/

/**
 * @see    http://moobile.net/api/0.1/Types/Array
 * @author Jean-Philippe Dery (jeanphilippe.dery@gmail.com)
 * @since  0.1.0
 */
Array.implement({

	/**
	 * @see    http://moobile.net/api/0.1/Types/Array#find
	 * @author Jean-Philippe Dery (jeanphilippe.dery@gmail.com)
	 * @since  0.1.0
	 */
	find: function(fn) {
		for (var i = 0; i < this.length; i++) {
			var found = fn.call(this, this[i]);
			if (found === true) {
				return this[i];
			}
		}
		return null;
	},

	/**
	 * @see    http://moobile.net/api/0.1/Types/Array#lastItemAt
	 * @author Jean-Philippe Dery (jeanphilippe.dery@gmail.com)
	 * @since  0.1.0
	 */
	lastItemAt: function(offset) {
		offset = offset ? offset : 0;
		return this[this.length - 1 - offset] ?
			   this[this.length - 1 - offset] :
			   null;
	}
});
