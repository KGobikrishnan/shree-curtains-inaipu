// Utility to generate and download standard vCard .vcf file
export const downloadVcfContact = (profile, quickActions) => {
  const vcfContent = [
    "BEGIN:VCARD",
    "VERSION:3.0",
    `FN:${profile.name}`,
    `N:${profile.name};;;;`,
    `ORG:${profile.company};`,
    `TITLE:${profile.title}`,
    `TEL;TYPE=CELL,VOICE:${quickActions.phone}`,
    quickActions.phoneSecondary ? `TEL;TYPE=WORK,VOICE:${quickActions.phoneSecondary}` : "",
    `EMAIL;TYPE=WORK,INTERNET:${quickActions.email}`,
    `URL:${quickActions.website}`,
    `NOTE:${profile.tagline} - ${profile.subTagline}`,
    "END:VCARD",
  ]
    .filter(Boolean)
    .join("\r\n");

  const blob = new Blob([vcfContent], { type: "text/vcard;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.setAttribute("download", `${profile.name.replace(/\s+/g, "_")}.vcf`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
};

// Utility to share or copy link
export const shareCard = async (title, text, url) => {
  if (navigator.share) {
    try {
      await navigator.share({
        title,
        text,
        url: url || window.location.href,
      });
      return { success: true, method: "share" };
    } catch (err) {
      if (err.name !== "AbortError") {
        console.warn("Share failed:", err);
      }
    }
  }
  
  // Fallback to clipboard
  try {
    await navigator.clipboard.writeText(url || window.location.href);
    return { success: true, method: "clipboard" };
  } catch (err) {
    console.error("Clipboard copy failed:", err);
    return { success: false };
  }
};
