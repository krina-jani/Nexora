import { useState, useRef } from "react";
import { FaPlus, FaMinus } from "react-icons/fa";
import "./Accordion.css";

const AccordionItem = ({ question, answer, isOpen, onClick }) => {
  const contentRef = useRef(null);

  return (
    <div className={`accordion-item-box glass ${isOpen ? "active" : ""}`}>
      <button className="accordion-trigger" onClick={onClick}>
        <span>{question}</span>
        <span className="accordion-icon">
          {isOpen ? <FaMinus /> : <FaPlus />}
        </span>
      </button>
      <div
        className="accordion-content-wrapper"
        style={{
          height: isOpen ? `${contentRef.current?.scrollHeight}px` : "0px",
        }}
      >
        <div ref={contentRef} className="accordion-content-inner">
          <p>{answer}</p>
        </div>
      </div>
    </div>
  );
};

const Accordion = ({ items }) => {
  const [activeIndex, setActiveIndex] = useState(null);

  const handleToggle = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <div className="accordion-container">
      {items.map((item, idx) => (
        <AccordionItem
          key={item.id || idx}
          question={item.question}
          answer={item.answer}
          isOpen={activeIndex === idx}
          onClick={() => handleToggle(idx)}
        />
      ))}
    </div>
  );
};

export default Accordion;
