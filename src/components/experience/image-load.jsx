'use client'
import { useEffect, useState } from "react"

const ImageLoad = ({
    src,
    alt,
    gradient = false,
    fillMode = 'cover',
}) => {
    const [loaded, setLoaded] = useState(false)

    useEffect(() => {
        const img = new Image();
        img.src = src;
        img.onload = () => setLoaded(true);
    }, [src]);

    const handleImageLoad = () => {
        setLoaded(true);
    };

    return (
         <div className={`relative w-full h-full`}>
            <div className={`skeleton absolute left-0 right-0 top-0 bottom-0 w-full h-full transition-opacity ${loaded ? 'opacity-0 duration-200' : 'opacity-100 duration-0'}`}></div>
            <div className="relative w-full h-full">
                {gradient && <div className={`absolute left-0 right-0 top-0 bottom-0 z-20 bg-gradient-to-b from-transparent to-[var(--img-preload)] to-[80%]`}></div>}
                <img 
                    src={src}
                    alt={alt}
                    onLoad={handleImageLoad}
                    className={`w-full h-full transition-opacity duration-500 ${loaded ? 'opacity-100' : 'opacity-0'}`}
                    style={{
                        objectFit: fillMode,
                    }}
                />
            </div>
        </div>
    )
}

export default ImageLoad