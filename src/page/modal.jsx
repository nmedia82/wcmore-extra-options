import Input from "../fields/input";
import Modal from "react-modal";
import { wcmore_create_field_title } from "../common/helper";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import FieldOption from "./options/field-options";
Modal.setAppElement("#wcforce-root");

const customStyles = {
  content: {
    top: "30%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    width: "80%",
  },
};

function FieldModal({
  SelectedField,
  onMetaChange,
  onFieldMetaSave,
  onCloseModal,
  modalMetaOpen,
}) {
  let subtitle;

  const { meta } = SelectedField;

  function afterOpenModal() {
    // references are now sync'd and can be accessed.
    subtitle.style.color = "#000";
    // subtitle.text = SelectedField.label;
  }

  return (
    <Modal
      isOpen={modalMetaOpen}
      onAfterOpen={afterOpenModal}
      onRequestClose={onCloseModal}
      style={customStyles}
      contentLabel="Example Modal"
    >
      {/* {JSON.stringify(SelectedField)} */}
      <header
        className="wcmore-header"
        ref={(_subtitle) => (subtitle = _subtitle)}
      >
        {wcmore_create_field_title(SelectedField)}
      </header>

      <Tabs>
        <TabList>
          <Tab>General Settings</Tab>
          <Tab>Conditions</Tab>
          {SelectedField.type === "options" && <Tab>Options</Tab>}
        </TabList>

        <TabPanel>
          <div className="wcmore-field-meta">
            {meta.map((m, j) => (
              <div key={`meta${j}`}>
                <Input meta={m} onMetaChange={onMetaChange} />
              </div>
            ))}
          </div>
        </TabPanel>
        <TabPanel>
          <h2>Any content 2</h2>
        </TabPanel>

        {SelectedField.type === "options" && (
          <TabPanel>
            <FieldOption meta={meta} />
          </TabPanel>
        )}
      </Tabs>

      {/* <button onClick={closeModal}>Cancel</button> */}
      <button onClick={onFieldMetaSave}>Save & Close</button>
    </Modal>
  );
}

export default FieldModal;
