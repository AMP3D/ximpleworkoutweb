import { FC } from "react";
import Alert from "./ui/Alert";

export type ErrorsProps = {
  errors: string[];
};

const Errors: FC<ErrorsProps> = (props) => {
  const { errors } = props;

  return errors?.length ? (
    <Alert title="Error">
      <ul className="pl-5 list-disc">
        {errors.map((error, index) => (
          <li key={`error-${index}`}>{error}</li>
        ))}
      </ul>
    </Alert>
  ) : (
    <></>
  );
};

export default Errors;
