import { Auth } from 'aws-amplify';
import { useState, useEffect } from 'react';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import {
    Box,
    Collapse,
    IconButton,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    LinearProgress,
} from '@mui/material'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import './Style.css';
import NewDispatch from './NewDispatch';
import { DataService } from '../services/data-service';
import ProtectedLayout from '../components/layout/ProtectedLayout';
import { useAuthenticator } from '@aws-amplify/ui-react';

export default function Dispatches() {
    const { user, signOut } = useAuthenticator((context) => [context.user]);

    const [dispatches, setDispatches] = useState(null);
    const [orderId, setOrderId] = useState(null);
    const [orderedProducts, setOrderedProducts] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    const [open, setOpen] = useState([]);
    const [openModal, setOpenModal] = useState(false);
    const [selectedOrder, setSelectedOrder] = useState(null);

    const [selectedOrderDetails, setSelectedOrderDetails] = useState(null);

    const [isSubmitted, setIsSubmitted] = useState(false);

    const userType = user.attributes.zoneinfo
    const isAdminOrStaff = userType === 'admin' || userType === 'staff';

    useEffect(() => {
        Auth.currentSession()
            .then(session => {
                const token = session.getAccessToken().getJwtToken();

                const apiUrl = 'http://localhost:8080/api/order';
                const headers = {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                };

                fetch(apiUrl, { headers })
                    .then((response) => {
                        if (!response.ok) {
                            throw new Error('Network response was not ok');
                        }
                        return response.json();
                    })
                    .then((dispatch) => {
                        setDispatches(dispatch);
                        setIsLoading(false);
                    })
                    .catch((error) => {
                        setError(error);
                        setIsLoading(false);
                    });
            })
            .catch(error => {
                console.log('Error getting authentication token:', error);
            });

        setIsLoading(true);
    }, []);

    const handleClick = (clickIndex) => {
        if (open.includes(clickIndex)) {
            const openCopy = open.filter((element) => { return element !== clickIndex });
            setOpen(openCopy);
        } else {
            const openCopy = [...open];
            openCopy.push(clickIndex);
            setOpen(openCopy);
        }
    }

    const handleDispatchClick = (order) => {
        setOrderId(order._id);
        setOrderedProducts(order.orderedProduct)
        console.log("ordered product ", order.orderedProduct);
        setSelectedOrder(order);
        setSelectedOrderDetails({
            orderId: order.orderId,
            userName: order.userName,
        });
        setOpenModal(true);
    }
    const handleDispatchSubmitted = () => {
        setIsSubmitted(true);
    };

    // Define the update data function here
    const updateDataInDatabase = async (updatedData) => {
        try {
            const updateApiUrl = `http://localhost:8080/api/order/${orderId}`; // Replace with your API endpoint
            const token = await Auth.currentSession().then((session) => session.getAccessToken().getJwtToken());
            const headers = {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            };

            const requestBody = updatedData;

            const response = await fetch(updateApiUrl, {
                method: 'PUT',
                headers: headers,
                body: JSON.stringify(requestBody),
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            // Handle the response (e.g., show a success message)
            console.log('Data updated successfully');
        } catch (error) {
            console.error('Error updating data:', error);
        }
    };

    const handleFormDataFromNewDispatch = (formData) => {
        // You can access the formData here and perform any necessary actions
        console.log(formData);

        const updatedData = {
            orderId: formData.orderId,
            userId: formData.userId,
            userName: formData.userName,
            status: formData.status,
            tracking: formData.tracking,
            orderedProduct: orderedProducts,
            items: formData.tableRows,
        };

        // Call the update function
        updateDataInDatabase(formData);
    };





    return (
        <>
            <ProtectedLayout>
                {isLoading ? (
                    <div>
                        Loading...
                        <Box sx={{ width: '100%' }}>
                            <LinearProgress />
                        </Box>
                    </div>
                ) : error ? (
                    <div>Error: {error.message}</div>
                ) : (
                    <>
                        {dispatches && (
                            <div style={{ margin: "10px" }}>
                                <h2>Dispatches</h2>
                                {/* <Form>
                                    <Form.Group className="mb-3" controlId="formBasicEmail">
                                        <Form.Control type="text" placeholder="Search..." />
                                    </Form.Group>
                                </Form> */}

                                <TableContainer>
                                    <Table>
                                        <TableHead>
                                            <TableRow>
                                                <TableCell>Collapse</TableCell>
                                                <TableCell>Order#</TableCell>
                                                <TableCell>Status</TableCell>
                                                {isAdminOrStaff && <TableCell>Users</TableCell>}
                                                <TableCell>Created At</TableCell>
                                                <TableCell>Updated At</TableCell>
                                                <TableCell>Dispatch</TableCell>
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            {dispatches.map((dispatch, index) => (
                                                <React.Fragment key={dispatch.orderNo}>
                                                    <TableRow>
                                                        <TableCell>
                                                            <IconButton
                                                                onClick={() => handleClick(index)}
                                                            >
                                                                {open.includes(index) ? (
                                                                    <KeyboardArrowUpIcon />
                                                                ) : (
                                                                    <KeyboardArrowDownIcon />
                                                                )}
                                                            </IconButton>
                                                        </TableCell>
                                                        <TableCell>{dispatch.orderId}</TableCell>
                                                        <TableCell>{dispatch.status}</TableCell>
                                                        {isAdminOrStaff && <TableCell>{dispatch.userName}</TableCell>}
                                                        <TableCell>{dispatch.createdAt}</TableCell>
                                                        <TableCell>{dispatch.updatedAt}</TableCell>
                                                        <TableCell>
                                                            <Button variant="primary" onClick={() => handleDispatchClick(dispatch)}>
                                                                Dispatch
                                                            </Button>
                                                        </TableCell>
                                                    </TableRow>
                                                    <TableRow>
                                                        <TableCell colSpan={7} style={{ paddingBottom: 0, paddingTop: 0, border: "0px" }}>
                                                            <Collapse in={open.includes(index)} timeout="auto" unmountOnExit>
                                                                <Box style={{ width: "100%", minHeight: "36px", textAlign: "center" }}>
                                                                    {dispatch.status === "completed" ? (
                                                                        <Form>
                                                                            <h6>Order Completed</h6>
                                                                        </Form>
                                                                    ) : (
                                                                        <div id='submiited'>
                                                                            <Table>
                                                                                <TableHead>
                                                                                    <TableRow>
                                                                                        <TableCell>Product Name</TableCell>
                                                                                        <TableCell>Qty</TableCell>
                                                                                    </TableRow>
                                                                                </TableHead>
                                                                                <TableBody>
                                                                                    {dispatch.orderedProduct.map((product, productIndex) => (
                                                                                        <TableRow key={productIndex}>
                                                                                            <TableCell>{product.productName}</TableCell>
                                                                                            <TableCell>{product.quantity}</TableCell>
                                                                                        </TableRow>
                                                                                    ))}
                                                                                </TableBody>
                                                                            </Table>
                                                                        </div>
                                                                    )}
                                                                </Box>
                                                            </Collapse>
                                                        </TableCell>
                                                    </TableRow>
                                                </React.Fragment>
                                            ))}
                                        </TableBody>
                                    </Table>
                                </TableContainer>


                                <Modal
                                    show={openModal}
                                    onHide={() => setOpenModal(false)}
                                    dialogClassName="modal-xl"
                                    aria-labelledby="example-custom-modal-styling-title"
                                >
                                    <Modal.Header closeButton>
                                        <Modal.Title id="example-custom-modal-styling-title">
                                            New Dispatch
                                        </Modal.Title>
                                    </Modal.Header>
                                    <Modal.Body>
                                        <NewDispatch orderDetails={selectedOrderDetails} onDispatchSubmitted={handleDispatchSubmitted} onFormDataSubmitted={handleFormDataFromNewDispatch} />
                                    </Modal.Body>
                                </Modal>
                            </div>
                        )}
                    </>
                )}
            </ProtectedLayout>
        </>
    )
}


