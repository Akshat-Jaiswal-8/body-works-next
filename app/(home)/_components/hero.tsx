"use client";

import * as motion from "motion/react-client";
import React from "react";

import Image from "next/image";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { MoveRight } from "lucide-react";

const headingVariants = {
  hidden: { opacity: 0, x: 0, y: 40 },
  visible: { opacity: 1, x: 0, y: 0 },
};

const contentVariants = {
  hidden: { opacity: 0, x: -40, y: 0 },
  visible: { opacity: 1, x: 0, y: 0 },
};

const imageVariants = {
  hidden: { opacity: 0, x: 0, y: 50 },
  visible: { opacity: 1, x: 0, y: 0 },
};

export const Hero = React.memo((): React.ReactNode => {
  return (
    <section className="flex flex-col items-center justify-center sm:mt-16">
      <div className="h-full items-center justify-center flex flex-col md:flex-row">
        <div className="grid-cols-col-lg items-center justify-between gap-5 lg:grid">
          <div>
            <motion.h1
              variants={headingVariants}
              initial="hidden"
              animate="visible"
              transition={{ duration: 0.1, delay: 0.25 }}
              className="xs:text-5xl font-calsans mb-8 leading-snug font-extrabold tracking-tighter text-amber-700 sm:text-6xl dark:text-slate-300"
            >
              Push
              <span
                className={
                  "leading-snug font-poppins mx-2 mr-4 italic text-amber-900 dark:text-pink-500"
                }
              >
                yourself harder
              </span>
              to become better
              <span className="xs:mt-4 xs:h-12 xs:w-48 inline-block overflow-hidden rounded-2xl sm:ml-4 sm:h-14 sm:w-[16rem] md:mt-2 md:w-[16rem] lg:w-80 xl:ml-4 xl:h-16">
                <motion.div
                  initial={{ scale: 1.25 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 0.1, delay: 1 }}
                  className="h-full relative w-full"
                >
                  <Image
                    src={"/img.png"}
                    alt="man with dumbbell"
                    fill
                    quality={100}
                    className="object-cover "
                    sizes="(max-width: 640px) 192px, (max-width: 768px) 256px, (max-width: 1024px) 256px, 320px"
                  />
                </motion.div>
              </span>
            </motion.h1>
            <motion.div
              variants={contentVariants}
              initial={"hidden"}
              animate={"visible"}
              transition={{ duration: 0.1, delay: 1 }}
              className="xs:mb-12 text-left text-xl tracking-tight leading-10 font-semibold text-amber-800 md:mb-16 dark:text-slate-300"
            >
              <p>
                Are you lagging to find the best exercises for your muscles ?
              </p>
              <p>Now your wait is over with BodyWorks !</p>
              <p>Build your muscles with your favourite exercises!</p>
            </motion.div>

            <motion.div
              variants={contentVariants}
              initial={"hidden"}
              animate={"visible"}
              transition={{ duration: 0.1, delay: 1 }}
            >
              <Button className="group transform-gpu bg-amber-700 px-4 py-4 text-lg font-semibold text-slate-100 hover:scale-110 hover:bg-amber-800 dark:bg-pink-700 dark:text-slate-200 dark:hover:bg-pink-800">
                <Link href={"/exercises"}>
                  <span
                    className={
                      "flex items-center group-hover:scale-95 justify-center gap-x-2"
                    }
                  >
                    Explore for free{" "}
                    <MoveRight
                      className={"group-hover:animate-bounce-right"}
                      size={20}
                      strokeWidth={2.5}
                      absoluteStrokeWidth
                    />
                  </span>
                </Link>
              </Button>
            </motion.div>
          </div>

          <motion.div
            variants={imageVariants}
            initial={"hidden"}
            animate={"visible"}
            transition={{ duration: 0.2, delay: 0.8 }}
            className={
              "mx-auto xs:hidden lg:block rounded-2xl shadow-2xl shadow-amber-600 md:h-120 xl:h-140 dark:shadow-pink-600"
            }
          >
            <img
              src={"/hero.webp"}
              className={"rounded-2xl md:h-120 xl:h-140 dark:grayscale"}
              alt={"man with dumbell"}
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
});

Hero.displayName = "Hero";
