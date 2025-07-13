import { CardBody, CardContainer, CardItem } from "@/components/ui/3d-card";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

interface ICardProps {
  name: string;
  image: string;
  path: string;
  searchName?: string;
}

export const Card = ({ name, image, path, searchName }: ICardProps) => {
  return (
    <Link href={`/${path}/${searchName ? searchName : name}`}>
      <div className={"transition-all duration-200 hover:scale-110"}>
        <CardContainer className="xs:max-w-62 sm:max-w-80 lg:max-w-68">
          <CardBody className="group/card scrollbar-hide relative h-fit! mt-10 overflow-hidden rounded-xl border border-black/20 bg-gray-50 p-6 shadow-lg shadow-amber-900 transition-all duration-300 hover:-translate-y-6 dark:border-gray-800 dark:bg-black dark:shadow-pink-500 dark:hover:shadow-2xl dark:hover:shadow-emerald-500/10">
            <CardItem
              translateZ="100"
              rotateX={20}
              rotateZ={-10}
              className="mt-4 w-full"
            >
              <Image
                src={image}
                className="h-60 w-full rounded-xl object-cover group-hover/card:shadow-xl"
                quality={100}
                width={1000}
                height={1000}
                alt={"photo"}
              />
            </CardItem>

            <CardItem className="text-xl mt-5 w-full font-bold text-gray-800 dark:text-white">
              <p className="text-center">{name}</p>
            </CardItem>
          </CardBody>
        </CardContainer>
      </div>
    </Link>
  );
};
