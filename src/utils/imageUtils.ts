import defaultPlatoImg from "@/assets/images/default-plato.png";

export const handleImgError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
  console.warn(`[WARN] Imagen no encontrada: ${e.currentTarget.src} → se usa imagen default.`);
  e.currentTarget.src = defaultPlatoImg;
};
