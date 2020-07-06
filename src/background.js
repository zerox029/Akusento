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
    toggleAccentsOnAllTabs();
  })
}

const setBadge = () => {
  const text = isOn ? 'ON' : ''; 
  if(chrome.browserAction.setBadgeText) {
    chrome.browserAction.setBadgeBackgroundColor({color: "#f24438"})
    chrome.browserAction.setBadgeText({text});
  }
}

// TODO: Find a better way to do this
const loadDependencies = (id) => {
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

const toggleAccentsOnAllTabs = () => {
  chrome.tabs.query({currentWindow: true}, (tabs) => {
    tabs.forEach((tab) => {
      toggleAccentsOnTab(tab.id);
    });
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