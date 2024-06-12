"use client";
import { useCallback } from "react";
import { CldUploadWidget } from "next-cloudinary";
import Image from "next/image";
import { TbPhotoPlus } from "react-icons/tb";
import { Container } from "postcss";

declare global{
    var cloudinary: any;
}

interface ImageUploadProps{
    onChange: (imgValue: string) => void;
    imgValue: string;
}

const ImageUpload = ({ imgValue, onChange }: ImageUploadProps) => {
    const handleUpload = useCallback((result:any) => { 
        onChange(result.info.secure_url);  
    }, [onChange])
  
    return (
        <CldUploadWidget
            onSuccess={handleUpload}
            uploadPreset="fskba6iv"
            options={{ maxFiles: 1 }}
        >
            {({ open }) => {
                return (
                    <div onClick={(()=>open?.())}
                         className="relative cursor-pointer hover:opacity-70 transition border-dashed border-2 p-20 border-neutral-300 flex flex-col justify-center items-center gap-4 text-neutral-600">
                        <TbPhotoPlus size={60} />
                        <div className="font-semibold text-lg">
                            Click here to Upload Photo
                        </div>
                        {imgValue && (
                        <div className="absolute inset-0 size-full">
                                <Image
                                    alt="uploaded-img"
                                    fill
                                    style={{ objectFit: 'cover' }}
                                    src={imgValue}
                                />
                        </div>)
                        }
                    </div>

                )
            }}
        </CldUploadWidget>
  )
}

export default ImageUpload;
