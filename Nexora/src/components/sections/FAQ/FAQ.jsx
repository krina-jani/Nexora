import Accordion from "../../common/Accordion";
import faq from "../../../data/faq";
import "./FAQ.css";

const FAQ = () => {
  return (
    <section className="faq-section-box">
      <div className="container">
        <h2 className="text-center section-title-reveal" style={{color:"#111"}}>Frequently Asked Questions</h2>
        <Accordion items={faq} />
      </div>
    </section>
  );
};

export default FAQ;
