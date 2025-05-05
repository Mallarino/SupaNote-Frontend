interface ColorMenuProps {
    onColorSelect: (color: string) => void;
  }
  
  export const ColorMenu: React.FC<ColorMenuProps> = ({ onColorSelect }) => {
    const colors = ["#3D7F8E", "#CF6565", "#C5B853"];
  
    return (
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", padding: "10px", marginTop: "10px" }}>
        {colors.map((color) => (
          <div
            key={color}
            onClick={() => onColorSelect(color)}
            style={{ width: "30px", height: "30px", margin: "5px", borderRadius: "50%", backgroundColor: color, cursor: "pointer" }}
          />
        ))}
      </div>
    );
  };
  