const calcFillScale = (targetWidth: number, targetHeight: number) => (i: HTMLImageElement): number => {
  const w = i.naturalWidth;
  const h = i.naturalHeight;
  if (targetWidth / targetHeight > w / h) {
    return targetWidth / w;
  }
  return targetHeight / h;
};
export default calcFillScale;
