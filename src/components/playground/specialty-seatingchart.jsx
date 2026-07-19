import React from "react";

const MANIFEST = {
  "type": "Specialty.SeatingChart",
  "description": "Interactive seating chart with seat selection, availability status, and legend",
  "editorElement": {
    "selector": ".seating-chart",
    "displayName": "Seating Chart",
    "archetype": "container",
    "data": {
      "rows": {
        "dataType": "select",
        "displayName": "Number of Rows",
        "defaultValue": "8",
        "options": ["6", "8", "10", "12"],
        "group": "Layout"
      },
      "seatsPerRow": {
        "dataType": "select",
        "displayName": "Seats Per Row",
        "defaultValue": "10",
        "options": ["8", "10", "12", "14"],
        "group": "Layout"
      },
      "aisleAfterSeat": {
        "dataType": "select",
        "displayName": "Aisle After Seat",
        "defaultValue": "5",
        "options": ["4", "5", "6", "7"],
        "group": "Layout"
      },
      "backgroundColor": {
        "dataType": "color",
        "displayName": "Background Color",
        "defaultValue": "#FFFFFF",
        "group": "Colors"
      },
      "textColor": {
        "dataType": "color",
        "displayName": "Text Color",
        "defaultValue": "#18181B",
        "group": "Colors"
      },
      "availableColor": {
        "dataType": "color",
        "displayName": "Available Seat Color",
        "defaultValue": "#10B981",
        "group": "Colors"
      },
      "selectedColor": {
        "dataType": "color",
        "displayName": "Selected Seat Color",
        "defaultValue": "#3B82F6",
        "group": "Colors"
      },
      "occupiedColor": {
        "dataType": "color",
        "displayName": "Occupied Seat Color",
        "defaultValue": "#9CA3AF",
        "group": "Colors"
      },
      "accentColor": {
        "dataType": "color",
        "displayName": "Accent Color",
        "defaultValue": "#495057",
        "group": "Colors"
      }
    },
    "layout": {
      "resizeDirection": "horizontalAndVertical",
      "contentResizeDirection": "vertical"
    }
  }
};

