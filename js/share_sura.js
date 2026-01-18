const shareBox = document.querySelector(".share-box");
const shareBtn = document.querySelector(".share-main");

const suraTitle = document
  .querySelector(".sura-title")
  .innerText.replace(/\u00A0/g, " ")
  .trim();

const ayahText = document
  .querySelector(".ayah")
  .innerText.replace(/\u00A0/g, " ")
  .trim();

const pageUrl = window.location.href.trim();

const MAX_LENGTH = 600;

function cleanText(text) {
  return text
    .replace(/\u00A0/g, " ")
    .replace(/\u200E|\u200F/g, "")
    .replace(/\s+\n/g, "\n")
    .trim();
}

let shareText = "";

if (ayahText.length <= MAX_LENGTH) {
  shareText = cleanText(suraTitle + "\n\n" + ayahText + "\n\nصدق الله العظيم");
} else {
  shareText = cleanText(
    suraTitle +
      "\n\nاقرأ السورة كاملة من هنا:\n" +
      pageUrl +
      "\n\nصدق الله العظيم"
  );
}

shareBtn.addEventListener("click", () => {
  shareBox.classList.toggle("active");
});

document.getElementById("shareWhatsapp").addEventListener("click", () => {
  window.open("https://wa.me/?text=" + encodeURIComponent(shareText), "_blank");
});

document.getElementById("shareFacebook").addEventListener("click", () => {
  window.open(
    "https://www.facebook.com/sharer/sharer.php?u=" +
      encodeURIComponent(pageUrl) +
      "&quote=" +
      encodeURIComponent(suraTitle),
    "_blank"
  );
});

document.getElementById("shareTelegram").addEventListener("click", () => {
  window.open(
    "https://t.me/share/url?url=" +
      encodeURIComponent(pageUrl) +
      "&text=" +
      encodeURIComponent(suraTitle),
    "_blank"
  );
});
