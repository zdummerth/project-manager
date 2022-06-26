import Image from "next/image"
export default function VariantCard({ variant, handleClick }) {
    console.log("variant", variant)

    return (
        <button data-id={variant.id} className="flex" onClick={handleClick}>
            <Image
                src={variant.image.src}
                alt={variant.image.altText}
                height={60}
                width={60}
            />
            <div>
                {variant.title}
            </div>
        </button>
    )
}