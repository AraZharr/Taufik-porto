const About = ({ data }) => {
  if (!data) return null;

  return (
    <section id="about" className="py-20 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-12">
          About Me
        </h2>

        <div className="flex flex-col md:flex-row items-center gap-12">
          <div className="flex-shrink-0">
            <div className="w-64 h-64 rounded-lg overflow-hidden shadow-lg">
              <img
                src={`http://localhost:5000/${data.image}`}
                alt="About"
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.target.src = 'https://via.placeholder.com/400?text=About';
                }}
              />
            </div>
          </div>

          <div className="flex-1">
            <p className="text-lg text-gray-600 leading-relaxed mb-6 whitespace-pre-line">
              {data.description}
            </p>
            {data.extraInfo && (
              <p className="text-md text-primary-600 font-medium">
                {data.extraInfo}
              </p>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
