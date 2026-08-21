import "./Marquee.css";

const Marquee = ({ items }) => {
  const renderItem = (item, key) => {
    const isObject = typeof item === "object" && item !== null;
    const name = isObject ? item.name : item;
    const domain = isObject ? item.domain : null;

    return (
      <div key={key} className="marquee-item">
        {domain && (
          <img
            src={`https://logo.clearbit.com/${domain}`}
            alt={`${name} logo`}
            className="marquee-logo"
            loading="lazy"
            onError={(e) => {
              e.target.style.display = "none";
            }}
          />
        )}
        <span>{name}</span>
      </div>
    );
  };

  return (
    <div className="marquee-wrapper">
      <div className="marquee-track">
        {items.map((item, idx) => renderItem(item, `item-1-${idx}`))}
        {/* Duplicate items for seamless continuous looping */}
        {items.map((item, idx) => renderItem(item, `item-2-${idx}`))}
      </div>
    </div>
  );
};

export default Marquee;
