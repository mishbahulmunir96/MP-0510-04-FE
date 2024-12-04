const HeroSection = () => {
  return (
    <section className="relative h-[650px] w-full bg-center bg-cover"
    style={{ backgroundImage: "url('/images/event-hero-section.jpg')" }}>
    
      {/* disini nanti ganti carousel yagesyak */}
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-white">
        <div className="max-w-4xl bg-black bg-opacity-80 p-8 rounded-lg">
          <h1 className="text-3xl font-bold mb-4">Pakai carousel yagesyak</h1>
          <p className="text-lg mb-6">
           Lorem ipsum dolor sit amet consectetur adipisicing elit. Culpa tenetur temporibus animi.
          </p>
          <div className="text-sm mb-4">
            <p>
              <strong>tanggal pelaksanaan</strong>
            </p>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Ratione, inventore?
            </p>
            <p>Jam mulai event sampai berakhir</p>
          </div>
          <p className="text-xs">
           Lorem ipsum dolor sit amet consectetur adipisicing elit. Consequuntur, eligendi.
          </p>
          <p className="text-xs">Lorem ipsum dolor sit.</p>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
