rma = new RakutenMA(model_ja);
rma.featset = RakutenMA.default_featset_ja;
rma.hash_func = RakutenMA.create_hash_func(15);

var tokens = rma.tokenize(HanZenKaku.hs2fs(HanZenKaku.hw2fw(HanZenKaku.h2z("これはペンです"))));
console.log(tokens);

/*
markTextAccents(document.body);
console.log("Dwes");

function markTextAccents(element) {
  if(element.hasChildNodes()) 
  {
    element.childNodes.forEach(markTextAccents);
  } 
  else if (element.nodeType === Text.TEXT_NODE) 
  {
    if(element.textContent.match(/replace/gi)) {
      const newElement = document.createElement('span');
      newElement.innerHTML = element.textContent.replace(/(replace)/gi, '<span class="heiban">$1</span>');
      
      element.replaceWith(newElement);
    }
  }
}*/