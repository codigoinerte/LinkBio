import React, { useMemo, useState } from 'react'
import type { Project } from '../types/landing';
import DynamicIcon from '@/components/custom/DynamicIcon';
import useFancybox from '../hook/useFancybox';
import { Calendar, ExternalLink, MapPin, X } from 'lucide-react';
import { DateTime } from 'luxon';
import type { Landing } from '@/types/landing';
import clsx from 'clsx';
import { patternOptions, suggestedColors } from '@/mock/theme';
import type { WallpaperOptionId } from '@/admin/types/design';


const BASE_IMAGE_GALERY = import.meta.env.VITE_BASE_URL_GALERY;

interface InnerProps {
    disableOverflow?: boolean;
    stylesContainer?: React.CSSProperties | undefined;
    stylesContainerInner?: React.CSSProperties | undefined;
}

interface HeadingLandingProps {
    name: string,
    headline:string | null
}

interface ProfileLandingProps {
    wallpaper_type: WallpaperOptionId;
    is_verified: boolean;
    photoImage: string;
}

const HeadingLanding =  ({name, headline}: HeadingLandingProps) => {
    return (
        <>
            {/* name and bio */}
            <h1 className="text-[20px] capitalize font-semibold">{name}</h1>
            
            {/* headline */}
            {
                headline && (
                    <p className="text-[16px] font-thin opacity-80">{headline}</p>
                )
            }     
        </>
    )
}

const ProfileLanding = ({ wallpaper_type, photoImage, is_verified }:ProfileLandingProps) => {
    const noImage = "/assets/images/no-profile-picture-icon.webp";
    return (
        <>
            <div    className={clsx(`border-3 border-white rounded-full relative shadow-md`, {                
                "w-30 h-30 ml-4 -mt-15": wallpaper_type == "image",
                "w-20 h-20 ml-3 items-center justify-center": wallpaper_type != "image",
                
            })}
                    style={{
                        backgroundImage: `url(${photoImage || noImage})`,
                        backgroundPosition: "center center",
                        backgroundRepeat: "no-repeat",
                        backgroundSize: "cover",
                    }}>
                {
                    is_verified ? (
                        <div className={clsx("absolute bottom-0 w-auto", {
                            "right-0 ": wallpaper_type == "image",
                            "-right-2.5": wallpaper_type != "image",
                        })}>
                            <svg viewBox="0 0 22 22" aria-label="Cuenta verificada" className="z-99" role="img" style={{ color: "#1d9bf0", width:"30px" }} data-testid="icon-verified">
                                <g>
                                    <path d="M20.396 11c-.018-.646-.215-1.275-.57-1.816-.354-.54-.852-.972-1.438-1.246.223-.607.27-1.264.14-1.897-.131-.634-.437-1.218-.882-1.687-.47-.445-1.053-.75-1.687-.882-.633-.13-1.29-.083-1.897.14-.273-.587-.704-1.086-1.245-1.44S11.647 1.62 11 1.604c-.646.017-1.273.213-1.813.568s-.969.854-1.24 1.44c-.608-.223-1.267-.272-1.902-.14-.635.13-1.22.436-1.69.882-.445.47-.749 1.055-.878 1.688-.13.633-.08 1.29.144 1.896-.587.274-1.087.705-1.443 1.245-.356.54-.555 1.17-.574 1.817.02.647.218 1.276.574 1.817.356.54.856.972 1.443 1.245-.224.606-.274 1.263-.144 1.896.13.634.433 1.218.877 1.688.47.443 1.054.747 1.687.878.633.132 1.29.084 1.897-.136.274.586.705 1.084 1.246 1.439.54.354 1.17.551 1.816.569.647-.016 1.276-.213 1.817-.567s.972-.854 1.245-1.44c.604.239 1.266.296 1.903.164.636-.132 1.22-.447 1.68-.907.46-.46.776-1.044.908-1.681s.075-1.299-.165-1.903c.586-.274 1.084-.705 1.439-1.246.354-.54.551-1.17.569-1.816zM9.662 14.85l-3.429-3.428 1.293-1.302 2.072 2.072 4.4-4.794 1.347 1.246z" fill="currentColor"></path>
                                    <path d="M9.662 14.85l-3.429-3.428 1.293-1.302 2.072 2.072 4.4-4.794 1.347 1.246z" fill="#fff"></path>
                                </g>
                            </svg>
                        </div>
                    ) : ''
                }
            </div>
        </>
    )
}

