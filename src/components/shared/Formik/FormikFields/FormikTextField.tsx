import { TextField, TextFieldProps } from '@mui/material';
import { ErrorMessage, Field, FieldAttributes, FieldProps } from 'formik';

interface FormikTextFieldProps extends FieldAttributes<any> {
  label: string;
  Fn?: (props: any) => any;
}

function FormikTextField({
  name,
  label,
  Fn,
  ...rest
}: FormikTextFieldProps & TextFieldProps) {
  return (
    <div>
      <Field>
        {({ field, form }: FieldProps) => {
          return (
            <>
              <TextField
                value={form.values[name]}
                helperText={
                  form.errors[name] &&
                  form.touched[name] &&
                  `*${form.errors[name]}`
                }
                error={Boolean(form.errors[name] && form.touched[name])}
                label={label}
                id={name}
                onChange={(e) => {
                  form.setFieldValue(name, e.target.value);
                  Fn ? Fn(e.target.value) : null;
                }}
                name={name}
                autoComplete={label}
                {...rest}
                style={{ borderRadius: '50px' }}
              />
            </>
          );
        }}
      </Field>
      {/* <ErrorMessage name={name} /> */}
    </div>
  );
}

export default FormikTextField;
