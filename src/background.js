let isOn = false;
chrome.storage.sync.set({
  showAccents: false
})

const setListeners = () => {
  chrome.tabs.onActivated.addListener((activeInfo) => {
    toggleAccentsOnTab(activeInfo.tabId);
  })
  
  chrome.tabs.onUpdated.addListener((activeInfo) => {
    toggleAccentsOnTab(activeInfo.tabId);
  })
  
  chrome.browserAction.onClicked.addListener(() => {
    isOn = !isOn;
  
    chrome.storage.sync.set({
      showAccents: isOn
    });
  
    setBadge();
    chrome.tabs.query({currentWindow: true}, (tabs) => {
      tabs.forEach((tab) => {
        toggleAccentsOnTab(tab.id);
      });
    });  
  })
}

const setBadge = () => {
  const text = isOn ? 'ON' : ''; 
  if(chrome.browserAction.setBadgeText) {
    chrome.browserAction.setBadgeBackgroundColor({color: "#f24438"})
    chrome.browserAction.setBadgeText({text});
  }
}

const loadDependencies = (id) => {
  ///TODO: Find a better way to do this
  chrome.tabs.executeScript(id, {
    file: 'rakutenma/rakutenma.js'
  }, () => {
    if(chrome.runtime.lastError) {
      console.log(chrome.runtime.lastError.message);
    }
  });

  chrome.tabs.executeScript(id, {
    file: 'rakutenma/model_ja.js'
  }, () => {
    if(chrome.runtime.lastError) {
      console.log(chrome.runtime.lastError.message);
    }
  });

  chrome.tabs.executeScript(id, {
    file: 'rakutenma/hanzenkaku.js'
  }, () => {
    if(chrome.runtime.lastError) {
      console.log(chrome.runtime.lastError.message);
    }
  });

  chrome.tabs.executeScript(id, {
    file: 'data/dict.js'
  }, () => {
    if(chrome.runtime.lastError) {
      console.log(chrome.runtime.lastError.message);
    }
  });

  chrome.tabs.executeScript(id, {
    file: 'src/tokenizer.js'
  }, () => {
    if(chrome.runtime.lastError) {
      console.log(chrome.runtime.lastError.message);
    }
  });
}

const toggleAccentsOnTab = (id) => {
  if(isOn)
  {
    loadDependencies(id);

    chrome.tabs.executeScript(id, {
      file: 'src/akusento.js'
    }, () => {
      if(chrome.runtime.lastError) {
        console.log(chrome.runtime.lastError.message);
      }
    });
  }
}

setListeners();