"use strict";

// Embed identificado na página de vendas fornecida pelo projeto.
// Só é carregado depois do clique. Não há pixels/analytics adicionais da página original.
// O próprio fornecedor do vídeo pode executar sua telemetria e recursos configurados.
const VIDEO = {
  embed: "player.html",
  sourceUrl: "https://meufluxo.com/pv/eduardo-claas-dieta-das-3-fases-2-0-vsl8-organico/"
};

// Data visual do cabeçalho: ontem, no calendário local, com horário sorteado.
function createPostDate(now = new Date(), minuteOfDay = Math.floor(Math.random() * 1440)) {
  if (!(now instanceof Date) || Number.isNaN(now.getTime())) throw new TypeError("Data inválida.");
  if (!Number.isInteger(minuteOfDay) || minuteOfDay < 0 || minuteOfDay >= 1440) {
    throw new RangeError("O horário deve estar entre 0 e 1439 minutos.");
  }
  const pad = (value) => String(value).padStart(2, "0");
  const key = (date) => `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}`;
  const yesterday = new Date(now);
  yesterday.setHours(12, 0, 0, 0);
  yesterday.setDate(yesterday.getDate() - 1);
  const time = `${pad(Math.floor(minuteOfDay / 60))}:${pad(minuteOfDay % 60)}`;
  const month = yesterday.toLocaleDateString("pt-BR", { month: "long" });
  return {
    dateKey: key(now),
    minuteOfDay,
    label: `${yesterday.getDate()} de ${month} às ${time}`,
    dateTime: `${key(yesterday)}T${time}`
  };
}

if (typeof module !== "undefined" && module.exports) module.exports = { createPostDate };

if (typeof document !== "undefined") {
(function () {
  let lastCalendarDay = "";
  function updatePostDate() {
    const now = new Date();
    let header = createPostDate(now);
    if (header.dateKey === lastCalendarDay) return;
    try {
      const storageKey = `d3f-post-time:${header.dateKey}`;
      const stored = sessionStorage.getItem(storageKey);
      const minutes = stored === null ? NaN : Number(stored);
      if (stored !== null && stored.trim() !== "" && Number.isInteger(minutes) && minutes >= 0 && minutes < 1440) {
        header = createPostDate(now, minutes);
      } else {
        sessionStorage.setItem(storageKey, String(header.minuteOfDay));
      }
    } catch {
      // A data funciona mesmo se o navegador bloquear o armazenamento da sessão.
    }
    const postDate = document.getElementById("post-date");
    postDate.textContent = header.label;
    postDate.dateTime = header.dateTime;
    lastCalendarDay = header.dateKey;
  }
  updatePostDate();
  window.setInterval(updatePostDate, 60000);
  document.addEventListener("visibilitychange", () => {
    if (!document.hidden) updatePostDate();
  });

  const mount = document.getElementById("video-mount");
  const playerStatus = document.getElementById("player-status");
  const resumeCard = mount.querySelector(".resume-card");
  const videoButtons = [...mount.querySelectorAll("[data-video-action]")];
  let loading = false;

  videoButtons.forEach((button) => {
    button.addEventListener("click", () => loadPlayer(button.dataset.videoAction));
  });

  function loadPlayer(action) {
    if (loading) return;
    loading = true;
    mount.setAttribute("aria-busy", "true");
    videoButtons.forEach((button) => { button.disabled = true; });
    playerStatus.textContent = "Carregando o vídeo…";
    playerStatus.hidden = false;

    const stage = document.createElement("div");
    stage.className = "embed-stage";
    const player = document.createElement("iframe");
    const embedUrl = new URL(VIDEO.embed, location.href);
    embedUrl.searchParams.set("action", action);
    player.src = embedUrl.href;
    player.title = "VSL da Dieta das 3 Fases — Eduardo Claas";
    player.allow = "autoplay; fullscreen; picture-in-picture";
    player.allowFullscreen = true;
    stage.append(player);
    mount.prepend(stage);

    const showFallback = () => {
      if (mount.classList.contains("is-playing")) return;
      mount.removeAttribute("aria-busy");
      const link = document.createElement("a");
      link.href = VIDEO.sourceUrl;
      link.target = "_blank";
      link.rel = "noopener noreferrer";
      link.textContent = "Abrir a VSL na página original";
      playerStatus.replaceChildren("Não foi possível carregar o player. ", link);
    };
    const timeout = window.setTimeout(showFallback, 30000);
    window.addEventListener("message", (event) => {
      if (event.source !== player.contentWindow || event.origin !== location.origin) return;
      if (!event.data || event.data.channel !== "d3f-player") return;
      if (event.data.state === "ready") {
        window.clearTimeout(timeout);
        mount.removeAttribute("aria-busy");
        mount.classList.add("is-playing");
        resumeCard.hidden = true;
        playerStatus.hidden = true;
      } else if (event.data.state === "error") {
        window.clearTimeout(timeout);
        showFallback();
      }
    });
  }

  document.addEventListener("click", (event) => {
    const like = event.target.closest("[data-like], [data-post-like]");
    if (like) {
      const pressed = like.getAttribute("aria-pressed") !== "true";
      like.setAttribute("aria-pressed", String(pressed));
      if (like.hasAttribute("data-like")) like.textContent = pressed ? "Curtido" : "Curtir";
      // Apenas estado local da interface: sem contagem inventada ou envio a terceiros.
    }
    const reply = event.target.closest("[data-reply]");
    if (reply) {
      document.getElementById("action-feedback").textContent = "As respostas não estão disponíveis nesta página.";
    }
  });

  document.querySelector("[data-go-comments]").addEventListener("click", () => {
    const title = document.getElementById("comments-title");
    title.scrollIntoView({ behavior: "smooth", block: "start" });
    title.focus({ preventScroll: true });
  });

  document.querySelector("[data-share]").addEventListener("click", async () => {
    const status = document.getElementById("action-feedback");
    if (location.protocol === "file:" || ["localhost", "127.0.0.1"].includes(location.hostname)) {
      status.textContent = "O compartilhamento por link fica disponível no endereço publicado.";
      return;
    }
    try {
      await navigator.clipboard.writeText(location.href);
      status.textContent = "Link copiado.";
    } catch {
      status.textContent = "Copie o endereço desta página para compartilhar.";
    }
  });

})();
}
