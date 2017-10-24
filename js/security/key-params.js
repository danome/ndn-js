/**
 * Copyright (C) 2014-2017 Regents of the University of California.
 * @author: Jeff Thompson <jefft0@remap.ucla.edu>
 * From ndn-cxx security by Yingdi Yu <yingdi@cs.ucla.edu>.
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

/** @ignore */
var Name = require('../name.js').Name; /** @ignore */
var KeyIdType = require('./key-id-type.js').KeyIdType; /** @ignore */
var KeyType = require('./security-types.js').KeyType;

/**
 * KeyParams is a base class for key parameters. This also defines the
 * subclasses which are used to store parameters for key generation.
 * 
 * Create a key generation parameter. This constructor is protected and used by
 * subclasses.
 * @param {number} keyType: The type for the created key, as an int from the
 * KeyType enum.
 * @param (number|Name.Component) keyIdTypeOrKeyId: If this is an int from the
 * KeyIdType enum, it is the method for how the key id should be generated,
 * which must not be KeyIdType.USER_SPECIFIED. If this is a Name.Component, it
 * is the user-specified key ID, in which case this sets the keyIdType to
 * KeyIdType.USER_SPECIFIED. (The keyId must not be empty.)
 * @throws Error if keyIdTypeOrKeyId is a KeyIdType and it is
 * KeyIdType.USER_SPECIFIED, or if keyIdTypeOrKeyId is a Name.Component and it
 * is empty.
 * @constructor
 */
var KeyParams = function KeyParams(keyType, keyIdTypeOrKeyId)
{
  this.keyType_ = keyType;

  if (keyIdTypeOrKeyId instanceof Name.Component) {
    var keyId = keyIdTypeOrKeyId;

    if (keyId.getValue().size() == 0)
      throw new Error("KeyParams: keyId is empty");

    this.keyIdType_ = KeyIdType.USER_SPECIFIED;
    this.keyId_ = keyId;
  }
  else {
    var keyIdType = keyIdTypeOrKeyId;

    if (keyIdType == KeyIdType.USER_SPECIFIED)
      throw new Error("KeyParams: KeyIdType is USER_SPECIFIED");

    this.keyIdType_ = keyIdType;
    this.keyId_ = new Name.Component();
  }
};

exports.KeyParams = KeyParams;

KeyParams.prototype.getKeyType = function() { return this.keyType_; };

KeyParams.prototype.getKeyIdType = function() { return this.keyIdType_; };

KeyParams.prototype.getKeyId = function() { return this.keyId_; };

/**
 * Possible forms of the constructor are:
 * RsaKeyParams(keyId, size)
 * RsaKeyParams(keyId)
 * RsaKeyParams(size, keyIdType)
 * RsaKeyParams(size)
 * RsaKeyParams()
 * @constructor
 */
var RsaKeyParams = function RsaKeyParams(keyIdOrSize, arg2)
{
  if (keyIdOrSize instanceof Name.Component) {
    var keyId = keyIdOrSize;
    // Call the base constructor.
    KeyParams.call(this, RsaKeyParams.getType(), keyId);

    if (arg2 == undefined)
      this.size_ = RsaKeyParams.getDefaultSize();
    else
      this.size_ = arg2;
  }
  else {
    var size = keyIdOrSize;
    if (size != undefined) {
      var keyIdType = (arg2 != undefined ? arg2 : KeyIdType.RANDOM);
      // Call the base constructor.
      KeyParams.call(this, RsaKeyParams.getType(), keyIdType);
      this.size_ = size;
    }
    else {
      // Call the base constructor.
      KeyParams.call(this, RsaKeyParams.getType(), KeyIdType.RANDOM);
      this.size_ = RsaKeyParams.getDefaultSize();
    }
  }
};

RsaKeyParams.prototype = new KeyParams();
RsaKeyParams.prototype.name = "RsaKeyParams";

exports.RsaKeyParams = RsaKeyParams;

RsaKeyParams.prototype.getKeySize = function() { return this.size_; };

RsaKeyParams.getDefaultSize = function() { return 2048; };

RsaKeyParams.getType = function() { return KeyType.RSA; };

/**
 * Possible forms of the constructor are:
 * EcdsaKeyParams(keyId, size)
 * EcdsaKeyParams(keyId)
 * EcdsaKeyParams(size, keyIdType)
 * EcdsaKeyParams(size)
 * EcdsaKeyParams()
 * @constructor
 */
var EcdsaKeyParams = function EcdsaKeyParams(keyIdOrSize, arg2)
{
  if (keyIdOrSize instanceof Name.Component) {
    var keyId = keyIdOrSize;
    // Call the base constructor.
    KeyParams.call(this, EcdsaKeyParams.getType(), keyId);

    if (arg2 == undefined)
      this.size_ = EcdsaKeyParams.getDefaultSize();
    else
      this.size_ = arg2;
  }
  else {
    var size = keyIdOrSize;
    if (size != undefined) {
      var keyIdType = (arg2 != undefined ? arg2 : KeyIdType.RANDOM);
      // Call the base constructor.
      KeyParams.call(this, EcdsaKeyParams.getType(), keyIdType);
      this.size_ = size;
    }
    else {
      // Call the base constructor.
      KeyParams.call(this, EcdsaKeyParams.getType(), KeyIdType.RANDOM);
      this.size_ = EcdsaKeyParams.getDefaultSize();
    }
  }
};

EcdsaKeyParams.prototype = new KeyParams();
EcdsaKeyParams.prototype.name = "EcdsaKeyParams";

exports.EcdsaKeyParams = EcdsaKeyParams;

EcdsaKeyParams.prototype.getKeySize = function() { return this.size_; };

EcdsaKeyParams.getDefaultSize = function() { return 256; };

EcdsaKeyParams.getType = function() { return KeyType.ECDSA; };

/**
 * Possible forms of the constructor are:
 * AesKeyParams(keyId, size)
 * AesKeyParams(keyId)
 * AesKeyParams(size, keyIdType)
 * AesKeyParams(size)
 * AesKeyParams()
 * @constructor
 */
var AesKeyParams = function AesKeyParams(keyIdOrSize, arg2)
{
  if (keyIdOrSize instanceof Name.Component) {
    var keyId = keyIdOrSize;
    // Call the base constructor.
    KeyParams.call(this, AesKeyParams.getType(), keyId);

    if (arg2 == undefined)
      this.size_ = AesKeyParams.getDefaultSize();
    else
      this.size_ = arg2;
  }
  else {
    var size = keyIdOrSize;
    if (size != undefined) {
      var keyIdType = (arg2 != undefined ? arg2 : KeyIdType.RANDOM);
      // Call the base constructor.
      KeyParams.call(this, AesKeyParams.getType(), keyIdType);
      this.size_ = size;
    }
    else {
      // Call the base constructor.
      KeyParams.call(this, AesKeyParams.getType(), KeyIdType.RANDOM);
      this.size_ = AesKeyParams.getDefaultSize();
    }
  }
};

AesKeyParams.prototype = new KeyParams();
AesKeyParams.prototype.name = "AesKeyParams";

exports.AesKeyParams = AesKeyParams;

AesKeyParams.prototype.getKeySize = function() { return this.size_; };

AesKeyParams.getDefaultSize = function() { return 64; };

AesKeyParams.getType = function() { return KeyType.AES; };
