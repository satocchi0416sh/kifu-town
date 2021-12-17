import React from 'react'
import "./Line.css"

const Line = ({ rotate, weight }) => {
    return (
        <div className="line-wrapper" style={{ transform: `rotate(${rotate}deg)`, marginLeft: "-90vw" }}>
            <div className="line" style={{ borderTop: `${weight}px solid #b0b6bf` }} />
        </div>
    )
}

export default Line
