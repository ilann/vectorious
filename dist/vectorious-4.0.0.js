!function(t){if("object"==typeof exports&&"undefined"!=typeof module)module.exports=t();else if("function"==typeof define&&define.amd)define([],t);else{var r;r="undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof self?self:this,r.vectorious=t()}}(function(){return function t(r,e,a){function n(o,s){if(!e[o]){if(!r[o]){var h="function"==typeof require&&require;if(!s&&h)return h(o,!0);if(i)return i(o,!0);var p=new Error("Cannot find module '"+o+"'");throw p.code="MODULE_NOT_FOUND",p}var f=e[o]={exports:{}};r[o][0].call(f.exports,function(t){var e=r[o][1][t];return n(e?e:t)},f,f.exports,t,r,e,a)}return e[o].exports}for(var i="function"==typeof require&&require,o=0;o<a.length;o++)n(a[o]);return n}({1:[function(t,r,e){!function(){"use strict";var e=t("./matrix.js"),a=t("./vector.js");r.exports.Matrix=e,r.exports.Vector=a}()},{"./matrix.js":2,"./vector.js":4}],2:[function(t,r,e){!function(){"use strict";function e(t,r){if(this.type=Float64Array,this.shape=[],t&&t.buffer&&!(t instanceof a)&&"[object ArrayBuffer]"===Object.prototype.toString.call(t.buffer)&&r.shape){if(t.length!==r.shape[0]*r.shape[1])throw new Error("Shape does not match typed array dimensions.");this.shape=r.shape,this.data=t,this.type=t.constructor}else{if("[object Array]"===Object.prototype.toString.call(t))return e.fromArray(t);t instanceof a?(this.shape=r&&r.shape?r.shape:[t.length,1],this.data=new t.type(t.data),this.type=t.type):t instanceof e&&(this.shape=[t.shape[0],t.shape[1]],this.data=new t.type(t.data),this.type=t.type)}}var a=t("./vector"),n=null;try{n=t("nblas")}catch(i){}e.fromTypedArray=function(t,r){var a=Object.create(e.prototype);return a.shape=r,a.data=t,a.type=t.constructor,a},e.fromArray=function(t){var r,a,n=[];n[0]=t.length,n[1]=t[0].length,a=n[1],r=new Float64Array(n[0]*n[1]);for(var i=0;i<n[0];++i)for(var o=0;o<n[1];++o)r[i*a+o]=t[i][o];return e.fromTypedArray(r,n)},e.add=function(t,r){return new e(t).add(r)},e.prototype.add=function(t){var r=this.shape[0],e=this.shape[1],a=this.data,i=t.data;if(r!==t.shape[0]||e!==t.shape[1])throw new Error("sizes do not match: "+r+"x"+e+", "+t.shape[0]+"x"+t.shape[1]);if(!n||this.type!==Float64Array&&this.type!==Float32Array)for(var o=0;r>o;o++)for(var s=0;e>s;s++)a[o*e+s]+=i[o*e+s];else n.axpy(i,a);return this},e.subtract=function(t,r){return new e(t).subtract(r)},e.prototype.subtract=function(t){var r=this.shape[0],e=this.shape[1],a=this.data,i=t.data;if(r!==t.shape[0]||e!==t.shape[1])throw new Error("sizes do not match");if(!n||this.type!==Float64Array&&this.type!==Float32Array)for(var o=0;r>o;o++)for(var s=0;e>s;s++)a[o*e+s]-=i[o*e+s];else n.axpy(i,a,-1);return this},e.scale=function(t,r){return new e(t).scale(r)},e.prototype.scale=function(t){var r=this.shape[0],e=this.shape[1],a=this.data;if(!n||this.type!==Float64Array&&this.type!==Float32Array)for(var i=0;r>i;i++)for(var o=0;e>o;o++)a[i*e+o]*=t;else n.scal(a,t);return this},e.zeros=function(t,r,a){if(0>=t||0>=r)throw new Error("invalid size");a=a?a:Float64Array;var n=new a(t*r);if(n.fill)n.fill(0);else for(var i=0;t*r>i;i++)n[i]=0;return e.fromTypedArray(n,[t,r])},e.ones=function(t,r,a){if(0>=t||0>=r)throw new Error("invalid size");a=a?a:Float64Array;var n=new a(t*r);if(n.fill)n.fill(1);else for(var i=0;t*r>i;i++)n[i]=1;return e.fromTypedArray(n,[t,r])},e.random=function(t,r,a){return e.zeros(t,r,a).map(Math.random)},e.multiply=function(t,r){return t.multiply(r)},e.prototype.multiply=function(t){var r=this.shape[0],a=this.shape[1],i=t.shape[0],o=t.shape[1],s=this.data,h=t.data;if(a!==i)throw new Error("sizes do not match");var p=e.fromTypedArray(new this.type(r*o),[r,o]),f=p.data;if(!n||p.type!==Float64Array&&p.type!==Float32Array)for(var u=0;r>u;u++)for(var l=0;o>l;l++){for(var d=0,c=0;a>c;c++)d+=s[u*a+c]*h[l+c*o];f[u*o+l]=d}else n.gemm(s,h,f,r,o,a);return p},e.transpose=function(t){return new e(t).transpose()},e.prototype.transpose=function(){var t,r,a=this.shape[0],n=this.shape[1];if(a===n){for(t=0;a-1>t;t++)for(r=t+1;a>r;r++){var i=this.data[r*a+t];this.data[r*a+t]=this.data[t*a+r],this.data[t*a+r]=i}return this}var o=new this.type(n*a);for(t=0;a>t;t++)for(r=0;n>r;r++)o[r*a+t]=this.data[t*n+r];return e.fromTypedArray(o,[n,a])},e.prototype.inverse=function(){var t=this.shape[0],r=this.shape[1];if(t!==r)throw new Error("invalid dimensions");var a,n,i=e.identity(t),o=e.augment(this,i),s=o.gauss(),h=e.zeros(t,r),p=e.zeros(t,r),f=s.shape[1];for(a=0;t>a;a++)for(n=0;f>n;n++)r>n?h.set(a,n,s.get(a,n)):p.set(a,n-t,s.get(a,n));if(!h.equals(e.identity(t)))throw new Error("matrix is not invertible");return p},e.prototype.gauss=function(){var t,r,a,n,i,o=this.shape[0],s=this.shape[1],h=new e(this),p=0;for(r=0;o>r;r++){if(p>=s)return new Error("matrix is singular");for(a=r;0===h.data[a*s+p];)if(a++,o===a&&(a=r,p++,s===p))return new Error("matrix is singular");if(h.swap(r,a),t=h.data[r*s+p],0!==t)for(n=0;s>n;n++)h.data[r*s+n]=h.data[r*s+n]/t;for(a=0;o>a;a++)if(i=h.data[a*s+p],a!==r)for(n=0;s>n;n++)h.data[a*s+n]=h.data[a*s+n]-h.data[r*s+n]*i;p++}for(r=0;o>r;r++){for(t=0,a=0;s>a;a++)t||(t=h.data[r*s+a]);if(t)for(n=0;s>n;n++)h.data[r*s+n]=h.data[r*s+n]/t}return h},e.prototype.pivotize=function(){var t,r,a,n,i,o=this.shape[0],s=e.identity(o),h=1;for(n=0;o>n;n++){for(t=0,a=n,i=n;o>i;i++)r=Math.abs(this.get(i,n)),r>t&&(t=r,a=i);n!==a&&(s.swap(n,a),h*=-1)}return[s,h]},e.prototype.lu=function(){var t,r,a,n=this.shape[0],i=e.identity(n),o=e.zeros(n,n),s=this.pivotize(),h=e.multiply(s[0],this),p=[0,0];for(t=0;n>t;t++){for(r=0;t+1>r;r++){for(p[0]=0,a=0;r>a;a++)p[0]+=o.get(a,t)*i.get(r,a);o.set(r,t,h.get(r,t)-p[0])}for(r=t;n>r;r++){for(p[1]=0,a=0;r>a;a++)p[1]+=o.get(a,t)*i.get(r,a);i.set(r,t,(h.get(r,t)-p[1])/o.get(t,t))}}return[i,o,s]},e.augment=function(t,r){return new e(t).augment(r)},e.prototype.augment=function(t){if(0===t.shape.length)return this;var r,e,a=this.shape[0],n=this.shape[1],i=t.shape[0],o=t.shape[1],s=this.data,h=t.data;if(a!==i)throw new Error("Rows do not match.");var p=new this.type((n+o)*a);for(r=0;a>r;r++)for(e=0;n>e;e++)p[r*(n+o)+e]=s[r*a+e];for(r=0;a>r;r++)for(e=0;o>e;e++)p[r*(n+o)+e+n]=h[r*a+e];return this.shape=[a,n+o],this.data=p,this},e.identity=function(t,r){if(0>t)throw new Error("invalid size");r=r?r:Float64Array;var a,n=e.zeros(t,t,r);for(a=0;t>a;a++)n.data[a*t+a]=1;return n},e.magic=function(t,r){function a(t,r,e){return(r+2*e+1)%t}if(0>t)throw new Error("invalid size");r=r?r:Float64Array;var n,i,o=e.zeros(t,t,r);for(n=0;t>n;n++)for(i=0;t>i;i++)o.data[(t-n-1)*t+(t-i-1)]=a(t,t-i-1,n)*t+a(t,i,n)+1;return o},e.prototype.diag=function(){for(var t=this.shape[0],r=this.shape[1],e=new this.type(Math.min(t,r)),n=0;t>n&&r>n;n++)e[n]=this.data[n*r+n];return new a(e)},e.prototype.determinant=function(){if(this.shape[0]!==this.shape[1])throw new Error("matrix is not square");for(var t=this.lu(),r=t.pop(),e=t.pop(),a=t.pop(),n=1,i=this.shape[0],o=0;i>o;o++)n*=a.get(o,o)*e.get(o,o);return r.pop()*n},e.prototype.trace=function(){var t,r,e=this.diag(),a=0;for(t=0,r=e.length;r>t;t++)a+=e.get(t);return a},e.equals=function(t,r){return t.equals(r)},e.prototype.equals=function(t){var r=this.shape[0],e=this.shape[1],a=this.data,n=t.data;if(r!==t.shape[0]||e!==t.shape[1]||this.type!==t.type)return!1;for(var i=0;r*e>i;i++)if(a[i]!==n[i])return!1;return!0},e.prototype.get=function(t,r){if(0>t||0>r||t>this.shape[0]-1||r>this.shape[1]-1)throw new Error("index out of bounds");return this.data[t*this.shape[1]+r]},e.prototype.set=function(t,r,e){if(0>t||0>r||t>this.shape[0]-1||r>this.shape[1]-1)throw new Error("index out of bounds");return this.data[t*this.shape[1]+r]=e,this},e.prototype.swap=function(t,r){if(0>t||0>r||t>this.shape[0]-1||r>this.shape[0]-1)throw new Error("index out of bounds");var e=this.shape[1],a=this.data.slice(t*e,(t+1)*e);return this.data.copyWithin(t*e,r*e,(r+1)*e),this.data.set(a,r*e),this},e.prototype.map=function(t){var r=new e(this);return r.data=this.data.map(t),r},e.prototype.each=function(t){var r=this.shape[1];return this.data.forEach(function(e,a){t(e,a/r|0,a%r)}),this},e.prototype.toString=function(){for(var t=[],r=this.shape[0],e=this.shape[1],a=0;r>a;a++)t.push("["+this.data.subarray(a*e,(a+1)*e).toString()+"]");return"["+t.join(", \n")+"]"},e.prototype.toArray=function(){for(var t=[],r=this.shape[0],e=this.shape[1],a=0;r>a;a++)t.push(Array.prototype.slice.call(this.data.subarray(a*e,(a+1)*e)));return t},e.prototype.toVector=function(){var t=this.shape[0],r=this.shape[1];if(1!==t&&1!==r)throw new Error("invalid matrix shape");return new a(this.data)},r.exports=e}()},{"./vector":4,nblas:3}],3:[function(t,r,e){},{}],4:[function(t,r,e){!function(){"use strict";function e(t){this.type=Float64Array,this.length=0,t instanceof e?this.combine(t):t instanceof Array?(this.data=new this.type(t),this.length=t.length):t&&t.buffer&&"[object ArrayBuffer]"===Object.prototype.toString.call(t.buffer)&&(this.data=t,this.length=t.length,this.type=t.constructor)}var a=null;try{a=t("nblas")}catch(n){}e.add=function(t,r){return new e(t).add(r)},e.prototype.add=function(t){var r=this.length,e=t.length;if(r!==e)throw new Error("sizes do not match!");if(!r&&!e)return this;if(!a||this.type!==Float64Array&&this.type!==Float32Array)for(var n=0;r>n;n++)this.data[n]+=t.data[n];else a.axpy(t.data,this.data);return this},e.subtract=function(t,r){return new e(t).subtract(r)},e.prototype.subtract=function(t){var r=this.length,e=t.length;if(r!==e)throw new Error("sizes do not match");if(!r&&!e)return this;if(!a||this.type!==Float64Array&&this.type!==Float32Array){var n;for(n=0;r>n;n++)this.data[n]+=t.data[n]}else a.axpy(t.data,this.data,-1);return this},e.scale=function(t,r){return new e(t).scale(r)},e.prototype.scale=function(t){if(!a||this.type!==Float64Array&&this.type!==Float32Array){var r;for(r=this.length-1;r>=0;r--)this.data[r]*=t}else a.scal(this.data,t);return this},e.normalize=function(t){return new e(t).normalize()},e.prototype.normalize=function(){return this.scale(1/this.magnitude())},e.project=function(t,r){return t.project(new e(r))},e.prototype.project=function(t){return t.scale(this.dot(t)/t.dot(t))},e.zeros=function(t,r){if(0>t)throw new Error("invalid size");if(0===t)return new e;r=r?r:Float64Array;var a,n=new r(t);if(n.fill)n.fill(0);else for(a=0;t>a;a++)n[a]=0;return new e(n)},e.ones=function(t,r){if(0>t)throw new Error("invalid size");if(0===t)return new e;r=r?r:Float64Array;var a,n=new r(t);if(n.fill)n.fill(1);else for(a=0;t>a;a++)n[a]=1;return new e(n)},e.range=function(){var t,r,a,n=[].slice.call(arguments,0),i=!1,o=Float64Array;switch("function"==typeof n[n.length-1]&&(o=n.pop()),n.length){case 2:a=n.pop(),r=1,t=n.pop();break;case 3:a=n.pop(),r=n.pop(),t=n.pop();break;default:throw new Error("invalid range")}if(0>a-t){var s=a;a=t,t=s,i=!0}if(r>a-t)throw new Error("invalid range");var h,p,f=e.zeros(Math.ceil((a-t)/r),o);for(h=t,p=0;a>h;h+=r,p++)f.data[p]=i?a-h+t:h;return f},e.random=function(t,r){return e.zeros(t,r).map(Math.random)},e.dot=function(t,r){return t.dot(r)},e.prototype.dot=function(t){if(this.length!==t.length)throw new Error("sizes do not match");var r=this.data,e=t.data;if(a&&(this.type===Float64Array||this.type===Float32Array))return a.dot(r,e);var n,i,o=0;for(n=0,i=this.length;i>n;n++)o+=r[n]*e[n];return o},e.prototype.magnitude=function(){if(!this.length)return 0;if(a&&(this.type===Float64Array||this.type===Float32Array))return a.nrm2(this.data);var t,r,e=0,n=this.data;for(t=0,r=this.length;r>t;t++)e+=n[t]*n[t];return Math.sqrt(e)},e.angle=function(t,r){return t.angle(r)},e.prototype.angle=function(t){return Math.acos(this.dot(t)/this.magnitude()*t.magnitude())},e.equals=function(t,r){return t.equals(r)},e.prototype.equals=function(t){if(this.length!==t.length)return!1;for(var r=this.data,e=t.data,a=0,n=this.length;n>a&&r[a]===e[a];)a++;return a===n},e.prototype.get=function(t){if(0>t||t>this.length-1)throw new Error("index out of bounds");return this.data[t]},e.prototype.min=function(){var t,r,e,a=Number.POSITIVE_INFINITY,n=this.data;for(r=0,e=n.length;e>r;r++)t=n[r],a>t&&(a=t);return a},e.prototype.max=function(){if(a&&this.type===Float64Array)return this.data[a.idamax(this.length,this.data,1)];if(a&&this.type===Float32Array)return this.data[a.isamax(this.length,this.data,1)];var t,r,e,n=Number.NEGATIVE_INFINITY,i=this.data;for(r=0,e=this.length;e>r;r++)t=i[r],t>n&&(n=t);return n},e.prototype.set=function(t,r){if(0>t||t>this.length-1)throw new Error("index out of bounds");return this.data[t]=r,this},e.combine=function(t,r){return new e(t).combine(r)},e.prototype.combine=function(t){if(!t.length)return this;if(!this.length)return this.data=new t.type(t.data),this.length=t.length,this.type=t.type,this;var r=this.length,e=t.length,n=this.data,i=t.data,o=new this.type(r+e);if(!a||this.type!==Float64Array&&this.type!==Float32Array)for(var s=0;r>s;s++)o[s]=n[s];else a.copy(n,o);for(var h=0;e>h;h++)o[r+h]=i[h];return this.data=o,this.length=r+e,this},e.prototype.push=function(t){return this.combine(new e([t]))},e.prototype.map=function(t){var r;for(r=0;r<this.length;r++)this.data[r]=t(this.data[r]);return this},e.prototype.each=function(t){var r;for(r=0;r<this.length;r++)t(this.data[r],r);return this},e.prototype.toString=function(){var t,r="";for(t=0;t<this.length;t++)r+=t>0?", "+this.data[t]:this.data[t];return"["+r+"]"},e.prototype.toArray=function(){return this.data?Array.prototype.slice.call(this.data):[]},r.exports=e}()},{nblas:3}]},{},[1])(1)});
//# sourceMappingURL=vectorious-4.0.0.js.map