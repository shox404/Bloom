export const formatPhoneNumber = (value: string) => {
  const cleaned = value.replace(/\D/g, "");
  const match = cleaned.match(/^(\d{0,2})(\d{0,3})(\d{0,2})(\d{0,2})$/);

  if (!match) return value;

  return [match[1], match[2], match[3], match[4]].filter(Boolean).join(" ");
};

export const formatCode = (value: string) => {
  const cleaned = value.replace(/\D/g, "");
  const match = cleaned.match(/^(\d{0,3})(\d{0,3})$/);

  if (!match) return value;

  return [match[1], match[2]].filter(Boolean).join(" ");
};
