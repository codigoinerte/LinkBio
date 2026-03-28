const SOCIAL_PLATFORMS = [
  {
    key: "youtube",
    name: "YouTube",
    icon: "Youtube",
    regex: /^(https?:\/\/)?(www\.)?(youtube\.com|youtu\.be)\//i,
  },
  {
    key: "facebook",
    name: "Facebook",
    icon: "Facebook",
    regex: /^(https?:\/\/)?(www\.)?facebook\.com\//i,
  },
  {
    key: "instagram",
    name: "Instagram",
    icon: "Instagram",
    regex: /^(https?:\/\/)?(www\.)?instagram\.com\//i,
  },
  {
    key: "twitter",
    name: "Twitter / X",
    icon: "Twitter",
    regex: /^(https?:\/\/)?(www\.)?(twitter\.com|x\.com)\//i,
  },
  {
    key: "linkedin",
    name: "LinkedIn",
    icon: "Linkedin",
    regex: /^(https?:\/\/)?(www\.)?linkedin\.com\//i,
  },
  {
    key: "github",
    name: "GitHub",
    icon: "Github",
    regex: /^(https?:\/\/)?(www\.)?github\.com\//i,
  },
  {
    key: "tiktok",
    name: "TikTok",
    icon: "Tiktok",
    regex: /^(https?:\/\/)?(www\.)?tiktok\.com\//i,
  },
  {
    key: "twitch",
    name: "Twitch",
    icon: "Twitch",
    regex: /^(https?:\/\/)?(www\.)?twitch\.tv\//i,
  },
  {
    key: "spotify",
    name: "Spotify",
    icon: "Spotify",
    regex: /^(https?:\/\/)?(open\.)?spotify\.com\//i,
  },
];

export const detectSocialPlatform = (url:string) => {
  if (!url || typeof url !== "string") {
    return { valid: false };
  }

  const normalizedUrl = url.trim();

  for (const platform of SOCIAL_PLATFORMS) {
    if (platform.regex.test(normalizedUrl)) {
      return {
        valid: true,
        key: platform.key,
        name: platform.name,
        icon: platform.icon,
      };
    }
  }

  try {
    new URL(normalizedUrl.startsWith("http") ? normalizedUrl : `https://${normalizedUrl}`);

    return {
      valid: true,
      key: "website",
      name: "Sitio Web",
      icon: "Globe",
    };
  } catch {
    return { valid: false };
  }
}
