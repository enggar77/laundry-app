import { useContext, useEffect, useState, useRef } from "react";
import { Table, Button, Badge, Tooltip } from "react-daisyui";
import { StoreContext } from "../../context/StoreContext";
import {
   fetchTransactions,
   fetchProducts,
   fetchCustomers,
} from "../../context/fetchData";
import ShowModal from "../ShowModal";
import TransactionDetail from "./TransactionDetail";

// eslint-disable-next-line react/prop-types
export default function TransactionTable({ shortenId }) {
   const { dispatch, errMessage, transactions } = useContext(StoreContext);
   const [data, setData] = useState([]);
   const [selectedTransaction, setSelectedTransaction] = useState(null);
   const ref = useRef(null);

   function reduceTransactions(data) {
      const newData = data.reduce((acc, curr) => {
         const existingTransaction = acc.find(
            (item) => item.customer.id === curr.customer.id,
         );

         if (existingTransaction) {
            // Merge transactions if the customer already exists
            existingTransaction.billDetails = [
               ...existingTransaction.billDetails,
               ...curr.billDetails,
            ];
         } else {
            // Otherwise, add the customer as a new entry
            acc.push({ ...curr });
         }

         return acc;
      }, []);

      return newData;
   }

   const handleShow = (transaction) => {
      setSelectedTransaction(transaction);
      ref.current?.showModal();
   };

   useEffect(() => {
      if (transactions && transactions.length > 0) {
         const aggregatedData = reduceTransactions(transactions);
         setData(aggregatedData);
      } else {
         fetchTransactions(dispatch);
         fetchProducts(dispatch);
         fetchCustomers(dispatch);
      }
   }, [dispatch, transactions]);

   return (
      <>
         <Table size="md" className={errMessage ? "" : "mt-6"}>
            <Table.Head>
               <span>No.</span>
               <span>Customer ID</span>
               <span>Customer Name</span>
               <span>Actions</span>
            </Table.Head>
            <Table.Body>
               {data.map((transaction, index) => (
                  <Table.Row key={transaction.customer.id} className="text-xs">
                     <span className="font-normal">{index + 1}</span>
                     <span>
                        <Tooltip message={transaction.customer.id}>
                           <Badge color="neutral" variant="outline">
                              {shortenId(transaction.customer.id)}
                           </Badge>
                        </Tooltip>
                     </span>
                     <span>
                        <h4 className="font-semibold">
                           {transaction.customer.name}
                        </h4>
                        <p className="text-xs text-gray-500 mb-1">
                           {transaction.billDetails.length}{" "}
                           {transaction.billDetails.length === 1
                              ? "Transaction"
                              : "Transactions"}
                        </p>
                     </span>
                     <span>
                        <Button
                           size="sm"
                           color="neutral"
                           onClick={() => handleShow(transaction)}
                        >
                           View Detail
                        </Button>
                     </span>
                  </Table.Row>
               ))}
            </Table.Body>
         </Table>

         {/* Detail Transaction */}
         <ShowModal
            content={TransactionDetail}
            ref={ref}
            transaction={selectedTransaction}
            shortenId={shortenId}
         />
      </>
   );
}
