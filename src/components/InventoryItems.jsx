import { Auth } from 'aws-amplify';
import { useState, useEffect } from 'react';
import Form from 'react-bootstrap/Form';
import Table from 'react-bootstrap/Table';
import Modal from 'react-bootstrap/Modal';
import Button from '@mui/material/Button';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import SaveIcon from '@mui/icons-material/Save';
import Icon from '@mui/material/Icon';
import Box from '@mui/material/Box';
import LinearProgress from '@mui/material/LinearProgress';
import ProtectedLayout from '../components/layout/ProtectedLayout'
import DataService from '../services/dataService.js'; // Import your DataService
import { FormLabel } from '@mui/material';
import { useAuthenticator } from '@aws-amplify/ui-react';

export default function InventoryItems() {
    const [items, setItems] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const [openModal, setOpenModal] = useState(false);
    const [editedItem, setEditedItem] = useState(null);

    const dataService = new DataService('http://localhost:8080'); // Replace with your actual API base URL

    const { user, signOut } = useAuthenticator((context) => [context.user]);

    const userType = user.attributes.zoneinfo;
    const loginUserName = user.attributes.name;
    const isAdmin = userType === 'admin';
    const isAdminOrStaff = userType === 'admin' || userType === 'staff';

    useEffect(() => {
        // Fetch data from your API using DataService
        const fetchData = async () => {
            try {
                const itemsWithId = await dataService.getItems(); // Get items with _id instead of itemId
                setItems(itemsWithId);
                setIsLoading(false);
            } catch (error) {
                setError(error);
                setIsLoading(false);
            }
        };

        Auth.currentSession()
            .then(session => {
                fetchData(); // Fetch data when the user is authenticated
            })
            .catch(error => {
                console.log('Error getting authentication token:', error);
            });

        setIsLoading(true);
    }, []);

    const handleEditClick = (item) => {
        setEditedItem({ ...item }); // Create a copy of the item to edit
    };

    const handleDeleteClick = (itemId) => {
        // Send a request to delete the record by _id
        dataService
            .deleteItem(itemId) // Replace with your API delete function
            .then(() => {
                // Filter out the deleted item from the items array
                const updatedItems = items.filter(item => item._id !== itemId);
                setItems(updatedItems);
            })
            .catch((error) => {
                console.error('Error deleting item:', error);
                // Handle the error as needed (e.g., show an error message)
            });
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
                        {items && (
                            <div style={{ margin: "10px" }}>
                                <h2>Inventory Items</h2>
                                <Form>
                                    <Form.Group className="mb-3" controlId="formBasicEmail">
                                        <Form.Control type="text" placeholder="Search..." />
                                    </Form.Group>
                                </Form>

                                <div className="floating-button-container">
                                    <button className="add-button">+</button>
                                </div>

                                <Table striped="columns">
                                    <thead>
                                        <tr>
                                            <th>#</th>
                                            <th>Item#</th>
                                            {isAdminOrStaff && <th>User</th>}
                                            <th>Product Name</th>
                                            <th>Location</th>
                                            <th>Serial#</th>
                                            <th>Created At</th>
                                            <th>Updated At</th>
                                            {isAdmin && <th colSpan={2}></th>}
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {items.map((item, index) => (
                                            <React.Fragment key={index}>
                                                {isAdminOrStaff || (userType === 'Subbie' && item.userName === loginUserName) ? (
                                                    <tr>
                                                        <td>{index + 1}</td>
                                                        <td>{item.itemId}</td>
                                                        {isAdminOrStaff && (
                                                            <td>
                                                                {editedItem && editedItem._id === item._id ? (
                                                                    <input
                                                                        type="text"
                                                                        value={editedItem.userName}
                                                                        onChange={(e) => {
                                                                            const updatedItem = { ...editedItem, userName: e.target.value };
                                                                            setEditedItem(updatedItem);
                                                                        }}
                                                                    />
                                                                ) : item.userName}
                                                            </td>
                                                        )}
                                                        <td>{item.productName}</td>
                                                        <td>
                                                            {editedItem && editedItem._id === item._id ? (
                                                                <input
                                                                    type="text"
                                                                    value={editedItem.location}
                                                                    onChange={(e) => {
                                                                        const updatedItem = { ...editedItem, location: e.target.value };
                                                                        setEditedItem(updatedItem);
                                                                    }}
                                                                />
                                                            ) : item.location}
                                                        </td>
                                                        <td>{item.serialNo}</td>
                                                        <td>{item.createdAt}</td>
                                                        <td>{item.updatedAt}</td>
                                                        {isAdmin && (
                                                            <td>
                                                                {editedItem && editedItem._id === item._id ? (
                                                                    <Button
                                                                        size="small"
                                                                        sx={{ color: 'green' }}
                                                                        startIcon={<SaveIcon />}
                                                                        onClick={() => {
                                                                            const updatedItems = items.map((itemInArray) =>
                                                                                itemInArray._id === editedItem._id ? editedItem : itemInArray
                                                                            );

                                                                            dataService
                                                                                .updateItem(editedItem._id, editedItem)
                                                                                .then(() => {
                                                                                    setItems(updatedItems);
                                                                                    setEditedItem(null);
                                                                                })
                                                                                .catch((error) => {
                                                                                    console.error('Error updating item:', error);
                                                                                });
                                                                        }}
                                                                    >
                                                                    </Button>
                                                                ) : (
                                                                    <Button
                                                                        size="small"
                                                                        sx={{ color: 'black' }}
                                                                        startIcon={<EditIcon />}
                                                                        onClick={() => handleEditClick(item)}
                                                                    >
                                                                    </Button>
                                                                )}
                                                            </td>
                                                        )}
                                                        {isAdmin && (
                                                            <td>
                                                                <Button
                                                                    size="small"
                                                                    sx={{ color: 'red' }}
                                                                    startIcon={<DeleteIcon />}
                                                                    onClick={() => handleDeleteClick(item._id)}
                                                                >
                                                                </Button>
                                                            </td>
                                                        )}
                                                    </tr>
                                                ) : null}
                                            </React.Fragment>
                                        ))}
                                    </tbody>
                                </Table>
                            </div>
                        )}
                    </>
                )}
            </ProtectedLayout>
        </>
    )
}
