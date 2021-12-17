import { useRef, useState } from "react";
import { useSpring, animated } from "@react-spring/web";
import "./Card.css";

const calc = (x, y, rect) => [
    -(y - rect.top - rect.height / 2) / 50,
    (x - rect.left - rect.width / 2) / 50,
    1.2
];

const Card = ({ title, click, image }) => {

    const trans = (x, y, s) =>
        `perspective(600px) rotateX(${x}deg) rotateY(${y}deg) scale(${s})`;

    const ref = useRef(null);
    const [xys, set] = useState([0, 0, 1]);

    const spring = useSpring({ xys });

    console.log(`article:${title}`)

    return (
        <div className={`ccard-main`} ref={ref}>
            <animated.div
                className={`ccard`}
                style={{
                    transform: spring.xys.to(trans),
                }}
                onClick={click}
                onMouseLeave={() => set([0, 0, 1])}
                onMouseMove={(e) => {
                    const rect = ref.current.getBoundingClientRect();
                    set(calc(e.clientX, e.clientY, rect));
                }}
            >
                <div className="title">
                    <h2>{title}</h2>
                </div>
            </animated.div>１
        </div >
    );
}

export default Card;
