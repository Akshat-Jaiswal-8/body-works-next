import { CardBody, CardContainer, CardItem } from "@/components/ui/3d-card";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { memo } from "react";

interface IDescriptedCardProps {
  gif: string;
  title: string;
  blog: string;
  id: string;
}

export const DescriptedCard = memo(
  ({ gif, title, blog, id }: IDescriptedCardProps) => {
    const match: RegExpMatchArray | null = blog.match("Description");
    const index: number | undefined = match?.index;

    return (
      <Link href={`/exercises/${id}`}>
        <CardContainer className="font-poppins xs:max-w-[16rem] no-scrollbar min-h-fit sm:max-w-80 lg:max-w-70">
          <CardBody className="group/card scrollbar-hide relative mt-10 flex h-auto flex-col items-center justify-center overflow-hidden rounded-xl border border-black/20 bg-gray-50 p-6 shadow-lg shadow-amber-900 transition-all duration-300 hover:-translate-y-6 dark:border-gray-800 dark:bg-black dark:shadow-pink-500 dark:hover:shadow-2xl dark:hover:shadow-emerald-500/10 space-y-6">
            <CardItem
              translateZ="50"
              className="text-xl font-bold text-gray-800 dark:text-white"
            >
              {title}
            </CardItem>
            <CardItem
              translateZ="100"
              rotateX={20}
              rotateZ={-10}
              className="mt-4 w-full"
            >
              <img
                src={gif}
                height={1000}
                width={1000}
                className="h-60 w-full rounded-xl object-cover group-hover/card:shadow-xl"
                alt="thumbnail"
                loading="lazy"
                decoding="async"
              />
            </CardItem>
            <CardItem
              as="p"
              translateZ="60"
              className="mt-2 max-w-sm text-sm text-neutral-500 dark:text-neutral-300"
            >
              {index && blog.slice(index + 11, 150) + "..."}
            </CardItem>
          </CardBody>
        </CardContainer>
      </Link>
    );
  }
);
