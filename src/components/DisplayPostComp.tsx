import { Box } from "@mui/material";
import { useEffect, useState } from "react"
import { DataGrid, GridColDef } from '@mui/x-data-grid';

interface fetchPostType {
    userId: string,
    id: string,
    title: string,
    body: string
}
const DisplayPostComp = () => {
    const [fetchPosts, setFetchPosts] = useState<fetchPostType[]>([]);
    const fetchPostData = async () => {
        const res = await fetch('https://jsonplaceholder.typicode.com/posts');
        const data = await res.json();
        setFetchPosts(data);
    }
    const columns: GridColDef[] = [
        { field: 'id', headerName: 'Id', width: 90 },
        { field: 'userId', headerName: 'User Id', width: 90 },
        {
            field: 'title',
            headerName: 'Title',
            width: 250,
        },
        {
            field: 'body',
            headerName: 'Body',
            width: 350,
        },
    ];



    useEffect(() => {
        fetchPostData();
    }, []);
    return (
        <div>
            {
                fetchPosts.length === 0 ? <h2>Loading...</h2> : <div>
                    <h1>Post Details</h1>
                    <Box sx={{ height: 400, width: '100%' }}>
                        <DataGrid
                            rows={fetchPosts}
                            columns={columns}
                            initialState={{
                                pagination: {
                                    paginationModel: {
                                        pageSize: 5,
                                    },
                                },
                            }}
                            pageSizeOptions={[5]}
                            checkboxSelection
                            disableRowSelectionOnClick
                        />
                    </Box>
                </div>
            }
        </div>
    )
}

export default DisplayPostComp