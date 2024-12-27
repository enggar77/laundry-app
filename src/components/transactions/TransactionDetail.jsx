/* eslint-disable react/prop-types */
import { useEffect } from "react";
import { Badge, Loading, Table, Tooltip } from "react-daisyui";

// prettier-ignore
export default function TransactionDetail({ transaction, shortenId, setWide }) {
   useEffect(() => {
      if (transaction) setWide(true);
   }, [transaction, setWide]);

   function formatTotalPrice(price, qty) {
      const totalPrice = price * qty;
      if (!totalPrice && totalPrice !== 0) return "Rp 0,-";
      return `Rp ${totalPrice.toLocaleString("id-ID")},-`;
   }

   function formatDate(input) {
      if (!input) return;
      const date = new Date(input);
      return date.toLocaleDateString("en-US", {
         year: "numeric",
         month: "long",
         day: "numeric",
      });
   }

   if (!transaction) return <Loading size='lg'/>;

   return (
      <>
         <h2 className="text-lg mb-4">
            History Transactions from <strong><u>{transaction.customer.name}</u></strong>
         </h2>
         <Table size="md">
            <Table.Head>
               <span>Transaction ID</span>
               <span>Transaction Date</span>
               <span>Package</span>
               <span>Qty</span>
               <span>Total Payment</span>
            </Table.Head>
            <Table.Body>
               {transaction.billDetails.map((detail) => (
                  <Table.Row key={detail.id} className="text-xs">
                     <span>
                        <Tooltip message={detail.id}>
                           <Badge color="neutral" variant="outline">
                              {shortenId(detail.id)}
                           </Badge>
                        </Tooltip>
                     </span>
                     <span>{formatDate(detail.createdAt)}</span>
                     <span>{detail.product.name}</span>
                     <span>
                        {detail.qty}&nbsp;{detail.product.type}
                     </span>
                     <span>{formatTotalPrice(detail.product.price,detail.qty)}</span>
                  </Table.Row>
               ))}
            </Table.Body>
         </Table>
      </>
   );
}
