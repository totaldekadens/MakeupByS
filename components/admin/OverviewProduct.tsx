import { Flex, Image, Title, Text, Group, MediaQuery } from "@mantine/core";
import { IconEdit, IconTrash } from "@tabler/icons";
import { Dispatch, FC, SetStateAction, useState } from "react";
import { CategoryDocument } from "../../models/Category";
import { PopulatedProduct } from "../../utils/types";
import ProductModal from "../layout/ProductModal";
type Props = {
  product: PopulatedProduct;
  setIsUpdated: Dispatch<SetStateAction<boolean>>;
};

const OverviewProduct: FC<Props> = ({ product, setIsUpdated }) => {
  const [opened, setOpened] = useState(false);
  return (
    <tr key={product.title}>
      <td style={{ height: "50px" }}>
        <Flex gap={10} w={100}>
          <Image
            src={`/uploads/${product.images[0]}`}
            width={30}
            alt={product.title}
            fit="contain"
          />
          <Flex direction={"column"}>
            <Text
              onClick={() => setOpened(true)}
              size={10}
              sx={{ cursor: "pointer" }}
              color="dimmed"
            >
              {product.title}
            </Text>
            <MediaQuery largerThan={"xs"} styles={{ display: "none" }}>
              <Text size={7}>{product.partNo}</Text>
            </MediaQuery>
            <Text size={10}>
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
        <Flex
          gap={6}
          sx={(theme) => ({
            [theme.fn.smallerThan("xs")]: {
              flexDirection: "column",
            },
          })}
        >
          <IconEdit size={14} />
          <IconTrash size={14} />
        </Flex>
      </td>
      <ProductModal
        product={product}
        setOpened={setOpened}
        opened={opened}
        setIsUpdated={setIsUpdated}
      />
    </tr>
  );
};

export default OverviewProduct;
