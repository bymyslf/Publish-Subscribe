var Publisher=function(){function f(){this.subscribers={}}f.prototype={subscribe:function(d,c,a,e){if(d&&c){var b=this.subscribers[d];a=a||window;if(e){var f=this,g=c;c=function(){f.unsubscribe(d,c);g.apply(a,Array.prototype.slice.apply(arguments))}}b||(b=this.subscribers[d]=[]);b.push({callback:c,context:a});return this}},one:function(d,c,a){this.subscribe(d,c,a,!0);return this},unsubscribe:function(d,c){var a=this.subscribers[d],e=a.length,b=0;if(a){for(;b<e;++b)c===a[b].callback&&a.splice(b,1);
return this}},publish:function(d){var c=Array.prototype.slice.apply(arguments),a=this.subscribers[d],e=0,b=0;if(a){c.shift();for(e=a.length;b<e;++b)a[b].callback.apply(a[b].context,c);return this}}};return f}();