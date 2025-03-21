import {
  faBars,
  faClipboard,
  faFileDownload,
  faFileUpload,
  faRefresh,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { FC, useState } from "react";
import { useAppStore } from "../store/appStore";
import ExportFileModal from "./ExportFileModal";
import ImportFileModal from "./ImportFileModal";
import LogModal from "./LogModal";
import SampleFileReloadModal from "./SampleFileReloadModal";
import Drawer from "./ui/Drawer";

export type NavBarProps = {
  onReloadClick: () => void;
};

const NavBar: FC<NavBarProps> = (props: NavBarProps) => {
  const { onReloadClick } = props;
  const { useMobileWidth } = useAppStore();

  const [showExportModal, setShowExportModal] = useState(false);
  const [showImportModal, setShowImportModal] = useState(false);
  const [showSampleFileReloadModal, setShowSampleFileReloadModal] =
    useState(false);
  const [showLogModal, setShowLogModal] = useState(false);

  return (
    <>
      {showExportModal && (
        <ExportFileModal onModalClose={() => setShowExportModal(false)} />
      )}

      {showImportModal && (
        <ImportFileModal onModalClose={() => setShowImportModal(false)} />
      )}

      {showSampleFileReloadModal && (
        <SampleFileReloadModal
          onReloadClick={onReloadClick}
          onModalClose={() => setShowSampleFileReloadModal(false)}
        />
      )}

      {showLogModal && <LogModal onModalClose={() => setShowLogModal(false)} />}

      <div
        className={`grid grid-flow-col bg-primary p-2 text-xl top-0 left-0 right-0 z-[999] border-b ${
          !useMobileWidth && "fixed"
        }`}
      >
        <div className="font-bold text-white">Ximple Workout Tracker</div>
        <div className="text-end">
          <Drawer
            id="header-drawer"
            openButtonText={<FontAwesomeIcon icon={faBars} />}
          >
            <ul className="text-white text-lg divide-y divide-white">
              <li>
                <button onClick={() => setShowExportModal(true)}>
                  <FontAwesomeIcon icon={faFileDownload} />
                  <span className="btm-nav-label pl-1">Export File</span>
                </button>
              </li>

              <li>
                <button onClick={() => setShowImportModal(true)}>
                  <FontAwesomeIcon icon={faFileUpload} />
                  <span className="btm-nav-label pl-1">Import File</span>
                </button>
              </li>

              <li>
                <button onClick={() => setShowSampleFileReloadModal(true)}>
                  <FontAwesomeIcon icon={faRefresh} />
                  <span className="btm-nav-label">Reload Sample File</span>
                </button>
              </li>

              <li>
                <button onClick={() => setShowLogModal(true)}>
                  <FontAwesomeIcon icon={faClipboard} />
                  <span className="btm-nav-label">Log</span>
                </button>
              </li>
            </ul>
          </Drawer>
        </div>
      </div>
    </>
  );
};

export default NavBar;
