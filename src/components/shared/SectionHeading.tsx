import { ReactNode } from "react";

interface SectionHeadingProps {
  eyebrow: string;
  title: ReactNode;
  description?: ReactNode;
  align?: "left" | "center";
}

export default function SectionHeading({ eyebrow, title, description, align = "left" }: SectionHeadingProps) {
  const centered = align === "center";
  return (
    <div className={centered ? "mx-auto max-w-2xl text-center" : "max-w-2xl"}>
      <div className={`flex items-center gap-4 ${centered ? "justify-center" : ""}`}>
        <span className="hairline" />
        <p className="eyebrow">{eyebrow}</p>
        {centered && <span className="hairline" />}
      </div>
      <h2 className="mt-6 text-4xl leading-[1.1] md:text-5xl">{title}</h2>
      {description && <p className="mt-5 leading-relaxed text-sand-muted">{description}</p>}
    </div>
  );
}
