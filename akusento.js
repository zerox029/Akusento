const containsJapanese = (text) => {
  const regex = /[\u3000-\u303F]|[\u3040-\u309F]|[\u30A0-\u30FF]|[\uFF00-\uFFEF]|[\u4E00-\u9FAF]|[\u2605-\u2606]|[\u2190-\u2195]|\u203B/g;
  return regex.test(text);
}

const removeFurigana = () => {
  var furigana = document.getElementsByTagName('rt');

  if(furigana.length === 0) return;

  while(furigana[0])
    furigana[0].remove();
}

const markTextAccents = (element) => {
  var p = document.getElementsByTagName('p');

  for(var i = 0; i < p.length; i++)
  {
    if(containsJapanese(p[i].textContent))
      console.log(p[i].textContent);
  }

  /*
  if(containsJapanese(element.textContent))
  {
    console.log("Found: ", element.textContent);
    //console.log(rma.tokenize(HanZenKaku.hs2fs(HanZenKaku.hw2fw(HanZenKaku.h2z(element.textContent)))));
  }*/
}

removeFurigana();
markTextAccents();