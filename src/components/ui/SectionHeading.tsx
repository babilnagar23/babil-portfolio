interface SectionHeadingProps {
  title: string;
  subtitle?: string;
  centered?: boolean;
}

export default function SectionHeading({
  title,
  subtitle,
  centered = false,
}: SectionHeadingProps) {
  return (
    <div className={centered ? "text-center flex flex-col items-center" : "mb-12"}>
      <h2 className={`section-heading ${centered ? "" : ""}`}>{title}</h2>
      <div className={`section-heading-line ${centered ? "mx-auto" : ""}`} />
      {subtitle && (
        <p className={`section-subtitle ${centered ? "text-center" : ""}`}>
          {subtitle}
        </p>
      )}
    </div>
  );
}