function Component({ config = {} }) {
  const rows = parseInt(config?.rows || '8');
  const seatsPerRow = parseInt(config?.seatsPerRow || '10');
  const aisleAfterSeat = parseInt(config?.aisleAfterSeat || '5');
  const backgroundColor = config?.backgroundColor || '#FFFFFF';
  const textColor = config?.textColor || '#18181B';
  const availableColor = config?.availableColor || '#10B981';
  const selectedColor = config?.selectedColor || '#3B82F6';
  const occupiedColor = config?.occupiedColor || '#9CA3AF';
  const accentColor = config?.accentColor || '#495057';
  
  const generateInitialSeats = () => {
    const seats = {};
    for (let row = 0; row < rows; row++) {
      for (let seat = 0; seat < seatsPerRow; seat++) {
        const seatId = `${String.fromCharCode(65 + row)}${seat + 1}`;
        const random = Math.random();
        seats[seatId] = random > 0.7 ? 'occupied' : 'available';
      }
    }
    return seats;
  };
  
  const [seatStatus, setSeatStatus] = React.useState(generateInitialSeats());
  const [selectedSeats, setSelectedSeats] = React.useState([]);
  
  const handleSeatClick = (seatId) => {
    if (seatStatus[seatId] === 'occupied') return;
    
    if (selectedSeats.includes(seatId)) {
      setSelectedSeats(selectedSeats.filter(s => s !== seatId));
    } else {
      setSelectedSeats([...selectedSeats, seatId]);
    }
  };
  
  const getSeatColor = (seatId) => {
    if (seatStatus[seatId] === 'occupied') return occupiedColor;
    if (selectedSeats.includes(seatId)) return selectedColor;
    return availableColor;
  };
  
  const getSeatCursor = (seatId) => {
    return seatStatus[seatId] === 'occupied' ? 'not-allowed' : 'pointer';
  };
  
  const totalSelected = selectedSeats.length;
  const pricePerSeat = 25;
  const totalPrice = totalSelected * pricePerSeat;
  
  return (
    <div style={{
      width: '100%',
      minHeight: '100vh',
      backgroundColor: backgroundColor,
      padding: '40px 20px',
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
    }}>
      <div style={{
        maxWidth: '900px',
        margin: '0 auto'
      }}>
        <h1 style={{
          fontSize: '32px',
          fontWeight: '500',
          color: textColor,
          textAlign: 'center',
          marginBottom: '8px',
          letterSpacing: '-0.02em'
        }}>
          Select Your Seats
        </h1>
        <p style={{
          textAlign: 'center',
          color: accentColor,
          fontSize: '16px',
          marginBottom: '32px'
        }}>
          Click on available seats to select
        </p>
        
        <div style={{
          backgroundColor: `${accentColor}08`,
          padding: '40px 20px',
          borderRadius: '12px',
          marginBottom: '24px'
        }}>
          <div style={{
            backgroundColor: `${accentColor}20`,
            padding: '12px',
            borderRadius: '8px',
            textAlign: 'center',
            marginBottom: '32px',
            fontSize: '14px',
            fontWeight: '500',
            color: textColor
          }}>
            SCREEN
          </div>
          
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '12px',
            alignItems: 'center'
          }}>
            {Array.from({ length: rows }, (_, rowIndex) => (
              <div key={rowIndex} style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px'
              }}>
                <div style={{
                  width: '30px',
                  fontSize: '14px',
                  fontWeight: '500',
                  color: accentColor,
                  textAlign: 'right'
                }}>
                  {String.fromCharCode(65 + rowIndex)}
                </div>
                
                <div style={{
                  display: 'flex',
                  gap: '8px'
                }}>
                  {Array.from({ length: seatsPerRow }, (_, seatIndex) => {
                    const seatId = `${String.fromCharCode(65 + rowIndex)}${seatIndex + 1}`;
                    const isAisle = seatIndex === aisleAfterSeat - 1;
                    
                    return (
                      <React.Fragment key={seatIndex}>
                        <div
                          onClick={() => handleSeatClick(seatId)}
                          style={{
                            width: '32px',
                            height: '32px',
                            backgroundColor: getSeatColor(seatId),
                            borderRadius: '6px 6px 2px 2px',
                            cursor: getSeatCursor(seatId),
                            transition: 'all 200ms ease-out',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            fontSize: '10px',
                            color: '#FFFFFF',
                            fontWeight: '500',
                            opacity: seatStatus[seatId] === 'occupied' ? 0.5 : 1
                          }}
                          onMouseEnter={(e) => {
                            if (seatStatus[seatId] !== 'occupied') {
                              e.currentTarget.style.transform = 'scale(1.1)';
                            }
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.transform = 'scale(1)';
                          }}
                        >
                          {selectedSeats.includes(seatId) && '✓'}
                        </div>
                        {isAisle && <div style={{ width: '16px' }} />}
                      </React.Fragment>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>
        
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          gap: '24px',
          marginBottom: '24px',
          flexWrap: 'wrap'
        }}>
          {[
            { label: 'Available', color: availableColor },
            { label: 'Selected', color: selectedColor },
            { label: 'Occupied', color: occupiedColor }
          ].map((item) => (
            <div key={item.label} style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px'
            }}>
              <div style={{
                width: '24px',
                height: '24px',
                backgroundColor: item.color,
                borderRadius: '4px'
              }} />
              <span style={{ fontSize: '14px', color: textColor }}>
                {item.label}
              </span>
            </div>
          ))}
        </div>
        
        {totalSelected > 0 && (
          <div style={{
            backgroundColor: selectedColor,
            color: '#FFFFFF',
            padding: '20px',
            borderRadius: '12px',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center'
          }}>
            <div>
              <div style={{ fontSize: '14px', opacity: 0.9, marginBottom: '4px' }}>
                Selected Seats: {selectedSeats.join(', ')}
              </div>
              <div style={{ fontSize: '24px', fontWeight: '500' }}>
                ${totalPrice}
              </div>
            </div>
            <button style={{
              padding: '12px 24px',
              backgroundColor: '#FFFFFF',
              color: selectedColor,
              border: 'none',
              borderRadius: '8px',
              fontSize: '16px',
              fontWeight: '500',
              cursor: 'pointer',
              transition: 'transform 200ms ease-out'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'scale(1.05)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'scale(1)';
            }}>
              Continue
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export { MANIFEST, Component };
export default Component;
