import Form from 'react-bootstrap/Form';
import ProtectedLayout from '../components/layout/ProtectedLayout'

export default function Users() {
    return(
        <>
        <ProtectedLayout>
        <h2>Users</h2>
        <Form>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Control type="text" placeholder="Search..." />
                </Form.Group>
            </Form>
        </ProtectedLayout>
        
        </>
    )
}





