import React from "react";
import { Formik, Form, FieldArray, Field } from "formik";
import * as Yup from "yup";
import { TextField, MenuItem, IconButton, Button, Box } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

const IGST_OPTIONS = ["0%", "5%", "12%", "18%", "28%"];

const initialValues = {
  items: [
    {
      productName: "",
      sku: "",
      hsn: "",
      qty: "",
      unitPrice: "",
      igst: "0%",
    },
  ],
};

const validationSchema = Yup.object({
  items: Yup.array().of(
    Yup.object({
      productName: Yup.string().required("Required"),
      sku: Yup.string().required("Required"),
      hsn: Yup.string().required("Required"),
      qty: Yup.number()
        .required("Required")
        .positive("Must be positive")
        .integer("Must be an integer"),
      unitPrice: Yup.number().required("Required").positive("Must be positive"),
      igst: Yup.string().required("Required"),
    })
  ),
});

const ItemDetailsForm = () => {
  const handleSubmit = (values) => {
    console.log("Submitted Values:", values);
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      {({ values, errors, touched }) => (
        <Form>
          <h2>Item Details</h2>
          <FieldArray name="items">
            {({ push, remove }) => (
              <>
                {values.items.map((item, index) => (
                  <Box
                    key={index}
                    sx={{
                      display: "flex",
                      gap: 2,
                      marginBottom: 2,
                      alignItems: "center",
                    }}
                  >
                    <Field
                      as={TextField}
                      name={`items[${index}].productName`}
                      label="Product Name"
                      fullWidth
                      error={
                        touched.items?.[index]?.productName &&
                        Boolean(errors.items?.[index]?.productName)
                      }
                      helperText={
                        touched.items?.[index]?.productName &&
                        errors.items?.[index]?.productName
                      }
                    />
                    <Field
                      as={TextField}
                      name={`items[${index}].sku`}
                      label="SKU"
                      fullWidth
                      error={
                        touched.items?.[index]?.sku &&
                        Boolean(errors.items?.[index]?.sku)
                      }
                      helperText={
                        touched.items?.[index]?.sku &&
                        errors.items?.[index]?.sku
                      }
                    />
                    <Field
                      as={TextField}
                      name={`items[${index}].hsn`}
                      label="HSN"
                      fullWidth
                      error={
                        touched.items?.[index]?.hsn &&
                        Boolean(errors.items?.[index]?.hsn)
                      }
                      helperText={
                        touched.items?.[index]?.hsn &&
                        errors.items?.[index]?.hsn
                      }
                    />
                    <Field
                      as={TextField}
                      name={`items[${index}].qty`}
                      label="Qty"
                      type="number"
                      fullWidth
                      error={
                        touched.items?.[index]?.qty &&
                        Boolean(errors.items?.[index]?.qty)
                      }
                      helperText={
                        touched.items?.[index]?.qty &&
                        errors.items?.[index]?.qty
                      }
                    />
                    <Field
                      as={TextField}
                      name={`items[${index}].unitPrice`}
                      label="Unit Price (INR)"
                      type="number"
                      fullWidth
                      error={
                        touched.items?.[index]?.unitPrice &&
                        Boolean(errors.items?.[index]?.unitPrice)
                      }
                      helperText={
                        touched.items?.[index]?.unitPrice &&
                        errors.items?.[index]?.unitPrice
                      }
                    />
                    <Field
                      as={TextField}
                      select
                      name={`items[${index}].igst`}
                      label="IGST"
                      fullWidth
                      error={
                        touched.items?.[index]?.igst &&
                        Boolean(errors.items?.[index]?.igst)
                      }
                      helperText={
                        touched.items?.[index]?.igst &&
                        errors.items?.[index]?.igst
                      }
                    >
                      {IGST_OPTIONS.map((option) => (
                        <MenuItem key={option} value={option}>
                          {option}
                        </MenuItem>
                      ))}
                    </Field>
                    <IconButton
                      onClick={() => remove(index)}
                      color="error"
                      disabled={values.items.length === 1}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </Box>
                ))}
                <Button
                  type="button"
                  variant="contained"
                  onClick={() =>
                    push({
                      productName: "",
                      sku: "",
                      hsn: "",
                      qty: "",
                      unitPrice: "",
                      igst: "0%",
                    })
                  }
                  sx={{
                    backgroundColor: "#add8e6",
                    color: "#000",
                    ":hover": { backgroundColor: "#87CEEB" },
                  }}
                >
                  + Add
                </Button>
              </>
            )}
          </FieldArray>
          <Box sx={{ marginTop: 3 }}>
            <Button type="submit" variant="contained" color="primary">
              Submit
            </Button>
          </Box>
        </Form>
      )}
    </Formik>
  );
};

export default ItemDetailsForm;
