import { Auth } from 'aws-amplify';
import { useState, useEffect } from 'react';
import Card from 'react-bootstrap/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import LinearProgress from '@mui/material/LinearProgress';
import ProtectedLayout from '../components/layout/ProtectedLayout';
import DSC_Neo from '../assets/DSC NEO.png';
import SEVEN from '../assets/SEVEN.png';
import GO from '../assets/GO.png';
import Qolsys from '../assets/Qolsys.png';

export default function Products() {
    const [items, setItems] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

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

    return (
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
                <div style={{ margin: '10px' }}>
                    <h2>Products</h2>
                    <div>
                        {uniqueProducts.map((product, index) => (
                            <React.Fragment key={index}>
                                <Card style={{ margin: '10px' }}>
                                    <CardMedia
                                        sx={{ height: 100 }}
                                        image={product.productImg}
                                        title={product.productName}
                                    />
                                    <CardContent>
                                        <Typography gutterBottom variant="h5" component="div">
                                            {product.productName}
                                        </Typography>
                                        <Typography variant="body2" color="text.secondary">
                                            {product.productDesc}
                                        </Typography>
                                    </CardContent>
                                </Card>
                            </React.Fragment>
                        ))}
                    </div>
                </div>
            )}
        </ProtectedLayout>
    );
}
