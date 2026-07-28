import "./Marquee.css";

const Marquee = ({ items }) => {
  return (
    <div className="marquee-wrapper">
      <div className="marquee-track">
        {items.map((item, idx) => (
          <div key={`item-1-${idx}`} className="marquee-item">
            {item}
          </div>
        ))}
        {/* Duplicate items for seamless continuous looping */}
        {items.map((item, idx) => (
          <div key={`item-2-${idx}`} className="marquee-item">
            {item}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Marquee;
