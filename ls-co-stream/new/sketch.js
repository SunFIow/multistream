function setup() {
  $(".draggable").draggable();
  $(".resizable").resizable();

  let parent = "www.multistream.ml";
  
  let mainType = getUrlParam('maintype', 'twitch');
  let overlayType = getUrlParam('overlaytype', 'twitch');
  
  let mainChannel = getUrlParam('main', 'riotgames');
  let overlayChannel = getUrlParam('overlay', 'imls');
					 
  let mainFirst = getTY(mainType, "https://player.twitch.tv/?channel=", "https://www.youtube.com/embed/");
  let overlayFirst = getTY(overlayType, "https://player.twitch.tv/?channel=", "https://www.youtube.com/embed/");
  					 
  let mainLast = getTY(mainType, "&parent=" + parent, "");
  let overlayLast = getTY(overlayType, "&parent=" + parent, "");


  window.embed.src = mainFirst + mainChannel + mainLast;
  window.overlay.src = overlayFirst + overlayChannel + overlayLast;
}

function getTY(type, twitch, youtube) {
  return type == "twitch" ? twitch : 
		 type == "youtube" ? youtube :
		 "";
}

function onOver() {
  if (!keyIsDown(CONTROL)) window.dragover.style.zIndex = 1;
}

function onOut() {
  window.dragover.style.zIndex = -1;
}

function keyPressed() {
  window.dragover.style.zIndex = -1;
}

function getUrlParam(parameter, defaultvalue) {
  var urlparameter = defaultvalue;
  if (window.location.href.indexOf(parameter) > -1) {
	urlparameter = getUrlVars()[parameter];
  }
  return urlparameter;
}

function getUrlVars() {
  var vars = {};
  var parts = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function(m, key, value) {
	vars[key] = value;
  });
  return vars;
}
