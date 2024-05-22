import './RoundedImage.css'
export default function RoundedImage ({alt, width, src}) {
    return(
        <img
          src={src}
          alt={alt}
          className={`rounded_image ${width}`}
          />
    )
}