import { DataGrid, GridColDef, GridEventListener  } from '@mui/x-data-grid';
import { useNavigate } from "react-router-dom";
import { useState } from 'react';

interface IProps{
    data: any[];
    component: string;
    columnsParam:GridColDef[];
}

const DataTable:React.FC<IProps>=({data, component, columnsParam}) =>{
    const [columns] = useState<GridColDef[]>(columnsParam);
    const navigate = useNavigate();

    if(data === undefined){
        return (<div className="loader"></div>)
    }
    const handleRowClick = (params) => {
        if(component !== 'user') return;
        navigate(`/users/${params?.row?.login}/details/`);
    };
    return (
        <div>
            <DataGrid
                rows={data}
                columns={columns}
                initialState={{
                    pagination: {
                        paginationModel: { page: 0, pageSize: 5 },
                    },
                }}
                pageSizeOptions={[5, 10]}
                onRowClick={handleRowClick}
            />
        </div>
    );
}
export default DataTable;