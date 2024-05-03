import { FC } from "react";
import Alert from "./ui/Alert";

export type ErrorsProps = {
  errors: string[];
  onDismiss: () => void;
};

const Errors: FC<ErrorsProps> = (props) => {
  const { errors, onDismiss } = props;

  return errors?.length ? (
    <Alert title="Error" showDismiss={true} onDismiss={onDismiss}>
      <ul className="pl-5 list-disc text-white">
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
