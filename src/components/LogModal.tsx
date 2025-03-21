import dayjs from "dayjs";
import { FC, useState } from "react";
import { useSetStore } from "../store";
import Modal from "./ui/Modal";

export type LogModalProps = {
  onModalClose: () => void;
};

const LogModal: FC<LogModalProps> = (props: LogModalProps) => {
  const { lastCompletedSets } = useSetStore();
  const [selectedDate, setSelectedDate] = useState(
    dayjs().format("YYYY-MM-DD")
  );

  // Filter entries for selected date
  const filteredEntries = Object.entries(lastCompletedSets).filter(
    /* eslint-disable-next-line @typescript-eslint/no-unused-vars */
    ([_, entry]) => {
      const entryDate = dayjs(entry).format("YYYY-MM-DD");
      return entryDate === selectedDate;
    }
  );

  return (
    <Modal onModalClose={props.onModalClose} preventDefault={true} title="Log">
      <div className="flex flex-col gap-4">
        <div className="flex justify-center">
          <input
            type="date"
            className="input input-bordered w-full max-w-xs bg-secondary text-primary-content"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
          />
        </div>

        <div className="overflow-x-auto">
          <table className="table w-full">
            <thead>
              <tr className="bg-secondary text-primary-content ">
                <th className="text-base">Exercise</th>
                <th className="text-base">Details</th>
              </tr>
            </thead>
            <tbody>
              {filteredEntries.map(([key, entry], index) => (
                <tr
                  key={index}
                  className={index % 2 === 0 ? "bg-primary" : "bg-secondary"}
                >
                  <td className="font-medium">{key}</td>
                  <td>{entry}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </Modal>
  );
};

export default LogModal;
