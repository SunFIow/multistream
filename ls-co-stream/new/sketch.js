let interactOverlay = false;
let dblce = false;

function setup() {
  let h = window.overlay.getBoundingClientRect().height;
  window.overlay.style.height = h + "px";
  window.overlay.style.width= (h * 1.77777777778) + "px";

  $("#border").draggable();
  $("#overlay").draggable({
    snap : true,
    snapMode: "inner",
    snapTolerance: 5
 });
  $("#overlay").resizable({
    aspectRatio: true,
    handles: "n, e, s, w, ne, se, sw, nw"
  });

  let parent = "www.multistream.ml";
  // parent = "127.0.0.1";

  let mainType = getUrlParam('maintype', 'twitch');
  let overlayType = getUrlParam('overlaytype', 'twitch');

  let mainChannel = getUrlParam('main', 'riotgames');
  let overlayChannel = getUrlParam('overlay', 'imls');

  let mainFirst = getTY(mainType, "https://player.twitch.tv/?channel=", "https://www.youtube.com/embed/");
  let overlayFirst = getTY(overlayType, "https://player.twitch.tv/?channel=", "https://www.youtube.com/embed/");

  let mainLast = getTY(mainType, "&parent=" + parent, "");
  let overlayLast = getTY(overlayType, "&parent=" + parent, "");

  window.mainVideo.src = mainFirst + mainChannel + mainLast;
  window.overlayVideo.src = overlayFirst + overlayChannel + overlayLast;
}

function dblclickedEvent() {
  interactOverlay = true;
  dblce = true;
  window.dragger.style.zIndex = 2;
  window.overlayVideo.style.opacity = "100%";
}

function getTY(type, twitch, youtube) {
  return type == "twitch" ? twitch :
		 type == "youtube" ? youtube :
		 "";
}

function overEvent() {
  if (!interactOverlay){
    window.dragger.style.zIndex = 4;
    window.overlayVideo.style.opacity = "75%";
  }
}

function outEvent() {
  if(!dblce) {
    window.dragger.style.zIndex = 2;
    window.overlayVideo.style.opacity = "100%";
    interactOverlay = false;
  } else dblce = false;
}

function getUrlParam(parameter, defaultvalue) {
  let urlparameter = defaultvalue;
  if (window.location.href.indexOf(parameter) > -1) {
	   urlparameter = getUrlVars()[parameter];
  }
  return urlparameter;
}

function getUrlVars() {
  let vars = {};
  let parts = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function(m, key, value) {
	   vars[key] = value;
  });
  return vars;
}
