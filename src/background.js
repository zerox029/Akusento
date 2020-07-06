let on = false;

chrome.storage.sync.set({
  showAccents: false
})

chrome.tabs.onActivated.addListener((activeInfo) => {
  toggleAccentsOnTab(activeInfo.tabId);
})

chrome.tabs.onUpdated.addListener((activeInfo) => {
  toggleAccentsOnTab(activeInfo.tabId);
})

chrome.browserAction.onClicked.addListener(() => {
  on = !on;

  chrome.storage.sync.set({
    showAccents: on
  });

  toggleAccentsOnTab(activeInfo.tabId);
})

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
  chrome.storage.sync.get(['showAccents'], (res) => { 
    if(res.value)
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
  });
}