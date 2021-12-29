import Header from "../../components/Header";
import Footer from "../../components/Footer";

const Support = () => {
  return (
    <>
      <Header />
      <main>
        <div className="pricing-header p-3 pb-md-4 mx-auto text-center">
          <h1 className="display-4 fw-normal">Support</h1>
          <p className="fs-5 text-muted">
            Donec pharetra interdum dui et egestas. Praesent augue neque,
            viverra vel velit a, posuere ultrices tellus. Praesent maximus
            sapien nec turpis accumsan, sit amet malesuada ante faucibus. Nunc
            pharetra tortor dolor, et venenatis justo scelerisque sed. Morbi
            lacinia dolor erat, non ornare justo eleifend at. Duis vestibulum
            nunc vel ex pretium, et commodo felis blandit. Sed ac metus tellus.
            Sed auctor porttitor quam. Phasellus a metus ac ligula aliquam
            suscipit id in urna. Mauris feugiat sapien vel interdum feugiat.
          </p>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default Support;
