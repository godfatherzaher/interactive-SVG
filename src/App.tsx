import { useState } from "react";
import image from "./assets/0-floor.png";
import polygonData from "./assets/data.json";
import PolygonMap from "./components/PolygonMap";

interface PolygonData {
  code: number;
  status: string;
  price: number;
}

function App() {
  const [selectedCode, setSelectedCode] = useState<number | null>(null);
  const [minPrice, setMinPrice] = useState<number>(0);
  const [selectedType, setSelectedType] = useState<string>("all");
  const [mouseX, setMouseX] = useState<number>(0);
  const [mouseY, setMouseY] = useState<number>(0);
  const handleSelect = (code: number) => {
    setSelectedCode(code);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    setMouseX(e.clientX);
    setMouseY(e.clientY);
  };

  // const handleMouseLeave = () => {
  //   setSelectedCode(null);
  // };

  const filteredPolygons = polygonData.filter(
    (item: PolygonData) =>
      item.price >= minPrice &&
      (selectedType === "all" || item.status === selectedType)
  );

  const selectedItem = filteredPolygons.find(
    (item: PolygonData) => item.code === selectedCode
  );

  const filteredCodes = filteredPolygons.map((item) => item.code);

  document.querySelectorAll("polygon").forEach((polygon) => {
    const code = parseInt(polygon.getAttribute("data-code")!, 10);
    if (filteredCodes.includes(code)) {
      polygon.style.display = "block";
    } else {
      polygon.style.display = "none";
    }
  });

  return (
    <div style={{ display: "flex", justifyContent: "center" }}>
      <div style={{ marginRight: "20px", width: "250px" }}>
        <div
          style={{
            backgroundColor: "rgba(10, 10, 10, 0.85)",
            padding: "20px",
            borderRadius: "8px",
            marginBottom: "20px",
            height: "250px",
          }}
        >
          <label
            style={{
              display: "flex",
              alignItems: "center",
              marginTop: "10px",
              justifyContent: "space-evenly",
              position: "relative",
              color: "white",
              gap: "20px",
            }}
          >
            <p
              style={{
                margin: "0",
                padding: "0",
                position: "relative",
              }}
            >
              <span
                style={{
                  position: "absolute",
                  top: "-10px",
                  left: "50%",
                  width: "5px",
                  height: "5px",
                  backgroundColor: "white",
                  borderRadius: "50%",
                }}
              ></span>
              Typy
            </p>
            <select
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
              style={{
                border: "none",
                outline: "none",
                backgroundColor: "transparent",
                appearance: "none",
                color: "gray",
              }}
            >
              <option value="all" style={{ border: "none" }}>
                All
              </option>
              <option value="available" style={{ border: "none" }}>
                Availablility
              </option>
              <option value="reserved" style={{ border: "none" }}>
                Reserved
              </option>
              <option value="sold" style={{ border: "none" }}>
                Sold
              </option>
            </select>
          </label>
          <div
            style={{
              marginTop: "20px",
              marginBottom: "20px",
              borderRadius: "8px",
              overflow: "hidden",
            }}
          >
            <p
              style={{
                backgroundColor: "#23e282",
                textAlign: "center",
                padding: "10px",
                margin: "0px",
                color: "white",
              }}
            >
              Commertical
            </p>
            <p
              style={{
                backgroundColor: "#cc8b2a",
                textAlign: "center",
                padding: "10px",
                margin: "0px",
                color: "white",
              }}
            >
              Adminstrative
            </p>
            <p
              style={{
                backgroundColor: "#2673d6",
                textAlign: "center",
                padding: "10px",
                margin: "0px",
                color: "white",
              }}
            >
              Clinical
            </p>
          </div>
          <label
            style={{
              width: "100%",
            }}
          >
            <div
              style={{
                color: "white",
                display: "flex",
                justifyContent: "space-between",
              }}
            >
              Price: <span>LE {minPrice}.00 - 30.00M</span>
            </div>
            <input
              type="range"
              min="0"
              max="30000"
              step="5"
              value={minPrice}
              onChange={(e) => setMinPrice(Number(e.target.value))}
              style={{ width: "100%" }}
            />
          </label>
        </div>

        {selectedItem && (
          <div
            style={{
              position: "fixed",
              left: mouseX,
              top: mouseY,
               backgroundColor: "rgba(10, 10, 10, 0.85)",
              padding: "20px",
              borderRadius: "8px",
              boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.15)",
              zIndex: 1000,
              cursor: "default",
              fontFamily:"Arial"
          
            }}
          >
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                margin: "0px",
                padding: "0px",
                width:"250px",
                color:"white",
                    
              }}
            >
              <p
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems:"center"
                }}
              >
                <strong>Unit</strong> <span style={{
                  backgroundColor:"#4ecc21",
                  padding:"7px 12px" ,
                  borderRadius:"10px", 
                   textTransform: "capitalize"
                  
                }}>{selectedItem.status}</span>
              </p>
              <p
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                     alignItems:"center"
                }}
              >
                <strong>Unit Type</strong> Commertical
              </p>

              <p
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                     alignItems:"center"
                }}
              >
                <strong>Price</strong> {selectedItem.price} EGP
              </p>
              <button
                onClick={() =>
                  alert(`Callback to ${selectedItem.code}`)
                }
                style={{
                  marginTop: "10px",
                  padding: "10px",
                  backgroundColor: "#3271cc",
                  color: "white",
                  border: "none",
                  borderRadius: "5px",
                  cursor: "pointer",
                }}
              >
                 Callback
              </button>
            </div>
          </div>
        )}
      </div>

      <div
        style={{
          position: "relative",
          width: "600px",
          height: "600px",
          margin: "auto",
        }}
      >
        <img
          style={{
            position: "absolute",
            top: "0",
            left: "0",
            width: "100%",
            height: "100%",
            backgroundColor: "#272727",
            objectFit: "cover",
          }}
          src={image}
          alt="Background"
        />
        <div
          style={{
            position: "absolute",
            top: "0",
            left: "0",
            width: "100%",
            height: "100%",
            objectFit: "cover",
          }}
        >
          <svg
            id="uuid-59b76a1b-abe3-40a4-afca-d4837b2fbc74"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 3950.8 3950.8"
            onMouseMove={handleMouseMove}
          >
            <PolygonMap handleSelect={handleSelect} />
          </svg>
        </div>
      </div>
    </div>
  );
}

export default App;
