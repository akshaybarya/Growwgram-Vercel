export const identifyDevice = () => {
  const width = window.innerWidth;

  if (width <= 480) return "sm";
  else if (width <= 900) return "md";
  else return "xl";
};
