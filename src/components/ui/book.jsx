import React from "react";
import { useResponsive } from "./use-responsive";
import clsx from "clsx";

const DefaultIllustration = (
  <svg fill="none" height="56" viewBox="0 0 36 56" width="36" xmlns="http://www.w3.org/2000/swap">
    <path
      clipRule="evenodd"
      d="M3.03113 28.0005C6.26017 23.1765 11.7592 20.0005 18 20.0005C24.2409 20.0005 29.7399 23.1765 32.9689 28.0005C29.7399 32.8244 24.2409 36.0005 18 36.0005C11.7592 36.0005 6.26017 32.8244 3.03113 28.0005Z"
      fill="#dcbe3c"
      fillRule="evenodd"
    />
    <path
      clipRule="evenodd"
      d="M32.9691 28.0012C34.8835 25.1411 36 21.7017 36 18.0015C36 8.06034 27.9411 0.00146484 18 0.00146484C8.05887 0.00146484 0 8.06034 0 18.0015C0 21.7017 1.11648 25.1411 3.03094 28.0012C6.25996 23.1771 11.7591 20.001 18 20.001C24.2409 20.001 29.74 23.1771 32.9691 28.0012Z"
      fill="#121212"
      fillRule="evenodd"
    />
  </svg>
);

export const Book = ({
  title,
  variant = "stripe",
  width = 196,
  color,
  textColor = "var(--ds-gray-1000)",
  illustration,
  textured = true,
  coverImage // New prop for custom cover
}) => {
  const _width = useResponsive(width);
  const _color = color ? color : variant === "simple" ? "var(--ds-background-200)" : "var(--ds-amber-600)";
  const _illustration = illustration ? illustration : DefaultIllustration;

  return (
    <div className="inline-block w-fit" style={{ perspective: 900 }}>
      <div
        className="aspect-[49/60] w-fit relative rotate-0 duration-[250ms] book-rotate"
        style={{ transformStyle: "preserve-3d", minWidth: _width, containerType: "inline-size" }}
      >
        <div
          className="flex flex-col h-full rounded-l-md rounded-r overflow-hidden bg-background-200 shadow-book translate-x-0 relative after:absolute after:border after:border-gray-alpha-400 after:w-full after:h-full after:shadow-book-border after:rounded-l-md after:rounded-r"
          style={{ width: _width }}
        >
          {/* Cover Section */}
          <div
            className={clsx(
              "w-full relative overflow-hidden",
              variant === "stripe" && "flex-1"
            )}
            style={{ background: coverImage ? 'transparent' : _color }}
          >
            {coverImage ? (
              <img src={coverImage} alt={title} className="absolute inset-0 w-full h-full object-cover" />
            ) : (
              variant === "stripe" && (
                <div className="absolute h-full w-full flex items-center justify-center opacity-20">
                  {_illustration}
                </div>
              )
            )}
            <div className="absolute h-full w-[8.2%] mix-blend-overlay" style={{ background: "var(--ds-book-bind)" }} />
          </div>

          {/* Title Section (only if not cover image) */}
          {!coverImage && (
            <div
              className={clsx(
                "relative flex-1",
                (variant === "stripe" || (variant === "simple" && color === undefined)) && "bg-book-gradient"
              )}
              style={{ background: variant === "simple" && color !== undefined ? _color : undefined }}
            >
              <div className="absolute h-full w-[8.2%] opacity-20" style={{ background: "var(--ds-book-bind)" }} />
              <div
                className={clsx(
                  "flex flex-col w-full p-[6.1%] pl-[14.3%]",
                  variant === "simple" ? "gap-4" : "justify-between"
                )}
                style={{ containerType: "inline-size", gap: `calc((24px / 196) * ${_width})` }}
              >
                <span
                  className={clsx(
                    "leading-[1.25em] tracking-[-.02em] text-balance font-semibold",
                    variant === "simple" ? "text-[12cqw]" : "text-[10.5cqw]"
                  )}
                  style={{ color: textColor }}
                >
                  {title}
                </span>
                {variant === "stripe" ? (
                  <svg className="scale-75 -ml-1 -mb-1" height="24" width="24" style={{ fill: textColor }}>
                    <path d="M21,21H3L12,3Z" />
                  </svg>
                ) : _illustration}
              </div>
            </div>
          )}

          {/* Texture Overlay */}
          {textured && (
            <div
              className="absolute top-0 left-0 inset-0 rotate-180 rounded-l-md rounded-r mix-blend-hard-light pointer-events-none bg-cover bg-no-repeat opacity-30 brightness-110 bg-[url('https://assets.vercel.com/image/upload/v1720554484/front/design/book-texture.avif')]" />
          )}
        </div>

        {/* Book Spine / Pages Depth Effect */}
        <div
          className="h-[calc(100%_-_2_*_3px)] w-[calc(29cqw_-_2px)] absolute top-[3px]"
          style={{
            background: "linear-gradient(90deg, #eaeaea, transparent 70%), linear-gradient(#fff, #fafafa)",
            transform: `translateX(calc(${_width} * 1px - 29cqw / 2 - 3px)) rotateY(90deg) translateX(calc(29cqw / 2))`
          }}
        />
        <div
          className="bg-gray-200 absolute left-0 top-0 rounded-l-md rounded-r h-full"
          style={{ width: _width, transform: "translateZ(calc(-1 * 29cqw))" }}
        />
      </div>
    </div>
  );
};
