
export interface ImageRequirement {
  width: number;
  height: number;
  aspectRatio: string;
  maxFileSize: number; // in MB
  formats: string[];
  description: string;
}

export const IMAGE_REQUIREMENTS: Record<string, ImageRequirement> = {
  hero_background: {
    width: 1920,
    height: 1080,
    aspectRatio: "16:9",
    maxFileSize: 5,
    formats: ["JPG", "JPEG", "WebP"],
    description: "Hero-Hintergrundbild (Landschaft-Format für beste Darstellung)"
  },
  profile: {
    width: 800,
    height: 1000,
    aspectRatio: "4:5",
    maxFileSize: 2,
    formats: ["JPG", "JPEG", "PNG", "WebP"],
    description: "Profilbild (Hochformat für professionelle Darstellung)"
  },
  quote_image: {
    width: 512,
    height: 512,
    aspectRatio: "1:1",
    maxFileSize: 1,
    formats: ["JPG", "JPEG", "PNG", "WebP"],
    description: "Zitat-Bild (Quadratisches Format)"
  },
  section_image: {
    width: 800,
    height: 600,
    aspectRatio: "4:3",
    maxFileSize: 3,
    formats: ["JPG", "JPEG", "PNG", "WebP"],
    description: "Bereich-Bild (Standard-Format für Inhaltsbereich)"
  },
  general: {
    width: 1200,
    height: 800,
    aspectRatio: "3:2",
    maxFileSize: 5,
    formats: ["JPG", "JPEG", "PNG", "WebP"],
    description: "Allgemeine Bilder"
  }
};

export const getImageRequirement = (imageType?: string): ImageRequirement => {
  return IMAGE_REQUIREMENTS[imageType || 'general'] || IMAGE_REQUIREMENTS.general;
};
