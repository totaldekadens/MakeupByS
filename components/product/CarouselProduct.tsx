import { Carousel } from "@mantine/carousel";
import { MantineNumberSize } from "@mantine/core";
import { FC } from "react";
import { PopulatedProduct } from "../../utils/types";
import ProductCard from "./ProductCard";

type Props = {
  products: PopulatedProduct[];
  slideGap: MantineNumberSize | undefined;
  slideSize: string;
  slidesToScroll?: number | "auto" | undefined;
};

const CarouselProduct: FC<Props> = ({
  products,
  slideGap,
  slideSize,
  slidesToScroll,
}) => {
  return (
    <Carousel
      slideSize={slideSize}
      slideGap={slideGap}
      loop
      slidesToScroll={slidesToScroll}
      align="start"
    >
      {products.length > 0 ? (
        products.map((item, index) => {
          return (
            <Carousel.Slide key={index}>
              <ProductCard product={item} />
            </Carousel.Slide>
          );
        })
      ) : (
        <Carousel.Slide></Carousel.Slide>
      )}
    </Carousel>
  );
};

export default CarouselProduct;
