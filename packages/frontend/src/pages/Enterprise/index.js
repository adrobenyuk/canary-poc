import Header from "../../components/Header";
import Footer from "../../components/Footer";

const Enterprise = () => {
  return (
    <>
      <Header />
      <main>
        <div className="pricing-header p-3 pb-md-4 mx-auto text-center">
          <h1 className="display-4 fw-normal">Enterprise</h1>
          <p className="fs-5 text-muted">
            Vestibulum magna tortor, dignissim ut lacinia at, pharetra non
            purus. Sed interdum purus quis arcu faucibus consectetur. Etiam
            semper, odio a tristique vestibulum, sem leo vulputate velit, sed
            aliquet ex orci ac eros. Donec varius libero ac ultrices efficitur.
            Mauris id consequat felis, non tempor libero. In lobortis rhoncus
            pulvinar. Nullam faucibus lacus eget dolor consectetur ultrices non
            malesuada justo. Maecenas a eros vitae nulla bibendum porttitor a et
            turpis.
          </p>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default Enterprise;
