import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Item } from "../types/types";
import Image from "next/image";
import DeleteIcon from "@mui/icons-material/Delete";
import PriceCheckIcon from "@mui/icons-material/PriceCheck";
import { useRouter } from "next/router";
import { useTranslation } from "next-i18next";

interface MyItemsTableProps {
  items: Item[];
}

export const MyItemsTable: React.FC<MyItemsTableProps> = ({ items }) => {
  const { t } = useTranslation("common");
  const router = useRouter();
  const isRTL = router.locale === "he";

  return (
    <TableContainer component={Paper}>
      <Table aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell
              sx={{
                display: { xs: "none", sm: "table-cell" },
              }}
              align="center"
            ></TableCell>
            <TableCell align={isRTL ? "right" : "left"}>
              {t("myItems.table.columnHeader.title")}
            </TableCell>
            <TableCell
              sx={{
                display: { xs: "none", sm: "table-cell" },
              }}
              align="center"
            >
              {t("myItems.table.columnHeader.description")}
            </TableCell>
            <TableCell align="center">
              {t("myItems.table.columnHeader.price")}
            </TableCell>
            <TableCell align="center">
              {t("myItems.table.columnHeader.actions")}
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {items.map((item) => (
            <TableRow
              key={item.id}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell
                align="center"
                sx={{
                  display: { xs: "none", sm: "table-cell" },
                }}
              >
                <Image
                  alt={item.mainImage.alt}
                  src={item.mainImage.url}
                  height="25px"
                  width="25px"
                />
              </TableCell>
              <TableCell
                align={isRTL ? "right" : "left"}
                component="th"
                scope="row"
              >
                {item.title}
              </TableCell>
              <TableCell
                sx={{
                  display: { xs: "none", sm: "table-cell" },
                }}
                align="center"
              >
                {item.description}
              </TableCell>
              <TableCell align="center">{item.price.price}</TableCell>
              <TableCell align="center">
                <DeleteIcon color={"primary"} />
                <PriceCheckIcon color={"primary"} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
