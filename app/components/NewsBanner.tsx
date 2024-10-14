"use client";

import React, { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Navigation, Scrollbar, Autoplay, EffectFade } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/autoplay";
import "swiper/css/scrollbar";
import "swiper/css/effect-fade";
import { NewsType } from "@/type";

export default function NewsBanner({ bannerInfo }: { bannerInfo: NewsType[] }) {
  const router = useRouter();
  const [isBannerInfo, setIsBannerInfo] = useState<NewsType[]>(bannerInfo);

  return (
    <Swiper
      modules={[Navigation, Scrollbar, Autoplay, EffectFade]}
      slidesPerView={1}
      centeredSlides={true}
      navigation={{ enabled: false }}
      autoplay={{
        delay: 4000,
        pauseOnMouseEnter: true,
      }}
      effect="coverflow"
      className="rounded-lg relative"
    >
      {isBannerInfo.length > 0 &&
        isBannerInfo?.map((info) => (
          <SwiperSlide
            key={info.article_id}
            className="cursor-pointer"
            onClick={() =>
              router.push(
                `/blog/article/${
                  info.article_id
                }?article=${info.title.toLocaleLowerCase()}`
              )
            }
          >
            <Image
              src={info.image_url && info.image_url}
              alt={info.title}
              width={1920}
              height={1080}
              quality={100}
              className="object-top object-cover max-h-80 rounded-lg"
            />

            <div className="absolute left-3 bottom-3 z-40 w-3/4 h-fit space-y-2 max-mobile-m:left-1.5 max-mobile-m:bottom-1.5">
              <p className="text-3xl text-white font-semibold line-clamp-2 max-tablet:text-2xl max-mobile-m:text-xl">
                {info.title}
              </p>
            </div>
            <div className="absolute inset-0 bg-gradient-to-b from-gray-100/0 via-gray-900/10 to-black/80 z-30" />
          </SwiperSlide>
        ))}
    </Swiper>
  );
}
