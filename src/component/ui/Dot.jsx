import React from 'react'
import "./Dot.css"

const Dot = ({ margin, size, color }) => {

    return (
        <div className="dot-wrapper" style={{ width: size, height: size, marginTop: margin }}>
            <span className="circle1" style={{ width: size, height: size }}></span>
            <span className="circle2" style={{ width: size, height: size }}></span>
            <span className="circle3" style={{ width: size, height: size }}></span>
        </div>
    )
}

export default Dot