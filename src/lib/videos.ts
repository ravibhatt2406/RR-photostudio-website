export interface VideoItem {
  id: string;
  src: string;
  filename: string;
  title: string;
  categoryLabel: string;
  subtitle: string;
}

// Eager glob import of all supported video files under src/assets/portfolio/videos
const videoModules = import.meta.glob(
  "/src/assets/portfolio/videos/*.{mp4,webm,mov,MP4,WEBM,MOV}",
  { eager: true }
);

/**
 * Generates a clean, readable display title from a video file name.
 */
export const formatVideoTitle = (filename: string): string => {
  if (!filename) return "Cinematic Film";
  let nameWithoutExt = filename.replace(/\.[^/.]+$/, "");
  
  // Replace underscores and excess hyphens with spaces
  let cleaned = nameWithoutExt.replace(/_+/g, " ").replace(/-+/g, " ").trim();
  
  // Replace common patterns
  cleaned = cleaned.replace(/\s+/g, " ");
  
  // Capitalize title
  return cleaned
    .split(" ")
    .map((w) => {
      if (w.toUpperCase() === "PRE" || w.toUpperCase() === "PREWEDDING" || w.toUpperCase() === "PREWED") return "Pre-Wedding";
      if (w === "&" || w.toLowerCase() === "and") return "&";
      return w.charAt(0).toUpperCase() + w.slice(1).toLowerCase();
    })
    .join(" ");
};

const DEFAULT_SUBTITLES = [
  "City Palace & Lake Pichola — Udaipur",
  "Fateh Garh Heritage Palace — Udaipur",
  "Jagmandir Island Palace — Udaipur",
  "The Leela Palace Destination Wedding",
  "The Oberoi Udaivilas Grounds",
  "Chittorgarh Royal Heritage",
  "Royal Sunset Serenade — Rajasthan",
];

const CURATED_METADATA: Record<string, { title: string; subtitle: string }> = {
  "Aakash___Richa_Pre_Wedding.mp4": {
    title: "Aakash & Richa",
    subtitle: "Pre-Wedding Cinematic Film — Udaipur",
  },
  "Aiswary___Bhavya_Engagement_Highlight.mp4": {
    title: "Aishwarya & Bhavya",
    subtitle: "Engagement Highlight Reel",
  },
  "Ankur___Riya_Pre_Wedding_Film.mp4": {
    title: "Ankur & Riya",
    subtitle: "Pre-Wedding Memories — Lake Pichola",
  },
  "BHARAT___PREETI_PRE_WEDDING.mp4": {
    title: "Bharat & Preeti",
    subtitle: "Royal Pre-Wedding Film",
  },
  "Deepak___Abhilasha_Wedding_Film.mp4": {
    title: "Deepak & Abhilasha",
    subtitle: "Grand Wedding Highlights — Udaipur",
  },
  "Gunjan___Avantika_Full_Pre_wedding.mp4": {
    title: "Gunjan & Avantika",
    subtitle: "Full Pre-Wedding Feature Film",
  },
  "Harshul___Nikita_Highlight.mp4": {
    title: "Harshul & Nikita",
    subtitle: "Cinematic Wedding Highlights",
  },
  "Mohit___Vaishali_BEST_PRE_WEDDING_FILM_2021___PICTURE_TOWN___GREY_WHITE_STUDIOS__1080pFHR.mp4": {
    title: "Mohit & Vaishali",
    subtitle: "Cinematic Pre-Wedding Celebration",
  },
  "Rajat___Shivani_Goa_Wedding_Teaser.mp4": {
    title: "Rajat & Shivani",
    subtitle: "Goa Destination Wedding Teaser",
  },
  "Tanmay_Varsha_Prewed_01.mp4": {
    title: "Tanmay & Varsha",
    subtitle: "Lakeside Pre-Wedding Teaser",
  },
  "Wedding_Highlight.mp4": {
    title: "A Royal Promise",
    subtitle: "Cinematic Wedding Film",
  },
  "highlight.mp4": {
    title: "Symphony of Hearts",
    subtitle: "Wedding Ceremony Highlights",
  },
  "highlight__2_.mp4": {
    title: "Eternal Vows",
    subtitle: "Grand Heritage Celebration",
  },
  "reel_3.mp4": {
    title: "Unscripted Emotions",
    subtitle: "Cinematic Instagram Reel",
  },
  "teaser.mp4": {
    title: "Forever & Always",
    subtitle: "Cinematic Teaser Film",
  },
};

export const loadVideoData = (): VideoItem[] => {
  const items: VideoItem[] = [];

  Object.entries(videoModules).forEach(([pathStr, mod]: [string, any]) => {
    const src = mod?.default || mod;
    if (!src || typeof src !== "string") return;

    const filename = pathStr.split("/").pop() || "";
    const meta = CURATED_METADATA[filename];

    const title = meta ? meta.title : formatVideoTitle(filename);
    const subtitle = meta
      ? meta.subtitle
      : DEFAULT_SUBTITLES[items.length % DEFAULT_SUBTITLES.length];

    items.push({
      id: filename,
      src,
      filename,
      title,
      categoryLabel: "Cinematic Film",
      subtitle,
    });
  });

  return items;
};

export const videoList: VideoItem[] = loadVideoData();
