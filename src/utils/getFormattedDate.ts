export const getFormattedDate = () => {
  const date = new Date();
  const day = String(date.getDate()).padStart(2, "0");
  const monthName = date.toLocaleString("default", { month: "long" });
  const year = date.getFullYear();

  return `${day} ${monthName} ${year}`; // e.g. "09 July 2025"
};
