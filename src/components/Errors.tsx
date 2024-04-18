import { FC } from "react";
import Alert from "./ui/Alert";
import { useErrorStore } from "../store";
import { useShallow } from "zustand/react/shallow";

const Errors: FC = () => {
  const { errors } = useErrorStore(
    useShallow((state) => ({
      errors: state.errors,
    }))
  );

  return errors?.length ? (
    <Alert title="Error">{errors.map((error) => error)}</Alert>
  ) : (
    <></>
  );
};

export default Errors;
