import Image from "next/image";

type Props = {
  image?: { src: string; alt: string; width: number; height: number };
  className?: string;
};

/**
 * Phone-shaped frame for project media. With an approved screenshot it shows the whole image
 * (the frame follows the screenshot's own proportions, so nothing is cropped); without one it
 * shows an honest "coming soon" state, never a mock-up of the product.
 */
export function PhoneFrame({ image, className = "" }: Props) {
  return (
    <div
      className={`relative rounded-[2.25rem] border-2 border-ink bg-ink p-[7px] shadow-[0_24px_40px_-24px_rgba(25,26,28,0.45)] ${className}`}
    >
      <div
        className="relative overflow-hidden rounded-[1.8rem] bg-porcelain"
        style={{ aspectRatio: image ? `${image.width} / ${image.height}` : "9 / 18.5" }}
      >
        {image ? (
          <Image
            src={image.src}
            alt={image.alt}
            width={image.width}
            height={image.height}
            sizes="(min-width: 768px) 260px, 60vw"
            className="h-full w-full object-cover object-top"
          />
        ) : (
          <div
            className="flex h-full flex-col items-center justify-center gap-3 px-5 text-center"
            style={{
              backgroundImage:
                "repeating-linear-gradient(135deg, transparent 0 10px, rgba(121,122,118,0.14) 10px 11px)",
            }}
          >
            <span aria-hidden="true" className="h-2.5 w-2.5 rounded-full bg-oxide" />
            <p className="text-sm font-semibold leading-snug">Screenshots coming soon</p>
            <p className="text-xs leading-snug text-ink/70">
              Added once approved for public use.
            </p>
          </div>
        )}
        <span
          aria-hidden="true"
          className="absolute left-1/2 top-2 h-1.5 w-14 -translate-x-1/2 rounded-full bg-ink/80"
        />
      </div>
    </div>
  );
}
