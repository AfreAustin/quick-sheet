export default function parseTermInfo(dataType, dataArr) {
  let data = "";

  switch (dataType.toUpperCase()) {
    case 'HTML': data = parseHTML(dataArr); break;
    default: data = '<p>There was a problem loading this information. Please contact me to report this bug. <p>'
  }
  
  return data;
}

function cleanHTMLfromStr(str) {
  return str.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/\n/g,'<br><br>') ;
}

// Parse HTML -----------------------------------------------------------------------------------------

function parseHTML(term) {
  let parsedInfo = "";
  console.log(cleanHTMLfromStr(term.description))

  parsedInfo += '<h3>Syntax</h3><code>' + cleanHTMLfromStr(term.syntax) + '</code>'; 
  parsedInfo += '<h3>Attributes</h3><p>' + cleanHTMLfromStr(term.attributes) + '</p>'; 
  parsedInfo += '<h3>Description</h3><p>' + cleanHTMLfromStr(term.description) + '</p>'; 
  
  return parsedInfo
}

// ----------------------------------------------------------------------------------------------------