import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import { Divider } from '@mui/material';

export default function AddProduct() {

    const form = {
        
    }

        return (
            <>
                <Form>

                    <Form.Group as={Row} className="mb-3" controlId="formHorizontalId">
                        <Form.Label column sm={2}>ID</Form.Label>
                        <Col sm={10}>
                            <Form.Control type="text" placeholder="ID" />
                        </Col>
                    </Form.Group>

                    <Form.Group as={Row} className="mb-3" controlId="formHorizontalName">
                        <Form.Label column sm={2}>Name</Form.Label>
                        <Col sm={10}>
                            <Form.Control type="text" placeholder="Name" />
                        </Col>
                    </Form.Group>

                    <Form.Group as={Row} className="mb-3" controlId="formHorizontalDesc">
                        <Form.Label column sm={2}>Descp</Form.Label>
                        <Col sm={10}>
                            <Form.Control type="text" placeholder="Description" />
                        </Col>
                    </Form.Group>

                    <Form.Group as={Row} className="mb-3" controlId="formHorizontalImage">
                        <Form.Label column sm={2}>Image</Form.Label>
                        <Col sm={10}>
                            <Form.Control type="file" placeholder="Image" />
                        </Col>
                    </Form.Group>
                    <Divider style={{marginBottom:"10px"}}></Divider>
                    <div style={{margin: "5px", display: "flex", justifyContent:"flex-end"}}>
                    <Button variant="primary" type="submit">
                        Submit
                    </Button>
                    </div>
                    
                </Form>
            </>
        )
}