var Publisher = (function () {
    function Publisher() {
        // Store an object of subscribers
        this.subscribers = {};
    };
 
    Publisher.prototype = {
        subscribe: function (event, callback, context, one) {
             if (!event || !callback) {
                return;
            }
           
            var eventSubscribers = this.subscribers[event];
 
            // Default context
            context = context || window;
            // Default one
            one = one || false;
 
            if (one) {
                var self = this,
                    original = callback;
 
                callback = function () {
                    self.unsubscribe(event, callback);
                    original.apply(context, Array.prototype.slice.apply(arguments));
                };
            }
            // Add the callback to our list of subscribers. Store the context with the subscriber
            // so we can set the context when publishing.
            if (!eventSubscribers) {
                eventSubscribers = this.subscribers[event] = [];
            }
 
            eventSubscribers.push({
                callback: callback,
                context: context
            });
 
            return this;
        },
        one: function (event, callback, context) {
            this.subscribe(event, callback, context, true);
 
            return this;
        },
        unsubscribe: function (event, callback) {
            var eventSubscribers = this.subscribers[event],
                eventSubscribersLength = eventSubscribers.length,
                i = 0;
 
            if (!eventSubscribers) {
                return;
            }
 
            // Slice the callback OUT of the subscribers list.
            for (; i < eventSubscribersLength; ++i) {
                if (callback === eventSubscribers[i].callback) {
                    eventSubscribers.splice(i, 1);
                }
            }
 
            return this;
        },
        publish: function (event) {
            var publishArguments = Array.prototype.slice.apply(arguments),
                eventSubscribers = this.subscribers[event],
                eventSubscribersLength = 0,
                i = 0;
 
            if (!eventSubscribers) {
                return;
            }
 
            // Removes first array position. This is the event to publish.
            publishArguments.shift();
            // Store eventSubscribers length
            eventSubscribersLength = eventSubscribers.length;
 
            // Loop over all the subscribers to publish the event object to their callbacks.
            for (; i < eventSubscribersLength; ++i) {
               eventSubscribers[i].callback.apply(
                    eventSubscribers[i].context,
                    publishArguments
                );
            }
 
            return this;
        }
    };
 
    return Publisher;
})();