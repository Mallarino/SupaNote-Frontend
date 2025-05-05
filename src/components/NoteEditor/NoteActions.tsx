import { Dropdown } from "react-bootstrap";

type Props = {
  isEditing: boolean;
  onEdit: () => void;
  onDelete: () => void;
};

const NoteActions: React.FC<Props> = ({ isEditing, onEdit, onDelete }) => {
  return (
    <div style={{ position: "absolute", top: 10, right: 10 }}>
      {isEditing ? (
        <i
          className="bi bi-check-circle-fill"
          style={{ cursor: "pointer", fontSize: "20px" }}
          onClick={onEdit}
          title="Guardar"
        ></i>
      ) : (
        <Dropdown>
          <Dropdown.Toggle variant="link" style={{ padding: 0 }}>
            <i className="bi bi-three-dots-vertical text-dark" style={{ fontSize: "20px" }}></i>
          </Dropdown.Toggle>
          <Dropdown.Menu>
            <Dropdown.Item onClick={onEdit}>Editar</Dropdown.Item>
            <Dropdown.Item onClick={onDelete}>Eliminar</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      )}
    </div>
  );
};

export default NoteActions;
