import ProtectedLayout from "./layout/ProtectedLayout";

export default function Home() {
    return(
        <>
            <ProtectedLayout>
            <div style={{ margin: '10px' }}>
            <h2>Home</h2>
            </div>
            </ProtectedLayout>       
        </>
    )
}