import React, { createContext, useState, useRef, useEffect, useContext } from 'react';
import SockJS from 'sockjs-client';
import { Client } from '@stomp/stompjs';

function _objectWithoutPropertiesLoose(source, excluded) {
  if (source == null) return {};
  var target = {};
  var sourceKeys = Object.keys(source);
  var key, i;

  for (i = 0; i < sourceKeys.length; i++) {
    key = sourceKeys[i];
    if (excluded.indexOf(key) >= 0) continue;
    target[key] = source[key];
  }

  return target;
}

var StompContext = createContext(undefined);

var _excluded = ["url", "children", "stompClientOptions"];

function StompSessionProvider(props) {
  var url = props.url,
      children = props.children,
      stompClientOptions = props.stompClientOptions,
      stompOptions = _objectWithoutPropertiesLoose(props, _excluded);

  if (stompClientOptions) stompOptions = stompClientOptions;

  var _useState = useState(undefined),
      client = _useState[0],
      setClient = _useState[1];

  var subscriptionRequests = useRef(new Map());
  useEffect(function () {
    var _client = new Client(stompOptions);

    if (!stompOptions.brokerURL && !stompOptions.webSocketFactory) {
      _client.webSocketFactory = function () {
        var _window, _window$location;

        var parsedUrl = new URL(url, (_window = window) === null || _window === void 0 ? void 0 : (_window$location = _window.location) === null || _window$location === void 0 ? void 0 : _window$location.href);

        if (parsedUrl.protocol === 'http:' || parsedUrl.protocol === 'https:') {
          return new SockJS(url);
        } else if (parsedUrl.protocol === 'ws:' || parsedUrl.protocol === 'wss:') {
          return new WebSocket(url);
        } else throw new Error('Protocol not supported');
      };
    }

    _client.onConnect = function (frame) {
      if (stompOptions.onConnect) stompOptions.onConnect(frame);
      subscriptionRequests.current.forEach(function (value) {
        value.subscription = _client.subscribe(value.destination, value.callback, value.headers);
      });
    };

    if (!stompOptions.onStompError) {
      _client.onStompError = function (frame) {
        throw frame;
      };
    }

    _client.activate();

    setClient(_client);
    return function () {
      _client.deactivate();
    };
  }, [url].concat(Object.values(stompOptions)));

  var subscribe = function subscribe(destination, callback, headers) {
    if (headers === void 0) {
      headers = {};
    }

    var subscriptionId = Math.random().toString(36).substr(2, 9);
    var subscriptionRequest = {
      destination: destination,
      callback: callback,
      headers: headers
    };
    subscriptionRequests.current.set(subscriptionId, subscriptionRequest);

    if (client && client.connected) {
      subscriptionRequest.subscription = client.subscribe(destination, callback, headers);
    }

    return function () {
      var subscriptionData = subscriptionRequests.current.get(subscriptionId);

      if (subscriptionData.subscription) {
        subscriptionData.subscription.unsubscribe();
      }

      subscriptionRequests.current["delete"](subscriptionId);
    };
  };

  return React.createElement(StompContext.Provider, {
    value: {
      client: client,
      subscribe: subscribe
    }
  }, children);
}

function useSubscription(destinations, onMessage, headers) {
  if (headers === void 0) {
    headers = {};
  }

  var stompContext = useContext(StompContext);
  if (stompContext === undefined) throw new Error('There must be a StompSessionProvider as Ancestor of all Stomp Hooks and HOCs');
  var callbackRef = useRef(onMessage);

  var _destinations = Array.isArray(destinations) ? destinations : [destinations];

  callbackRef.current = onMessage;
  useEffect(function () {
    var cleanUpFunctions = [];

    _destinations.forEach(function (_destination) {
      return cleanUpFunctions.push(stompContext.subscribe(_destination, function (message) {
        callbackRef.current(message);
      }, headers));
    });

    return function () {
      cleanUpFunctions.forEach(function (_cleanUpFunction) {
        _cleanUpFunction();
      });
    };
  }, [].concat(Object.values(_destinations), Object.values(headers)));
}

function useSubscriptionInteractive(destinations, onMessage, headers) {
  if (headers === void 0) {
    headers = {};
  }

  var stompContext = useContext(StompContext);
  if (stompContext === undefined) throw new Error('There must be a StompSessionProvider as Ancestor of all Stomp Hooks and HOCs');
  var callbackRef = useRef(onMessage);

  var _destinations = Array.isArray(destinations) ? destinations : [destinations];

  callbackRef.current = onMessage;
  var cleanUpFunctions = [];

  var subscribe = function subscribe() {
    unsubscribe();

    _destinations.forEach(function (_destination) {
      return cleanUpFunctions.push(stompContext.subscribe(_destination, function (message) {
        callbackRef.current(message);
      }, headers));
    });
  };

  var unsubscribe = function unsubscribe() {
    cleanUpFunctions.forEach(function (_cleanUpFunction) {
      _cleanUpFunction();
    });
  };

  useEffect(function () {
    return function () {
      unsubscribe();
    };
  }, [unsubscribe]);
  return [subscribe, unsubscribe];
}

function useStompClient() {
  var context = useContext(StompContext);
  if (context === undefined) throw new Error('There must be a StompSessionProvider as Ancestor of all Stomp Hooks and HOCs');
  return context.client;
}

function withStompClient(WrappedComponent) {
  return function (props) {
    var stompClient = useStompClient();
    return React.createElement(WrappedComponent, Object.assign({
      stompClient: stompClient
    }, props));
  };
}

function withSubscription(WrappedComponent, destinations, headers) {
  if (headers === void 0) {
    headers = {};
  }

  return function (props) {
    var ref = useRef();
    useSubscription(destinations, function (message) {
      if (ref.current) ref.current.onMessage(message);
    }, headers);
    return React.createElement(WrappedComponent, Object.assign({
      ref: ref
    }, props));
  };
}

export { StompContext, StompSessionProvider, useStompClient, useSubscription, useSubscriptionInteractive, withStompClient, withSubscription };
//# sourceMappingURL=index.modern.js.map
