let on = false;

chrome.storage.sync.set({
  showAccents: false
})

chrome.browserAction.onClicked.addListener(() => {
  on = !on;

  chrome.storage.sync.set({
    showAccents: on
  });

  chrome.tabs.query({currentWindow: true}, (tabs) => {
    tabs.forEach((tab) => {
      applyStylesheetToTab(tab.id);
    });
  });  
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

const applyStylesheetToTab = (id) => {
  loadDependencies(id);
  
  chrome.tabs.executeScript(id, {
    file: 'src/akusento.js'
  }, () => {
    if(chrome.runtime.lastError) {
      console.log(chrome.runtime.lastError.message);
    }
  });
}