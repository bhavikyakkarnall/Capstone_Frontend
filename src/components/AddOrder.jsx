import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
} from '@mui/material';
import { Auth } from 'aws-amplify';
import { useState, useEffect } from 'react';
import DataService from '../services/dataService';
import { useAuthenticator } from '@aws-amplify/ui-react';


export default function AddProduct({ handleOrderSubmit, orderNo, userType }) {

  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [quantityMap, setQuantityMap] = useState({});
  const { user, signOut } = useAuthenticator((context) => [context.user]);
  const dataService = new DataService('http://localhost:8080')

  useEffect(() => {
    Auth.currentSession()
      .then((session) => {
        const token = session.getAccessToken().getJwtToken();

        const apiUrl = 'http://localhost:8080/api/item';
        const headers = {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
          // Add any other headers you may need
        };

        // Make the API call using fetch
        fetch(apiUrl, { headers })
          .then((response) => {
            if (!response.ok) {
              throw new Error('Network response was not ok');
            }
            return response.json();
          })
          .then((items) => {
            setItems(items);
            setIsLoading(false);
          })
          .catch((error) => {
            setError(error);
            setIsLoading(false);
          });
      })
      .catch((error) => {
        console.log('Error getting authentication token:', error);
      });

    setIsLoading(true);
  }, []); // Empty dependency array to run the effect only once on component mount

  // Filter unique product names and their descriptions
  const uniqueProducts = Array.from(
    new Set(items.map((item) => item.productName))
  ).map((productName) => ({
    productName,
    productDesc: items.find((item) => item.productName === productName)
      .productDesc,
    productImg: items.find((item) => item.productName === productName)
      .productImg,
  }));



  const handleQuantityChange = (productName, newQuantity) => {
    // Update the quantity for a specific product
    setQuantityMap((prevQuantityMap) => ({
      ...prevQuantityMap,
      [productName]: newQuantity,
    }));
  };

  const handleSubmit = () => {
    const formData = []

    // Prepare the order details using the quantityMap
    for (const productName of Object.keys(quantityMap)) {
      const quantity = quantityMap[productName];
      if (quantity > 0) {
        formData.push({ productName, quantity });
      }
    }

    // Get today's date and format it (assuming you want it in the "DD-MM-YY" format)
    const today = new Date();
    const day = today.getDate().toString().padStart(2, '0');
    const month = (today.getMonth() + 1).toString().padStart(2, '0'); // Months are zero-based, so we add 1
    const year = today.getFullYear().toString().slice(-2); // Get the last two digits of the year

    const formattedDate = `${day}-${month}-${year}`;

    // Prepare the order details
    const orderDetails = {
      orderId: orderNo,
      userId:  user.attributes.profile,
      userName:  user.attributes.name,
      status: 'submitted',
      tracking: "-",
      orderedProduct: formData,
      items: []
    };

    // Send the order details to the parent component
    handleOrderSubmit(orderDetails);

    dataService
    .createOrder(orderDetails)
    .then((newOrder) => {
      // Handle the response, newOrder contains the newly created order from the database
      console.log('Order created:', newOrder);
      // You can also reset the form or perform other actions here
    })
    .catch((error) => {
      // Handle any errors that occur during the API call
      console.error('Error creating order:', error);
    });

  };

  return (
    <>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Quantity</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {uniqueProducts.map((product) => (
              <TableRow key={product.productName}>
                <TableCell>{product.productName}</TableCell>
                <TableCell>
                  <TextField
                    type="number"
                    value={quantityMap[product.productName] || 0}
                    onChange={(e) =>
                      handleQuantityChange(
                        product.productName,
                        parseInt(e.target.value, 10)
                      )
                    }
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <div
          style={{
            margin: '5px',
            display: 'flex',
            justifyContent: 'flex-end',
          }}
        >
          <Button variant='contained' color='primary' onClick={handleSubmit}>
            Submit
          </Button>
        </div>
      </TableContainer>
    </>
  );
}
