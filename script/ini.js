"use strict"; // Use ECMAScript 5 strict mode in browsers that support it

$(document).ready(function() {
   $("#fileinput").change(calculate);
});

function calculate(evt) {

  var f;
  
  if (evt.type != 'drop') // Evento Input Target
    f = evt.target.files[0];
  else { // Evento Drag & Drop
    evt.stopPropagation();
    evt.preventDefault();
    f = evt.dataTransfer.files[0];
  }
  
  if (f) {
    var r = new FileReader();
    r.onload = function(e) { 
      var contents = e.target.result;
      
      var tokens = lexer(contents);
      var pretty = tokensToString(tokens);
      
      out.className = 'unhidden';
      initialinput.innerHTML = contents;
      finaloutput.innerHTML = pretty;
      
      /* Local Storage */
      if (window.localStorage) {
	localStorage.fileinput = f;
	localStorage.initialinput = contents;
	localStorage.finaloutput = pretty;
      }
    }
    r.readAsText(f);
  } else { 
    alert("Failed to load file");
  }
  

}

function tokensToString(tokens) {
   var r = '';
   for(var i=0; i < tokens.length; i++) {
     var t = tokens[i]
     var s = JSON.stringify(t, undefined, 2);
     s = _.template(template.innerHTML, {token: t, match: s});
     r += s;
   }
   return '<ol>\n'+r+'\n</ol>';
}

function lexer(input) {
  var blanks         = /^\s+/;
  var iniheader      = /^\[([^\]\r\n]+)\]/;
  var comments       = /^[;#](.*)/;
  var nameEqualValue = /^([^=;\r\n]+)=((?:\/\s*\n|[^;\r\n])*)/;
  var any            = /^(.|\n)+/;

  var out = [];
  var m = null;

  while (input != '') {
    if (m = blanks.exec(input)) {
      input = input.substr(m.index+m[0].length);
      out.push({ type : 'blanks', match: m });
    }
    else if (m = iniheader.exec(input)) {
      input = input.substr(m.index+m[0].length);
      out.push({ type: 'header', match: m });
    }
    else if (m = comments.exec(input)) {
      input = input.substr(m.index+m[0].length);
      out.push({ type: 'comments', match: m });
    }
    else if (m = nameEqualValue.exec(input)) {
      /* while (match casa con /\\$/) concatena la siguiente lÃ­nea */
      input = input.substr(m.index+m[0].length);
      out.push({ type: 'nameEqualValue', match: m });
    }
    else if (m = any.exec(input)) {
      out.push({ type: 'error', match: m });
      input = '';
    }
    else {
      alert("Fatal Error!"+substr(input,0,20));
      input = '';
    }
  }
  return out;
}

window.onload = function() {
  
  /* Se comprueba si el navegador soporta localStorage y algún dato almacenado */
  if (window.localStorage && localStorage.fileinput && localStorage.initialinput && localStorage.finaloutput) {
    document.getElementById("out").className = "unhidden";
    document.getElementById("fileinput").innerHTML = localStorage.fileinput;
    document.getElementById("initialinput").innerHTML = localStorage.initialinput;
    document.getElementById("finaloutput").innerHTML = localStorage.finaloutput;
  }
};

