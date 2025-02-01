export const formatPhoneNumber = (value: string): string => {
  if (!value) return "";

  const cleaned = value.replace(/\D/g, "");

  const match = cleaned.match(/^(\d{1,2})(\d{1,3})(\d{1,2})(\d{1,2})$/);

  return match ? match.slice(1).filter(Boolean).join(" ") : value;
};

export const formatCode = (value: string): string => {
  if (!value) return "";

  const cleaned = value.replace(/\D/g, "");

  const match = cleaned.match(/^(\d{1,3})(\d{1,3})$/);

  return match ? match.slice(1).filter(Boolean).join(" ") : value;
};
