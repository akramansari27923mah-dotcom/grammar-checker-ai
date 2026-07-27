import { successShow } from "./toast";

export const shareOnLinkedin = async (text) => {
  const content = text;

  await navigator.clipboard.writeText(content);

  successShow("Content copied! Redirecting to LinkedIn...");

  setTimeout(() => {
    window.open(
      `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(window.location.origin)}`,
      "_blank",
    );
  }, 2000);
};

export const shareTwitter = (correctedText) => {
  window.open(
    `https://twitter.com/intent/tweet?text=${encodeURIComponent(correctedText)}`,
  );
};

export const shareOnWhatsapp = (correctedText) => {
  window.open(`https://wa.me/?text=${encodeURIComponent(correctedText)}`);
};