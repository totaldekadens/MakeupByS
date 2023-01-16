import { Flex, Image, Title, Text, Group, MediaQuery } from "@mantine/core";
import { IconEdit, IconTrash } from "@tabler/icons";
import { FC } from "react";
import { PopulatedProduct } from "../../utils/types";
type Props = {
  product: PopulatedProduct;
};

const OverviewProduct: FC<Props> = ({ product }) => {
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
            <Text size={10} sx={{}} color="dimmed">
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
    </tr>
  );
};

export default OverviewProduct;
