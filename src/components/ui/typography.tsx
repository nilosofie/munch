import React from "react";

type TypographyPropType = {
  children: React.ReactNode;
  variant?:
    | "h1"
    | "h2"
    | "h3"
    | "h4"
    | "p"
    | "blockquote"
    | "inline_code"
    | "lead"
    | "large"
    | "small"
    | "muted";
  className?: string;
};

function Typography({
  children,
  variant = "p",
  className = "",
}: TypographyPropType) {
  const styles = {
    p: (
      <p
        className={`font-montserrat leading-7 [&:not(:first-child)]:mt-6 ${className}`}
      >
        {children}
      </p>
    ),
    h1: (
      <h1
        className={`font-montserrat scroll-m-20 text-2xl sm:text-3xl font-extrabold tracking-tight lg:text-5xl text-wrap ${className}`}
      >
        {children}
      </h1>
    ),
    h2: (
      <h2
        className={`font-montserrat scroll-m-20 border-b pb-2 text-2xl font-semibold tracking-tight first:mt-0 ${className}`}
      >
        {children}
      </h2>
    ),
    h3: (
      <h3
        className={`font-montserrat scroll-m-20 text-2xl font-semibold tracking-tight ${className}`}
      >
        {children}
      </h3>
    ),
    h4: (
      <h4
        className={`font-poppins scroll-m-20 text-xl font-semibold tracking-tight ${className}`}
      >
        {children}
      </h4>
    ),
    blockquote: (
      <blockquote
        className={`font-montserrat mt-6 border-l-2 pl-6 italic ${className}`}
      >
        {children}
      </blockquote>
    ),
    inline_code: (
      <code
        className={`relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm font-semibold ${className}`}
      >
        {children}
      </code>
    ),
    lead: (
      <p className={`font-poppins text-xl text-muted-foreground ${className}`}>
        {children}
      </p>
    ),
    large: (
      <div className={`font-poppins text-lg font-semibold ${className}`}>
        {children}
      </div>
    ),
    small: (
      <small
        className={`font-poppins text-sm font-medium leading-none ${className}`}
      >
        {children}
      </small>
    ),
    muted: (
      <p className={`font-poppins text-sm text-muted-foreground ${className}`}>
        {children}
      </p>
    ),
  };
  return styles[variant];
}

export default Typography;
