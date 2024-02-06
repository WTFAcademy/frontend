const truncation = (
  value: string = "",
  prefix = 6,
  suffix = 4,
  flag = "***",
) => {
  const preValue = value.slice(0, prefix);
  const sufValue = value.slice(value.length - suffix, value.length);
  return `${preValue}${flag}${sufValue}`;
};
export default truncation;
