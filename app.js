/**
 * 東京 1泊2日 旅のしおり - アプリケーションロジック
 */
(function () {
  "use strict";

  const STORAGE_KEYS = {
    FONT_SIZE: "tokyo_trip_font_size_v1",
    CHECKLIST: "tokyo_trip_checklist_v1",
  };

  const CATEGORY_ICONS = {
    train: "🚅",
    subway: "🚇",
    bus: "🚌",
    walk: "🚶",
    food: "🍽️",
    sightseeing: "🗼",
    shopping: "🛍️",
  };

  function safeGetStorage(key, fallback) {
    try {
      const value = window.localStorage.getItem(key);
      return value !== null ? value : fallback;
    } catch (_) {
      return fallback;
    }
  }

  function safeSetStorage(key, value) {
    try {
      window.localStorage.setItem(key, value);
    } catch (_) {
      // プライベートブラウズ等で保存できない場合は無視
    }
  }

  function buildGoogleMapsUrl(query) {
    return (
      "https://www.google.com/maps/search/?api=1&query=" +
      encodeURIComponent(query)
    );
  }

  function escapeHtml(str) {
    return String(str)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#39;");
  }

  /* ------------------------------------------------------------------------
     ヘッダー基本情報の反映
     ------------------------------------------------------------------------ */
  function renderHeader() {
    const titleEl = document.getElementById("trip-title");
    const datesEl = document.getElementById("trip-dates");
    if (titleEl) titleEl.textContent = TRIP_DATA.meta.title;
    if (datesEl) datesEl.textContent = TRIP_DATA.meta.dates;
    document.title = TRIP_DATA.meta.title;
  }

  /* ------------------------------------------------------------------------
     文字サイズ切り替え（標準 / 大きめ）
     ------------------------------------------------------------------------ */
  function applyFontSize(size) {
    const normalized = size === "large" ? "large" : "normal";
    document.documentElement.setAttribute("data-font-size", normalized);

    const normalBtn = document.getElementById("font-size-normal");
    const largeBtn = document.getElementById("font-size-large");
    if (normalBtn) {
      normalBtn.setAttribute("aria-pressed", String(normalized === "normal"));
    }
    if (largeBtn) {
      largeBtn.setAttribute("aria-pressed", String(normalized === "large"));
    }
    safeSetStorage(STORAGE_KEYS.FONT_SIZE, normalized);
  }

  function initFontSizeControl() {
    const saved = safeGetStorage(STORAGE_KEYS.FONT_SIZE, "normal");
    applyFontSize(saved);

    document.querySelectorAll(".font-size-btn").forEach((btn) => {
      btn.addEventListener("click", () => {
        applyFontSize(btn.dataset.size);
      });
    });
  }

  /* ------------------------------------------------------------------------
     タイムライン内画像の描画（単一 image / 複数 images 両対応）
     ------------------------------------------------------------------------ */
  function renderMediaHtml(item) {
    const list = [];
    if (Array.isArray(item.images)) {
      item.images.forEach((img) => {
        if (typeof img === "string" && img.trim()) {
          list.push({ src: img.trim(), caption: "" });
        } else if (img && img.src) {
          list.push({ src: img.src, caption: img.caption || "" });
        }
      });
    } else if (item.image && String(item.image).trim()) {
      list.push({
        src: String(item.image).trim(),
        caption: item.imageCaption || "",
      });
    }

    if (list.length === 0) return "";

    const figures = list
      .map((img) => {
        const altText = img.caption || item.title;
        const captionHtml = img.caption
          ? `<figcaption class="card-image-caption">${escapeHtml(img.caption)}</figcaption>`
          : "";
        return `
          <figure class="card-media">
            <button
              type="button"
              class="card-image-trigger"
              data-src="${escapeHtml(img.src)}"
              data-caption="${escapeHtml(altText)}"
              aria-label="画像を拡大表示：${escapeHtml(altText)}"
            >
              <img
                class="card-image"
                src="${escapeHtml(img.src)}"
                alt="${escapeHtml(altText)}"
                loading="lazy"
                onerror="this.closest('.card-media').style.display='none'"
              >
            </button>
            ${captionHtml}
          </figure>
        `;
      })
      .join("");

    return `<div class="card-media-list${list.length > 1 ? " is-multi" : ""}">${figures}</div>`;
  }

  /* ------------------------------------------------------------------------
     タイムライン描画（1日目 / 2日目）
     ------------------------------------------------------------------------ */
  function renderDayPanel(panelId, dayData) {
    const panel = document.getElementById(panelId);
    if (!panel || !dayData) return;

    const itemsHtml = dayData.items
      .map((item) => {
        const category = item.category || "walk";
        const icon = CATEGORY_ICONS[category] || "📍";
        const mediaHtml = renderMediaHtml(item);
        const memoHtml = item.memo
          ? `<div class="card-memo">
               <span class="card-memo-label">ワンポイント：</span>${escapeHtml(item.memo)}
             </div>`
          : "";
        const mapBtnHtml = item.mapQuery
          ? `<div class="card-actions">
               <a
                 class="map-link-btn"
                 href="${buildGoogleMapsUrl(item.mapQuery)}"
                 target="_blank"
                 rel="noopener noreferrer"
               >
                 <span aria-hidden="true">📍</span>
                 <span>Googleマップで開く（${escapeHtml(item.mapQuery)}）</span>
               </a>
             </div>`
          : "";

        return `
          <li class="timeline-item" data-category="${escapeHtml(category)}">
            <span class="timeline-dot" aria-hidden="true"></span>
            <article class="timeline-card">
              <div class="card-meta">
                <time class="card-time">${escapeHtml(item.time)}</time>
                <span class="card-badge badge-${escapeHtml(category)}">
                  <span aria-hidden="true">${icon}</span>
                  <span>${escapeHtml(item.transport)}</span>
                </span>
              </div>
              <h3 class="card-title">${escapeHtml(item.title)}</h3>
              <p class="card-detail">${escapeHtml(item.detail)}</p>
              ${mediaHtml}
              ${memoHtml}
              ${mapBtnHtml}
            </article>
          </li>
        `;
      })
      .join("");

    panel.innerHTML = `
      <div class="day-banner">
        <p class="day-banner-date">${escapeHtml(dayData.dateLabel)}</p>
        <h2 class="day-banner-theme">${escapeHtml(dayData.theme)}</h2>
      </div>
      <ol class="timeline">
        ${itemsHtml}
      </ol>
    `;
  }

  /* ------------------------------------------------------------------------
     メモ・持ち物チェックリスト描画＆永続化
     ------------------------------------------------------------------------ */
  function loadChecklistState() {
    const raw = safeGetStorage(STORAGE_KEYS.CHECKLIST, "{}");
    try {
      const parsed = JSON.parse(raw);
      return parsed && typeof parsed === "object" ? parsed : {};
    } catch (_) {
      return {};
    }
  }

  function saveChecklistState(state) {
    safeSetStorage(STORAGE_KEYS.CHECKLIST, JSON.stringify(state));
  }

  function updateChecklistProgress(state) {
    const total = TRIP_DATA.checklist.length;
    const checkedCount = TRIP_DATA.checklist.filter(
      (item) => Boolean(state[item.id])
    ).length;
    const progressEl = document.getElementById("checklist-progress");
    if (progressEl) {
      progressEl.textContent = `${checkedCount} / ${total} 完了`;
    }
  }

  function renderMemoPanel() {
    const panel = document.getElementById("panel-memo");
    if (!panel) return;

    const state = loadChecklistState();

    const checklistHtml = TRIP_DATA.checklist
      .map((item) => {
        const isChecked = Boolean(state[item.id]);
        return `
          <li class="checklist-item${isChecked ? " is-checked" : ""}" data-item-id="${escapeHtml(item.id)}">
            <label class="checklist-label">
              <input
                type="checkbox"
                class="checklist-checkbox"
                data-item-id="${escapeHtml(item.id)}"
                ${isChecked ? "checked" : ""}
              >
              <span class="checklist-text">${escapeHtml(item.label)}</span>
            </label>
          </li>
        `;
      })
      .join("");

    const tipsHtml = TRIP_DATA.travelTips
      .map(
        (tip) => `
          <li class="tip-card">
            <h3 class="tip-title">${escapeHtml(tip.title)}</h3>
            <p class="tip-body">${escapeHtml(tip.body)}</p>
          </li>
        `
      )
      .join("");

    panel.innerHTML = `
      <section class="memo-section" aria-labelledby="checklist-heading">
        <div class="section-header">
          <h2 class="section-title" id="checklist-heading">持ち物チェックリスト</h2>
          <span class="checklist-progress" id="checklist-progress"></span>
        </div>
        <ul class="checklist" id="checklist-list">
          ${checklistHtml}
        </ul>
        <div class="checklist-footer">
          <button type="button" class="reset-btn" id="checklist-reset-btn">
            チェックをすべて外す
          </button>
        </div>
      </section>

      <section class="memo-section" aria-labelledby="tips-heading">
        <div class="section-header">
          <h2 class="section-title" id="tips-heading">旅のワンポイントメモ</h2>
        </div>
        <ul class="tips-list">
          ${tipsHtml}
        </ul>
      </section>
    `;

    updateChecklistProgress(state);

    const listEl = document.getElementById("checklist-list");
    if (listEl) {
      listEl.addEventListener("change", (event) => {
        const checkbox = event.target;
        if (!checkbox.classList.contains("checklist-checkbox")) return;

        const id = checkbox.dataset.itemId;
        const currentState = loadChecklistState();
        currentState[id] = checkbox.checked;
        saveChecklistState(currentState);

        const row = checkbox.closest(".checklist-item");
        if (row) {
          row.classList.toggle("is-checked", checkbox.checked);
        }
        updateChecklistProgress(currentState);
      });
    }

    const resetBtn = document.getElementById("checklist-reset-btn");
    if (resetBtn) {
      resetBtn.addEventListener("click", () => {
        const emptyState = {};
        saveChecklistState(emptyState);
        panel.querySelectorAll(".checklist-checkbox").forEach((cb) => {
          cb.checked = false;
          const row = cb.closest(".checklist-item");
          if (row) row.classList.remove("is-checked");
        });
        updateChecklistProgress(emptyState);
      });
    }
  }

  /* ------------------------------------------------------------------------
     タブ切り替え
     ------------------------------------------------------------------------ */
  function initTabs() {
    const tabButtons = document.querySelectorAll(".tab-btn");
    const panels = document.querySelectorAll(".tab-panel");

    tabButtons.forEach((btn) => {
      btn.addEventListener("click", () => {
        const targetKey = btn.dataset.tab;
        const targetPanelId = "panel-" + targetKey;

        tabButtons.forEach((b) => {
          const isSelected = b === btn;
          b.classList.toggle("is-active", isSelected);
          b.setAttribute("aria-selected", String(isSelected));
        });

        panels.forEach((panel) => {
          const isMatch = panel.id === targetPanelId;
          panel.classList.toggle("is-active", isMatch);
          panel.hidden = !isMatch;
        });

        window.scrollTo({ top: 0, behavior: "smooth" });
      });
    });
  }

  /* ------------------------------------------------------------------------
     ページ先頭へ戻るボタン
     ------------------------------------------------------------------------ */
  function initScrollTop() {
    const btn = document.getElementById("scroll-top-btn");
    if (!btn) return;
    btn.addEventListener("click", () => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }

  /* ------------------------------------------------------------------------
     画像のタップ拡大表示（ライトボックス）
     ------------------------------------------------------------------------ */
  function initLightbox() {
    const overlay = document.createElement("div");
    overlay.className = "lightbox";
    overlay.setAttribute("role", "dialog");
    overlay.setAttribute("aria-modal", "true");
    overlay.hidden = true;
    overlay.innerHTML = `
      <div class="lightbox-inner">
        <button type="button" class="lightbox-close" aria-label="閉じる">✕ 閉じる</button>
        <img class="lightbox-img" src="" alt="">
        <p class="lightbox-caption"></p>
      </div>
    `;
    document.body.appendChild(overlay);

    const imgEl = overlay.querySelector(".lightbox-img");
    const captionEl = overlay.querySelector(".lightbox-caption");
    const closeBtn = overlay.querySelector(".lightbox-close");

    function closeLightbox() {
      overlay.hidden = true;
      imgEl.src = "";
    }

    document.addEventListener("click", (event) => {
      const trigger = event.target.closest(".card-image-trigger");
      if (!trigger) return;
      imgEl.src = trigger.dataset.src;
      imgEl.alt = trigger.dataset.caption || "";
      captionEl.textContent = trigger.dataset.caption || "";
      overlay.hidden = false;
    });

    closeBtn.addEventListener("click", closeLightbox);
    overlay.addEventListener("click", (event) => {
      if (event.target === overlay) closeLightbox();
    });
    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape" && !overlay.hidden) closeLightbox();
    });
  }

  /* ------------------------------------------------------------------------
     初期化
     ------------------------------------------------------------------------ */
  document.addEventListener("DOMContentLoaded", () => {
    renderHeader();
    renderDayPanel("panel-day1", TRIP_DATA.days.day1);
    renderDayPanel("panel-day2", TRIP_DATA.days.day2);
    renderMemoPanel();
    initFontSizeControl();
    initTabs();
    initScrollTop();
    initLightbox();
  });
})();
