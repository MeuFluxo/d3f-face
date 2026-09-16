"use strict";

// Único fornecedor externo: o embed da VSL identificado na página de vendas.
// API: https://smartplayer.vturb.com/en/api/ e https://smartplayer.vturb.com/en/events/
const PLAYER = {
  id: "69f3aa5dc864fc4eeacc513f",
  script: "https://scripts.converteai.net/1be97c3f-f8ce-4815-bb89-6a73aac005ce/players/69f3aa5dc864fc4eeacc513f/v4/player.js"
};

const embeddedPlayer = document.getElementById(`vid-${PLAYER.id}`);
const playHelp = document.getElementById("play-help");
const restart = new URLSearchParams(location.search).get("action") === "restart";
const parentOrigin = location.protocol === "file:" ? "*" : location.origin;
const notifyParent = (state) => parent.postMessage({channel: "d3f-player", state}, parentOrigin);

async function startVideo() {
  try {
    if (restart) await embeddedPlayer.seek(0);
    await embeddedPlayer.play();
    playHelp.hidden = true;
  } catch {
    playHelp.hidden = false;
  }
}

embeddedPlayer.addEventListener("player:ready", () => {
  notifyParent("ready");
  startVideo();
}, {once: true});
embeddedPlayer.addEventListener("video:play", () => { playHelp.hidden = true; });
playHelp.addEventListener("click", startVideo);

const playerScript = document.createElement("script");
playerScript.src = PLAYER.script;
playerScript.async = true;
playerScript.addEventListener("error", () => notifyParent("error"), {once: true});
document.head.append(playerScript);