export const LandingContent:React.FC<Landing & InnerProps> = ({
        preview,
        textColor,
        wallpaperImage,
        wallpaper_type,
        photoImage,
        is_verified,
        name,
        headline,
        bio,
        links,
        accent,
        projects,
        disableOverflow,
        stylesContainer,
        stylesContainerInner,
        ColorId,
        patternId
    }) => {

    
    const [fancyboxRef] = useFancybox({ });
    const [showModal, setShowModal] = useState<Project | null>();
    const colorById:string = suggestedColors.find(color => color.id == ColorId?.id)?.color ?? "bg-white";
    const ColorCustom = useMemo(()=> ColorId?.custom ?? "bg-white", [ColorId?.custom]);
    const noImageBg = "/assets/images/no-image.webp";
    return (
        <div className="w-dwh h-full flex flex-1 bg-neutral-900"
                    style={{ height: "100vh", flex: 1, ...stylesContainer }}>
                        {/* ${preview ? preview : "bg-white"} */}
                    <div 
                        className={clsx(`max-w-125 w-full mx-auto md:m-auto  shadow-xl p-1 md:rounded-xl max-h-200 ${showModal || disableOverflow == true ? 'overflow-hidden' : 'overflow-auto'}
                            [&::-webkit-scrollbar]:w-2
                            [&::-webkit-scrollbar-track]:rounded-md
                        [&::-webkit-scrollbar-track]:bg-neutral-900
                            [&::-webkit-scrollbar-thumb]:rounded-md
                        [&::-webkit-scrollbar-thumb]:bg-gray-100
                            `, 
                            {
                                [preview]: !!preview && wallpaper_type == "image"
                            }) }
                        style={{ 
                            color: textColor, 
                            ...stylesContainerInner,
                            ...(wallpaper_type == "pattern" && patternId ? {...patternOptions.find(pattern => pattern.id == patternId)?.style} : {}),
                            ...(wallpaper_type == "color" && ColorCustom ? { backgroundColor: `${ColorCustom}` } : {}),
                            ...(ColorId?.id && wallpaper_type == "color" && (ColorId?.custom == undefined || ColorId?.custom == "") ? { color: colorById} : {}),
                        }}>

                        {/* wallpaper */}
                        {
                            wallpaper_type == "image" && (
                                <div className="w-full rounded-md min-h-50 shadow-md" style={{
                                    ...(wallpaper_type == "image" ? {
                                            backgroundImage: `url(${wallpaperImage || noImageBg})`,
                                            backgroundPosition: "center center",
                                            backgroundRepeat: "no-repeat",
                                            backgroundSize: "cover"
                                        } : {})
                                }} />
                            )
                        }

                        {/* image profile */}
                        {
                            wallpaper_type === "image" && <ProfileLanding wallpaper_type={wallpaper_type} photoImage={photoImage} is_verified={is_verified} />
                        }

                        {
                            wallpaper_type !== "image" &&                             
                            <div className='grid grid-cols-[100px_auto] gap-3 mt-4 pe-4'>
                                <div className='items-center justify-center flex'>
                                    <ProfileLanding wallpaper_type={wallpaper_type} photoImage={photoImage} is_verified={is_verified} />
                                </div>
                                <div>
                                    <HeadingLanding name={name} headline={headline}  />
                                </div>
                            </div>
                        }
                        
                        <div className="p-4">
                            {
                                wallpaper_type === "image" && <HeadingLanding name={name} headline={headline}  />
                            }

                            {/* separator */}
                            <div
                                className={wallpaper_type == "image" ? "my-4" : "mb-4"}
                                style={{
                                borderTop: `1px dashed ${textColor}`,
                                opacity: 0.4
                            }}/>

                            {/* about */}
                            <h4 className="font-semibold">About</h4>
                            <p className="text-[16px] font-thin mb-0">{bio}</p>

                            {/* links */}
                            {
                                links.length > 0 && (
                                    <>
                                        <h4 className="font-semibold">Links</h4>
                                        <ul className="my-4 flex flex-col gap-4">
                                            {
                                                links.map(link => (
                                                    <li key={link.id}>
                                                        <a href={link.url}
                                                            className={`p-4 flex flex-row gap-4 w-full rounded-md ${accent}`}>
                                                            {
                                                                link.code && (
                                                                    <DynamicIcon 
                                                                        name={link.icon} 
                                                                        className="self-center"
                                                                        width="30"
                                                                        height="30"
                                                                        />
                                                                )
                                                            }
                                                            <div className="flex flex-col gap-0.5">
                                                                <span className="font-normal text-[14px]">{link.title}</span>
                                                                <span className="font-thin text-[13px]">{link.description}</span>
                                                            </div>
                                                        </a>
                                                    </li>
                                                ))
                                            }
                                        </ul>
                                    </>
                                )
                            }

                            {/* Project */}
                            {
                                projects.length > 0 &&
                                <>
                                    <h4 className="font-semibold">Projects</h4>
                                    <ul className="my-4 flex flex-col gap-4">
                                        {
                                            projects.map((project) => (
                                                <li key={project.id}>
                                                    <button 
                                                        className={`p-4 flex flex-row gap-4 w-full rounded-md cursor-pointer ${accent}`}
                                                        onClick={()=> setShowModal(project)}>

                                                        {
                                                            project.galery.length > 0  ?
                                                            (
                                                                <div className="grid grid-cols-2 w-12.5 gap-0.5">
                                                                    {
                                                                        project.galery.map((image, i) => (
                                                                            <img 
                                                                                key={image.id} 
                                                                                src={`${BASE_IMAGE_GALERY}/thumb_${image.image_path}`} 
                                                                                className={`rounded-sm object-cover ${i == 0 ? 'row-span-2 h-full': ''}`}
                                                                                data-step={i}/>
                                                                        ))
                                                                    }
                                                                    {
                                                                        Array.from({length: 3 - project.galery.length}).map((_,i) =>(
                                                                            <img 
                                                                                key={i} 
                                                                                src="/assets/images/no-image.webp" 
                                                                                className="rounded-sm"/>
                                                                        ))
                                                                    }
                                                                </div>

                                                            ) : 
                                                            (
                                                                <div className="w-12.5">
                                                                    <img src="/assets/images/no-image.webp" className="w-full object-cover rounded-sm"/>
                                                                </div>
                                                            )
                                                        }


                                                        <div className="flex flex-col gap-0.5 flex-1">
                                                            <span className="font-normal text-[14px] text-left">{project.name}</span>
                                                            <span className="font-thin text-[13px] text-left">{project.short_description || project.description}</span>
                                                        </div>

                                                    </button>
                                                </li>
                                            ))
                                        }
                                    </ul>
                                </>
                            }

                            {/* copyright */}
                            {
                                !is_verified && (
                                    <>
                                        <div
                                            className="my-4" 
                                            style={{
                                            borderTop: `1px solid ${textColor}`,
                                            opacity: 0.4
                                        }} />
                                            
                                        <div className="text-center text-[13px] opacity-60">&copy; { new Date().getFullYear() } <span className="font-bold">About.me</span></div>                                
                                    </>
                                )
                            }

                            
                        </div>

                            {
                                showModal && (
                                    <div 
                                        className="fixed inset-0 w-full h-full z-9999 flex items-center justify-center bg-gray-800/60"
                                        onClick={()=> setShowModal(null) }>
                                        <div className="w-full h-fit max-w-125 max-h-100 flex p-4 items-center justify-center">
                                                <div className="bg-neutral-900 text-gray-300 flex flex-col flex-1 w-full h-full rounded-md" 
                                                    onClick={(e)=> { e.stopPropagation(); }}
                                                    style={{
                                                        boxShadow: "0 4px 8px 0 rgba(0,0,0,0.65)"
                                                    }}>
                                                    {/* title */}
                                                    <div className="px-4 py-3 border-b border-neutral-300 w-full flex justify-between font-semibold">
                                                        {showModal.name}
                                                        <button className="border-none cursor-pointer" onClick={()=> setShowModal(null) }>
                                                            <X />
                                                        </button>
                                                    </div>
                                                    <div className="p-4 overflow-auto">                                                    
                                                        {
                                                            showModal.galery.length > 0  &&
                                                            (
                                                                <div
                                                                    ref={fancyboxRef} 
                                                                    className="grid grid-cols-2 w-full gap-3 mb-3">
                                                                    {
                                                                        showModal.galery.map((image, i) => (
                                                                            <a  data-fancybox="gallery"
                                                                                href={`${BASE_IMAGE_GALERY}/${image.image_path}`} 
                                                                                key={image.id} 
                                                                                className={`relative w-full ${i == 0 ? 'row-span-2 h-full': 'h-25'}`}>
                                                                                <img 
                                                                                    src={`${BASE_IMAGE_GALERY}/medium_${image.image_path}`}
                                                                                    className="w-full h-full object-cover rounded-sm shadow-md"
                                                                                    data-step={i}
                                                                                />
                                                                            </a>
                                                                        ))
                                                                    }
                                                                    {
                                                                        Array.from({length: 3 - showModal.galery.length}).map((_,i) =>(
                                                                            <div key={i} className="relative w-full h-25">
                                                                                <img 
                                                                                    src="/assets/images/no-image.webp" 
                                                                                    className="w-full h-full object-cover rounded-sm shadow-md"/>
                                                                            </div>
                                                                        ))
                                                                    }
                                                                </div>

                                                            )
                                                        }

                                                        {
                                                            (showModal.from && showModal.to) && (
                                                                <div className="flex flex-row flex-wrap text-[14px] font-normal justify-between mb-3">
                                                                    <div className="flex flex-row items-center gap-1"><Calendar className="w-3.5 h-3" /> <span className="font-semibold">From:</span> { DateTime.fromSQL(showModal.from.toString()).toFormat("dd/MM/yyyy")}</div>
                                                                    <div className="flex flex-row items-center gap-1"><Calendar className="w-3.5 h-3" /> <span className="font-semibold">to:</span> { DateTime.fromSQL(showModal.to.toString()).toFormat("dd/MM/yyyy")}</div>
                                                                </div>
                                                            )
                                                        }
                                                        {
                                                            showModal.location && (
                                                                <div className="flex flex-row flex-wrap text-[14px] font-normal justify-start items-center gap-1 mb-3">
                                                                    <MapPin className="w-3.5 h-3" />
                                                                    <span>{showModal.location}</span>
                                                                </div>
                                                            )
                                                        }
                                                        {
                                                            showModal.link && (
                                                                <a href={showModal.link} className="flex flex-row flex-wrap text-[14px] font-normal justify-start items-center gap-1 mb-3">
                                                                    <ExternalLink className="w-3.5 h-3" />
                                                                    <span>{showModal.link}</span>
                                                                </a>
                                                            )
                                                        }
                                                        {
                                                            showModal.description && (
                                                                <>                                                            
                                                                    <h4 className="text-[16px] font-semibold mb-3">Description</h4>
                                                                    <div className="font-normal leading-5 text-justify text-[14px]">
                                                                        {showModal.description}
                                                                    </div>
                                                                </>
                                                            )
                                                        }
                                                    </div>
                                                </div>

                                        </div>
                                    </div>
                                )
                            }


                    </div>
        </div>
    )
}
