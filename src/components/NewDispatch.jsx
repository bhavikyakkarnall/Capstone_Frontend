import {
    Box,
    Button,
    Divider,
    MenuItem,
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


const Staffs = [
    { "userId": "001", "name": "Shona", "userType": "Subbie", "company": "HomeSafe", "Address": "Manukau, Auckland", "phone": "02112345678", "email": "shona@test.com" },
    { "userId": "002", "name": "Geoff", "userType": "Subbie", "company": "HomeSafe", "Address": "Clevedon, Auckland", "phone": "02112345678", "email": "geoff@test.com" },
    { "userId": "003", "name": "Mike", "userType": "Subbie", "company": "Security Alert", "Address": "Remura, Auckland", "phone": "02112375678", "email": "mike@test.com" },
    { "userId": "004", "name": "Verryn", "userType": "Subbie", "company": "Security Alert", "Address": "Papakura, Auckland", "phone": "02112345678", "email": "verryn@test.com" },
    { "userId": "005", "name": "Richard", "userType": "Subbie", "company": "1Tech", "Address": "Mt.Wellington, Auckland", "phone": "02112348678", "email": "richard@test.com" },
];



export default function NewDispatch({ orderDetails, onDispatchSubmitted, onFormDataSubmitted }) {
    // console.log("order Details: ", orderDetails)
    const [selectedReceiver, setSelectedReceiver] = useState('Shona');
    const [receiverData, setReceiverData] = useState({
        receiverName: 'User',
        companyName: 'Company A',
        Address: 'Address A',
        phone: '123-456-7890',
        email: 'user@example.com',
    });

    const [tableRowsData, setTableRowsData] = useState([
        {
            id: 1,
            qty: 1,
            cs: '',
            ItemName: 'Beacon',
            serial: '20001001',
        },
    ]);

    const [items, setItems] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        Auth.currentSession()
            .then(session => {
                const token = session.getAccessToken().getJwtToken();

                const apiUrl = 'http://localhost:8080/api/item';
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
                        setItems(dispatch);
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

    const handleReceiverChange = (event) => {
        const selectedReceiverName = event.target.value;
        setSelectedReceiver(selectedReceiverName);

        const selectedStaff = Staffs.find((staff) => staff.name === selectedReceiverName);

        setReceiverData({
            companyName: selectedStaff.company,
            Address: selectedStaff.Address,
            phone: selectedStaff.phone,
            email: selectedStaff.email,
        });
    };

    const addRow = () => {
        const newRow = {
            id: tableRowsData.length + 1,
            qty: 1,
            cs: '',
            ItemName: '',
            serial: '',
        };
        setTableRowsData([...tableRowsData, newRow]);
    };

    const handleTableRowChange = (event, rowIndex, fieldName) => {
        const updatedRows = [...tableRowsData];
        const newValue = event.target.value;

        // Update the CS# value in the specific row
        updatedRows[rowIndex][fieldName] = newValue;

        // If the field being updated is CS#, update ItemName and serial based on the new CS# value
        if (fieldName === 'cs') {
            const Item = items.find((Item) => Item.itemId === newValue);
            if (Item) {
                updatedRows[rowIndex].ItemName = Item.productName;
                updatedRows[rowIndex].serial = Item.serialNo;
            }
        }

        setTableRowsData(updatedRows);
    };

    const gatherFormData = () => {
        const formData = {
            orderId: orderDetails.orderId,
            userName: selectedReceiver,
            userId: receiverData.userId,
            status: "completed",
            companyName: receiverData.companyName,
            address: receiverData.Address,
            phone: receiverData.phone,
            email: receiverData.email,
            tracking: document.getElementById('tracking').value,
            tableRows: tableRowsData,
        };
        return formData;
    };

    const handleSubmit = () => {
        const formData = gatherFormData();
        console.log(formData);
        // Call the function to pass the formData to the parent component
    onFormDataSubmitted(formData);
        onDispatchSubmitted();
    };

    return (
        <>
        {
            items && (<div style={{ margin: "10px" }}>
            <h3 style={{ marginBottom: "20px" }}>Dispatch Form</h3>
            <div id='receivers-details' style={{ marginTop: "20px" }}>
                <Box sx={{ display: 'flex', flexWrap: 'wrap' }}>
                    <div>
                        <TextField
                            sx={{ m: 1, width: '40%' }}
                            id="receiver-name"
                            select
                            label="Receiver's Name"
                            value={selectedReceiver}
                            onChange={handleReceiverChange}
                        >
                            {Staffs.map((staff) => (
                                <MenuItem key={staff.name} value={staff.name}>
                                    {staff.name}
                                </MenuItem>
                            ))}
                        </TextField>
                        <TextField
                            sx={{ m: 1, width: '50%' }}
                            id="company-name"
                            label="Company Name"
                            value={receiverData.companyName}
                            InputProps={{
                                readOnly: true,
                            }}
                        />
                        <TextField
                            sx={{ m: 1, width: '91.5%' }}
                            id="address"
                            label="Address"
                            value={receiverData.Address}
                            InputProps={{
                                readOnly: true,
                            }}
                        />
                        <TextField
                            sx={{ m: 1, width: '40%' }}
                            id="phone"
                            label="Phone"
                            value={receiverData.phone}
                            InputProps={{
                                readOnly: true,
                            }}
                        />
                        <TextField
                            sx={{ m: 1, width: '50%' }}
                            id="email"
                            label="Email"
                            value={receiverData.email}
                            InputProps={{
                                readOnly: true,
                            }}
                        />
                        <TextField
                            sx={{ m: 1, width: '91.5%' }}
                            required
                            id="tracking"
                            label="Tracking#"
                            defaultValue=""
                            variant="standard"
                        />
                    </div>
                </Box>
            </div>
            <Divider style={{ marginTop: "10px", marginBottom: "10px" }}></Divider>
            <h5>Item</h5>
            <TableContainer>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell style={{ width: "10%", textAlign: "center" }}>#</TableCell>
                            <TableCell style={{ width: "10%", textAlign: "center" }}>QTY</TableCell>
                            <TableCell style={{ width: "25%", textAlign: "center" }}>CS#</TableCell>
                            <TableCell style={{ width: "30%", textAlign: "center" }}>Item Name</TableCell>
                            <TableCell style={{ width: "25%", textAlign: "center" }}>Serial#</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {tableRowsData.map((row, index) => (
                            <TableRow key={row.id}>
                                <TableCell style={{ width: '10%', textAlign: 'center' }}>{row.id}</TableCell>
                                <TableCell style={{ width: '10%', textAlign: 'center' }}>
                                    <TextField
                                        id={`qty-${row.id}`}
                                        size="small"
                                        value={row.qty}
                                    />
                                </TableCell>
                                <TableCell style={{ width: '25%', textAlign: 'center' }}>
                                    <TextField
                                        id={`cs-${row.id}`}
                                        size="small"
                                        value={row.cs}
                                        onChange={(e) => handleTableRowChange(e, index, 'cs')}
                                    />
                                </TableCell>
                                <TableCell style={{ width: '30%', textAlign: 'center' }}>{row.ItemName}</TableCell>
                                <TableCell style={{ width: '25%', textAlign: 'center' }}>
                                    <TextField
                                        id={`serial-${row.id}`}
                                        size="small"
                                        value={row.serial}
                                    />
                                </TableCell>
                            </TableRow>
                        ))}
                        <TableRow>
                            <TableCell colSpan={5}>
                                <Button variant="contained" style={{ width: '100%' }} onClick={addRow}>+</Button>
                            </TableCell>
                        </TableRow>
                    </TableBody>

                </Table>
            </TableContainer>

            <Divider style={{ marginTop: "10px", marginBottom: "10px" }}></Divider>

            <div style={{ margin: '5px', display: 'flex', justifyContent: 'flex-end', }}>
                <Button id='submit' variant='contained' color='primary' onClick={handleSubmit}>Submit</Button>
            </div>
        </div>)
        }
            
        </>
    );
}