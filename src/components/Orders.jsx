import { Auth } from 'aws-amplify';
import { useState, useEffect } from 'react';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import { v4 } from 'uuid'
import {
    Box,
    Collapse,
    Divider,
    IconButton,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    MenuItem,
    TextField,
    LinearProgress,
} from '@mui/material'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import './Style.css';
import AddOrder from './AddOrder';
import { useNavigate, Outlet } from 'react-router-dom';
import ProtectedLayout from '../components/layout/ProtectedLayout';
import { useAuthenticator } from '@aws-amplify/ui-react';

export default function Item() {
    const { user, signOut } = useAuthenticator((context) => [context.user]);

    const [orders, setOrders] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    const [open, setOpen] = useState([]);
    const [openModal, setOpenModal] = useState(false);
    const navigate = useNavigate();

    const userType = user.attributes.zoneinfo;
    const isAdminOrStaff = userType === 'admin' || userType === 'staff';
    const loginUserName = user.attributes.name;

    useEffect(() => {
        Auth.currentSession()
            .then(session => {
                const token = session.getAccessToken().getJwtToken();

                const apiUrl = 'http://localhost:8080/api/order';
                const headers = {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
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
                    .then((order) => {
                        // Filter orders based on userType
                        if (userType === 'Subbie') {
                            // If userType is 'Subbie', filter orders where userName matches loginUserName
                            order = order.filter(order => order.userName === loginUserName);
                        }
                        setOrders(order);
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
    }, []); // Empty dependency array to run the effect only once on component mount

    const handleClick = (clickIndex) => {
        if (open.includes(clickIndex)) {
            const openCopy = open.filter((element) => { return element != clickIndex });
            setOpen(openCopy);
        } else {
            const openCopy = [...open];
            openCopy.push(clickIndex);
            setOpen(openCopy);
        }
    }

    const handleOrderSubmit = (orderSubmit) => {
        console.log('order details:', orderSubmit);
        orders.push(orderSubmit);
    }

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
                        {orders && (
                            <div style={{ margin: "10px" }}>
                                <h2>Order</h2>
                                <Form>
                                    <Form.Group className="mb-3" controlId="formBasicEmail">
                                        <Form.Control type="text" placeholder="Search..." />
                                    </Form.Group>
                                </Form>

                                <TableContainer>
                                    <Table>
                                        <TableHead>
                                            <TableRow>
                                                <TableCell>Collapse</TableCell>
                                                <TableCell>Order#</TableCell>
                                                <TableCell>Status</TableCell>
                                                {isAdminOrStaff && <TableCell>Users</TableCell>}
                                                <TableCell>Created At</TableCell>
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            {orders.map((order, index) => (
                                                <React.Fragment key={v4()}>
                                                    <TableRow key={order.orderId}>
                                                        <TableCell>
                                                            <IconButton onClick={() => handleClick(index)}>
                                                                {open.includes(index) ? (<KeyboardArrowUpIcon />) : (<KeyboardArrowDownIcon />)}
                                                            </IconButton>
                                                        </TableCell>
                                                        <TableCell>{order.orderId}</TableCell>
                                                        <TableCell>{order.status}</TableCell>
                                                        {isAdminOrStaff && <TableCell>{order.userName}</TableCell>}
                                                        <TableCell>{order.createdAt}</TableCell>
                                                    </TableRow>
                                                    <TableRow>
                                                        <TableCell colSpan={5} style={{ paddingBottom: 0, paddingTop: 0, border: "0px" }}>
                                                            <Collapse in={open.includes(index)} timeout="auto" unmountOnExit>
                                                                <Box style={{ width: "100%", minHeight: "36px", textAlign: "center" }}>
                                                                    {order.status === "Completed" ? (
                                                                        <Form>
                                                                            <h6 style={{ marginTop: "10px" }}>Tracking#: {order.tracking} </h6>
                                                                            <Table>
                                                                                <TableHead>
                                                                                    <TableRow>
                                                                                        <TableCell>CS#</TableCell>
                                                                                        <TableCell>Item</TableCell>
                                                                                        <TableCell>Serial#</TableCell>
                                                                                    </TableRow>
                                                                                </TableHead>
                                                                                <TableBody>
                                                                                    <TableRow>
                                                                                        <TableCell></TableCell>
                                                                                        <TableCell></TableCell>
                                                                                        <TableCell></TableCell>
                                                                                    </TableRow>
                                                                                </TableBody>
                                                                            </Table>
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
                                                                                    {order.orderedProduct.map((product, productIndex) => (
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

                                {userType === 'Subbie' && (
                                    <div className="floating-button-container">
                                        <button className="add-button" onClick={() => setOpenModal(true)}>+</button>
                                    </div>
                                )}

                                <Modal
                                    show={openModal}
                                    onHide={() => setOpenModal(false)}
                                    dialogClassName="modal-90w"
                                    aria-labelledby="example-custom-modal-styling-title"
                                >
                                    <Modal.Header closeButton>
                                        <Modal.Title id="example-custom-modal-styling-title">
                                            New Order
                                        </Modal.Title>
                                    </Modal.Header>
                                    <Modal.Body>
                                        <AddOrder orderNo={orders.length + 1} userType={userType} handleOrderSubmit={handleOrderSubmit}></AddOrder>
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
