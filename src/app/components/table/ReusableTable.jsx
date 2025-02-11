import React from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Button, Stack } from "@mui/material";
import PropTypes from "prop-types";

const ReusableTable = ({
  columns,
  rows,
  pageSize,
  onRowClick,
  loading,
  onEdit,
  onDelete,
}) => {
  // Add the "actions" column with enhanced buttons
  const enhancedColumns = [
    ...columns,
    {
      field: "actions",
      headerName: "Actions",
      width: 180,
      headerAlign: "center", 
      align: "center", 
      renderCell: ({ row }) => (
        <Stack
          direction="row"
          spacing={1}
          sx={{
            justifyContent: "center", 
            alignItems: "center", 
            width: "100%", 
            height: "100%",
          }}
        >
          <Button
            variant="contained"
            color="primary"
            size="small"
            onClick={() => onEdit(row)}
          >
            Edit
          </Button>
          <Button
            variant="outlined"
            color="error"
            size="small"
            onClick={() => onDelete(row)}
          >
            Delete
          </Button>
        </Stack>
      ),
    },
  ];

  return (
    <div style={{ height: 400, width: "100%", padding: "1rem" }}>
      <DataGrid
        rows={rows}
        columns={enhancedColumns}
        pageSize={pageSize}
        rowsPerPageOptions={[5, 10, 20]}
        disableSelectionOnClick
        onRowClick={onRowClick}
        loading={loading}
        checkboxSelection
        getRowId={(row) => row.order_id}
        sx={{
          "& .MuiDataGrid-columnHeaders": {
            fontWeight: "bold",
            textTransform: "uppercase",
          },
          "& .MuiDataGrid-cell": {
            display: "flex", 
            justifyContent: "center", 
            alignItems: "center",
          },
          "& .MuiDataGrid-cellContent": {
            display: "flex", 
            alignItems: "center", 
          },
        }}
      />
    </div>
  );
};

ReusableTable.propTypes = {
  columns: PropTypes.arrayOf(
    PropTypes.shape({
      field: PropTypes.string.isRequired,
      headerName: PropTypes.string.isRequired,
      width: PropTypes.number,
    })
  ).isRequired,
  rows: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    })
  ).isRequired,
  pageSize: PropTypes.number,
  onRowClick: PropTypes.func,
  loading: PropTypes.bool,
  onEdit: PropTypes.func.isRequired, // Callback for edit
  onDelete: PropTypes.func.isRequired, // Callback for delete
};

ReusableTable.defaultProps = {
  pageSize: 5,
  onRowClick: () => {},
  loading: false,
};

export default ReusableTable;
