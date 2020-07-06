const containsJapanese = (text) => {
  const regex = /[\u3040-\u30ff\u3400-\u4dbf\u4e00-\u9fff\uf900-\ufaff\uff66-\uff9f]/g;
  return regex.test(text);
}

const removeFurigana = () => {
  let furigana = document.getElementsByTagName('rt');

  if(furigana.length === 0) return;

  while(furigana[0])
    furigana[0].remove();
}

const getDictionnaryEntryFromKanji = (word) => {
  let entry = dict.find(entry => entry.kanji === word);

  return entry ? entry : null;
}

const getDictionnaryEntryFromPronunciation = (word) => {
  let entry = dict.find(entry => entry.pronunciation === word);

  return entry ? entry : null;
}

const getPitchPattern = (pitchMora, wordLength) => {
  if(pitchMora === 0)
    return "heiban";
  else if(pitchMora === 1)
    return "atamadaka";
  else if(pitchMora === wordLength)
    return "odaka";
  else
    return "nakadaka";
}

const tagWordAccent = (word) => {
  let dictEntry = getDictionnaryEntryFromKanji(word) || getDictionnaryEntryFromPronunciation(word);

  if(dictEntry)
  {
    var pitchMora = dictEntry.pitchMora[0][0];  
    return `<span class="${getPitchPattern(pitchMora, dictEntry.pronunciation.length)}">${word}</span>`
  }
  else
    return word;
}

const markTextAccents = (element) => {
  let paragraphs = document.getElementsByTagName('p');
  
  for(var i = 0; i < paragraphs.length; i++)
  {
    if(containsJapanese(paragraphs[i].textContent))
    {
      let tokens = tokenize(paragraphs[i].textContent);
  
      let newHtml = ''
      for(var j = 0; j < tokens.length; j++)
      {
        //If the token is a noun
        if(tokens[j][1].startsWith('N'))
          newHtml += tagWordAccent(tokens[j][0]);
        else
          newHtml += tokens[j][0];
      }
    
      paragraphs[i].innerHTML = newHtml
    }
  }
}

chrome.storage.sync.get(['showAccents'], (result) => {
  removeFurigana();
  markTextAccents();
})