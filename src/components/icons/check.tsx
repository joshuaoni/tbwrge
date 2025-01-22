function CheckIcon(props: { color?: string }) {
  const { color = "#009379" } = props;

  return (
    <svg
      width={14}
      height={10}
      viewBox="0 0 14 10"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M12.218 1.29l-7.32 7.32-3.66-3.66"
        stroke={color}
        strokeWidth={1.67333}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default CheckIcon;
