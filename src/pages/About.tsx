import MainLayout from "../components/layouts/MainLayout";

const About = () => {
  return (
    <MainLayout>
      <div className="py-8 px-4 md:px-12">
        <h1 className="text-3xl font-bold mb-4">About Us</h1>
        <p className="text-lg">Welcome to our online store!</p>
      </div>
    </MainLayout>
  );
};

export default About;
