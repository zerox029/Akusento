const containsJapanese = (text) => {
  const regex = /[\u3000-\u303F]|[\u3040-\u309F]|[\u30A0-\u30FF]|[\uFF00-\uFFEF]|[\u4E00-\u9FAF]|[\u2605-\u2606]|[\u2190-\u2195]|\u203B/g;
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
  
  for(p in paragraphs)
  {
    let tokens = tokenize(p.textContent);
  
    let newHtml = ''
    for(var i = 0; i < tokens.length; i++)
    {
      //If the token is a noun
      if(tokens[i][1].startsWith('N'))
        newHtml += tagWordAccent(tokens[i][0]);
      else
        newHtml += tokens[i][0];
    }
  
    p.innerHTML = newHtml
  }
}

removeFurigana();
markTextAccents();