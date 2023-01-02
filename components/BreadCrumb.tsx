import { Text } from "@mantine/core";
import Link from "next/link";
import { FC } from "react";

type Props = {
  href: string;
  title: string;
};

const Breadcrumb: FC<Props> = ({ href, title }) => {
  return (
    <Link href={href}>
      <Text color="brand.6" size="sm">
        {title}
      </Text>
    </Link>
  );
};

export default Breadcrumb;
