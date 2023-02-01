import { Flex, Image, Text, MediaQuery } from "@mantine/core";
import { IconChevronsDownLeft, IconTrash } from "@tabler/icons";
import { Dispatch, FC, SetStateAction, useEffect, useState } from "react";
import { PopulatedProduct } from "../../../utils/types";
import useReloadImage from "../../../utils/useReloadImage";
import ConfirmDelete from "../../layout/ConfirmDelete";
import ProductModal from "./ProductModal";
type Props = {
  product: PopulatedProduct;
  setIsUpdated: Dispatch<SetStateAction<boolean>>;
};

const OverviewProduct: FC<Props> = ({ product, setIsUpdated }) => {
  const [opened, setOpened] = useState(false);
  const [openedConfirm, setOpenedConfirm] = useState(false);

  const [src, setSrc] = useState<string[]>([]);

  // Reloads added images after build
  useEffect(() => {
    const reloadImages = async () => {
      let list: string[] = [];
      for (let i = 0; i < product.images.length; i++) {
        let image = product.images[i];
        const checkImage = await useReloadImage(image);
        if (checkImage) {
          list.push(checkImage);
        }
      }
      setSrc(list);
      product.images = src;
    };
    reloadImages();
  }, []);
  console.log(src);
  return (
    <>
      <tr key={product.title}>
        <td style={{ height: "50px" }}>
          <Flex gap={10} w={100}>
            <Image
              src={src.length > 0 ? src[0] : `/uploads/${product.images[0]}`}
              width={30}
              alt={product.title}
              fit="contain"
            />
            <Flex direction={"column"}>
              <Text
                onClick={() => setOpened(true)}
                size={11}
                sx={{ cursor: "pointer" }}
                color="dimmed"
              >
                {product.title}
              </Text>
              <MediaQuery largerThan={"xs"} styles={{ display: "none" }}>
                <Text size={7}>{product.partNo}</Text>
              </MediaQuery>
              <Text size={11}>
                {product.mainProduct.price.$numberDecimal + " KR"}{" "}
              </Text>
            </Flex>
          </Flex>
        </td>
        <MediaQuery smallerThan={"xs"} styles={{ display: "none" }}>
          <td>
            <Text size={10}>{product.partNo}</Text>
          </td>
        </MediaQuery>
        <MediaQuery smallerThan={"xs"} styles={{ display: "none" }}>
          <td>
            <Text
              size={10}
              sx={(theme) => ({
                [theme.fn.smallerThan("xs")]: {
                  fontSize: 9,
                },
              })}
            >
              {product.mainProduct.category.title}
            </Text>
          </td>
        </MediaQuery>
        <td>
          <Text size={10}>{product.reservedQty}</Text>
        </td>
        <td>
          <Text size={10}>{product.availableQty}</Text>
        </td>
        <td>
          <IconTrash
            style={{ cursor: "pointer" }}
            size={14}
            onClick={() => {
              setOpenedConfirm(true);
            }}
          />
        </td>
        <ProductModal
          product={product}
          setOpened={setOpened}
          opened={opened}
          setIsUpdated={setIsUpdated}
        />
      </tr>
      <ConfirmDelete
        product={product}
        setOpened={setOpenedConfirm}
        opened={openedConfirm}
        setIsUpdated={setIsUpdated}
      />
    </>
  );
};

export default OverviewProduct;
