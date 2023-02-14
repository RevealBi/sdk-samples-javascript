var host;
window.revealBridge = {
  sendMessageToHost: function (data) {
    try {
      var iframe = document.createElement("IFRAME");
      var message = encodeURIComponent(JSON.stringify(data));
      iframe.setAttribute("src", "js-frame:" + message);
      document.documentElement.appendChild(iframe);
      iframe.parentNode.removeChild(iframe);
      iframe = null;
    }
    catch (e) {
      // The frame couldn't be created. 
      // This could happen in web environments when the host is not in the same domain than the custom view webpage.
      // Is not a problem as we are using window.postMessage for the communication in this case.
    }

    try {
      if (window.top && window.top.location) {
        window.top.postMessage(data, "*");
      }
    } catch (e) {
      // window.top.postMessage couldn't be executed.
      // This sould never happen but...
    }
  },

  notifyExtensionIsReady: function (formatting) {

    if (formatting) {
      this.sendMessageToHost({ message: "ready", formatting: true });
    } else {
      this.sendMessageToHost({ message: "ready" });
    }
  },

  runAction: function (actionName, data) {
    this.sendMessageToHost({ message: "runAction", action: actionName, rowData: data });
  },

  openUrl: function (url) {
    this.sendMessageToHost({ message: "openURL", URL: url });
  },
}

function processMessageFromHost(message) {
  if (!message || !message.data || !message.data.metadata) {
    return;
  }

  if (message.data.message) {
    // This is the same message that I'm sending to notify that the extension is ready and the iPad is sending it back here.
    return;
  }

  if (!window.revealBridgeListener) {
    return;
  }

  window.revealBridgeListener.dataReady(message.data);
};

window.addEventListener('message', processMessageFromHost, false);
