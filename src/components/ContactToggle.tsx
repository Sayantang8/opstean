const WhatsappOnly = () => {
  const openWhatsapp = (e: React.MouseEvent) => {
    e.stopPropagation();
    window.open('https://wa.me/+919474860402', '_blank', 'noopener');
  };

  return (
    <div className="fixed bottom-8 right-8 z-50">
      <button
        onClick={openWhatsapp}
        aria-label="WhatsApp"
        className="w-12 h-12 rounded-full bg-teal shadow-lg flex items-center justify-center text-white hover:scale-105 transition-transform duration-200"
      >
        <img src="/icons/whatsapp.svg" alt="WhatsApp" className="w-6 h-6 filter brightness-0 invert" />
      </button>
    </div>
  );
};

export default WhatsappOnly;
