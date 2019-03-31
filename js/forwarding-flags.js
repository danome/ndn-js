/**
 * Copyright (C) 2013-2019 Regents of the University of California.
 * @author: Jeff Thompson <jefft0@remap.ucla.edu>
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Lesser General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU Lesser General Public License for more details.
 *
 * You should have received a copy of the GNU Lesser General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
 * A copy of the GNU Lesser General Public License is in the file COPYING.
 */

/**
 * A ForwardingFlags object holds the flags which specify how the forwarding daemon should forward an interest for
 * a registered prefix.  We use a separate ForwardingFlags object to retain future compatibility if the daemon forwarding
 * bits are changed, amended or deprecated.
 * Create a new ForwardingFlags with "childInherit" set and all other flags cleared.
 * @constructor
 */
var ForwardingFlags = function ForwardingFlags(value)
{
  if (typeof value === 'object' && value instanceof ForwardingFlags) {
    // Make a copy.
    this.childInherit = value.childInherit;
    this.capture = value.capture;
    this.origin = value.origin;
  }
  else {
    this.childInherit = true;
    this.capture = false;
    this.origin = null;
  }
};

exports.ForwardingFlags = ForwardingFlags;

ForwardingFlags.NfdForwardingFlags_CHILD_INHERIT = 1;
ForwardingFlags.NfdForwardingFlags_CAPTURE       = 2;

/**
 * Get an integer with the bits set according to the NFD forwarding flags as
 * used in the ControlParameters of the command interest.
 * @return {number} An integer with the bits set.
 */
ForwardingFlags.prototype.getNfdForwardingFlags = function()
{
  var result = 0;

  if (this.childInherit)
    result |= ForwardingFlags.NfdForwardingFlags_CHILD_INHERIT;
  if (this.capture)
    result |= ForwardingFlags.NfdForwardingFlags_CAPTURE;

  return result;
};

/**
 * Set the flags according to the NFD forwarding flags as used in the
 * ControlParameters of the command interest.
 * This ignores the origin value.
 * @param {number} nfdForwardingFlags An integer with the bits set.
 * @return {ForwardingFlags} This ForwardingFlags so that you can chain calls to
 * update values.
 */
ForwardingFlags.prototype.setNfdForwardingFlags = function(nfdForwardingFlags)
{
  this.childInherit =
    ((nfdForwardingFlags & ForwardingFlags.NfdForwardingFlags_CHILD_INHERIT) != 0);
  this.capture =
    ((nfdForwardingFlags & ForwardingFlags.NfdForwardingFlags_CAPTURE) != 0);
  return this;
};

/**
 * Get the value of the "childInherit" flag.
 * @return {Boolean} true if the flag is set, false if it is cleared.
 */
ForwardingFlags.prototype.getChildInherit = function() { return this.childInherit; };

/**
 * Get the value of the "capture" flag.
 * @return {Boolean} true if the flag is set, false if it is cleared.
 */
ForwardingFlags.prototype.getCapture = function() { return this.capture; };

/**
 * Get the origin value.
 * @return {number} The origin value, or null if not specified.
 */
ForwardingFlags.prototype.getOrigin = function()
{
  return this.origin;
};

/**
 * Set the value of the "childInherit" flag
 * @param {number} childInherit true to set the "childInherit" flag, false to
 * clear it.
 * @return {ForwardingFlags} This ForwardingFlags so that you can chain calls to
 * update values.
 */
ForwardingFlags.prototype.setChildInherit = function(childInherit)
{ 
  this.childInherit = childInherit;
  return this;
};

/**
 * Set the value of the "capture" flag
 * @param {number} capture true to set the "capture" flag, false to clear it.
 * @return {ForwardingFlags} This ForwardingFlags so that you can chain calls to
 * update values.
 */
ForwardingFlags.prototype.setCapture = function(capture)
{ 
  this.capture = capture;
  return this;
};

/**
 * Set the origin value.
 * @param {number} origin The new origin value, or null for not specified.
 */
ForwardingFlags.prototype.setOrigin = function(origin)
{
  this.origin = origin;
  return this;
};
