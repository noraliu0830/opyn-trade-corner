(this["webpackJsonpopyn-taco"]=this["webpackJsonpopyn-taco"]||[]).push([[11],{1666:function(e,t,i){var r=i(42),n=i(11).Buffer,s=i(104),a=i(1685),c=i(89),o=n.from("Bitcoin seed","utf8"),p={private:76066276,public:76067358};function u(e){this.versions=e||p,this.depth=0,this.index=0,this._privateKey=null,this._publicKey=null,this.chainCode=null,this._fingerprint=0,this.parentFingerprint=0}function d(e,t,i){var r=n.allocUnsafe(78);r.writeUInt32BE(t,0),r.writeUInt8(e.depth,4);var s=e.depth?e.parentFingerprint:0;return r.writeUInt32BE(s,5),r.writeUInt32BE(e.index,9),e.chainCode.copy(r,13),i.copy(r,45),r}function h(e){var t=s.createHash("sha256").update(e).digest();return s.createHash("ripemd160").update(t).digest()}Object.defineProperty(u.prototype,"fingerprint",{get:function(){return this._fingerprint}}),Object.defineProperty(u.prototype,"identifier",{get:function(){return this._identifier}}),Object.defineProperty(u.prototype,"pubKeyHash",{get:function(){return this.identifier}}),Object.defineProperty(u.prototype,"privateKey",{get:function(){return this._privateKey},set:function(e){r.equal(e.length,32,"Private key must be 32 bytes."),r(!0===c.privateKeyVerify(e),"Invalid private key"),this._privateKey=e,this._publicKey=c.publicKeyCreate(e,!0),this._identifier=h(this.publicKey),this._fingerprint=this._identifier.slice(0,4).readUInt32BE(0)}}),Object.defineProperty(u.prototype,"publicKey",{get:function(){return this._publicKey},set:function(e){r(33===e.length||65===e.length,"Public key must be 33 or 65 bytes."),r(!0===c.publicKeyVerify(e),"Invalid public key"),this._publicKey=c.publicKeyConvert(e,!0),this._identifier=h(this.publicKey),this._fingerprint=this._identifier.slice(0,4).readUInt32BE(0),this._privateKey=null}}),Object.defineProperty(u.prototype,"privateExtendedKey",{get:function(){return this._privateKey?a.encode(d(this,this.versions.private,n.concat([n.alloc(1,0),this.privateKey]))):null}}),Object.defineProperty(u.prototype,"publicExtendedKey",{get:function(){return a.encode(d(this,this.versions.public,this.publicKey))}}),u.prototype.derive=function(e){if("m"===e||"M"===e||"m'"===e||"M'"===e)return this;var t=e.split("/"),i=this;return t.forEach((function(e,t){if(0!==t){var n=e.length>1&&"'"===e[e.length-1],s=parseInt(e,10);r(s<2147483648,"Invalid index"),n&&(s+=2147483648),i=i.deriveChild(s)}else r(/^[mM]{1}/.test(e),'Path must start with "m" or "M"')})),i},u.prototype.deriveChild=function(e){var t,i=e>=2147483648,a=n.allocUnsafe(4);if(a.writeUInt32BE(e,0),i){r(this.privateKey,"Could not derive hardened child key");var o=this.privateKey,p=n.alloc(1,0);o=n.concat([p,o]),t=n.concat([o,a])}else t=n.concat([this.publicKey,a]);var d=s.createHmac("sha512",this.chainCode).update(t).digest(),h=d.slice(0,32),f=d.slice(32),y=new u(this.versions);if(this.privateKey)try{y.privateKey=c.privateKeyTweakAdd(this.privateKey,h)}catch(l){return this.deriveChild(e+1)}else try{y.publicKey=c.publicKeyTweakAdd(this.publicKey,h,!0)}catch(l){return this.deriveChild(e+1)}return y.chainCode=f,y.depth=this.depth+1,y.parentFingerprint=this.fingerprint,y.index=e,y},u.prototype.sign=function(e){return c.sign(e,this.privateKey).signature},u.prototype.verify=function(e,t){return c.verify(e,t,this.publicKey)},u.prototype.wipePrivateData=function(){return this._privateKey&&s.randomBytes(this._privateKey.length).copy(this._privateKey),this._privateKey=null,this},u.prototype.toJSON=function(){return{xpriv:this.privateExtendedKey,xpub:this.publicExtendedKey}},u.fromMasterSeed=function(e,t){var i=s.createHmac("sha512",o).update(e).digest(),r=i.slice(0,32),n=i.slice(32),a=new u(t);return a.chainCode=n,a.privateKey=r,a},u.fromExtendedKey=function(e,t){var i=new u(t=t||p),n=a.decode(e),s=n.readUInt32BE(0);r(s===t.private||s===t.public,"Version mismatch: does not match private or public"),i.depth=n.readUInt8(4),i.parentFingerprint=n.readUInt32BE(5),i.index=n.readUInt32BE(9),i.chainCode=n.slice(13,45);var c=n.slice(45);return 0===c.readUInt8(0)?(r(s===t.private,"Version mismatch: version does not match private"),i.privateKey=c.slice(1)):(r(s===t.public,"Version mismatch: version does not match public"),i.publicKey=c),i},u.fromJSON=function(e){return u.fromExtendedKey(e.xpriv)},u.HARDENED_OFFSET=2147483648,e.exports=u},1685:function(e,t,i){"use strict";var r=i(65),n=i(1686);e.exports=n((function(e){var t=r("sha256").update(e).digest();return r("sha256").update(t).digest()}))},1686:function(e,t,i){"use strict";var r=i(1687),n=i(11).Buffer;e.exports=function(e){function t(t){var i=t.slice(0,-4),r=t.slice(-4),n=e(i);if(!(r[0]^n[0]|r[1]^n[1]|r[2]^n[2]|r[3]^n[3]))return i}return{encode:function(t){var i=e(t);return r.encode(n.concat([t,i],t.length+4))},decode:function(e){var i=t(r.decode(e));if(!i)throw new Error("Invalid checksum");return i},decodeUnsafe:function(e){var i=r.decodeUnsafe(e);if(i)return t(i)}}}},1687:function(e,t,i){var r=i(439);e.exports=r("123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz")},1688:function(e,t,i){"use strict";i.r(t),i.d(t,"generateAddresses",(function(){return p})),i.d(t,"isValidPath",(function(){return u}));var r=i(1666),n=i.n(r),s=i(70),a=i(2),c=s.publicToAddress,o=s.toChecksumAddress;function p(e,t){var i=e.publicKey,r=e.chainCode,s=e.path,p=new n.a;p.publicKey=new a.Buffer(i,"hex"),p.chainCode=new a.Buffer(r,"hex");for(var u=[],d=t;d<5+t;d++){var h=p.deriveChild(d),f=c(h.publicKey,!0).toString("hex");u.push({dPath:"".concat(s,"/").concat(d),address:o(f)})}return u}function u(e){var t=e.split("/");if("m"!==t[0])return!1;if("44'"!==t[1])return!1;if("60'"!==t[2]&&"1'"!==t[2])return!1;if(void 0===t[3])return!0;var i=Number(t[3][0]);if(isNaN(i)||i<0||"'"!==t[3][1])return!1;if(void 0===t[4])return!0;var r=Number(t[4][0]);if(isNaN(r)||r<0)return!1;if(void 0===t[5])return!0;var n=Number(t[5][0]);return!(isNaN(n)||n<0)}}}]);
//# sourceMappingURL=11.48fdf136.chunk.js.map