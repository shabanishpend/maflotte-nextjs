"use client";

import { useEffect, useRef, useState } from "react";
import GoogleMap from "./GoogleMap";
import fetchApi from "@/requests";

export type ContactContent = {
  left: {
    addressTitle: string; // "Adresse" / "Adresse"
    addressLines: string[]; // lignes déjà mises en forme (avec <br/> implicite)
    phoneTitle: string; // "Téléphone" / "Telefon"
    phoneDisplay: string; // "+41 21 211 26 22"
  };
  form: {
    title: string; // "Contactez-nous" / "Kontaktieren Sie uns"
    placeholders: {
      name: string; // "Nom et Prénom" / "Name"
      company: string; // "Société" / "Firma"
      email: string; // "E-mail" / "E-Mail"
      phone: string; // "Téléphone" / "Telefon"
      address: string; // "Adresse" / "Adresse"
      fleetSize: string; // "Nb de véhicules à équiper" / "Anzahl Fahrzeuge"
      message: string; // "Message" / "Nachricht"
    };
    submitLabel: string; // "Envoyer" / "Senden"
    submittingLabel: string; // "Envoi en cours..." / "Wird gesendet..."
    successMsg: string; // (si tu gères le submit plus tard)
    errorMsg: string;
    validation: {
      nameRequired: string;
      emailRequired: string;
      emailInvalid: string;
      messageRequired: string;
    };
    modal: {
      success: {
        title: string;
        message: string;
      };
      error: {
        title: string;
        message: string;
      };
    };
  };
  map: {
    lat: number;
    lng: number;
    title: string; // "GVA Group SA"
    zoom?: number; // 15 par défaut
  };
};

type FormData = {
  name: string;
  societe: string;
  email: string;
  phone: string;
  address: string;
  nr_cars: string;
  message: string;
  my_honeypot: string;
};

type ModalContent = {
  title: string;
  message: string;
};

export default function Contact({ content }: { content: ContactContent }) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [modalContent, setModalContent] = useState<ModalContent>({ title: "", message: "" });
  
  // Form state
  const [formData, setFormData] = useState<FormData>({
    name: "",
    societe: "",
    email: "",
    phone: "",
    address: "",
    nr_cars: "",
    message: "",
    my_honeypot: "", // Hidden field for bot protection
  });

  // Form validation errors
  const [errors, setErrors] = useState<Partial<FormData>>({});
  // Track which fields have been touched for more professional validation
  const [touched, setTouched] = useState<Partial<FormData>>({});
  // Track if form has been submitted to show validation
  const [hasSubmitted, setHasSubmitted] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => entry.isIntersecting && setVisible(true),
      { threshold: 0.3 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const validateForm = (): boolean => {
    const newErrors: Partial<FormData> = {};
    
    if (!formData.name.trim()) {
      newErrors.name = content.form.validation.nameRequired;
    }
    
    if (!formData.email.trim()) {
      newErrors.email = content.form.validation.emailRequired;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = content.form.validation.emailInvalid;
    }
    
    if (!formData.message.trim()) {
      newErrors.message = content.form.validation.messageRequired;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const shouldShowError = (field: keyof FormData): boolean => {
    return hasSubmitted || touched[field] ? !!errors[field] : false;
  };

  const handleInputChange = (field: keyof FormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // Mark field as touched
    setTouched(prev => ({ ...prev, [field]: true }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: undefined }));
    }
  };

  const handleInputBlur = (field: keyof FormData) => {
    setTouched(prev => ({ ...prev, [field]: true }));
  };

  const getModalContent = (isSuccess: boolean) => {
    if (isSuccess) {
      return content.form.modal.success;
    } else {
      return content.form.modal.error;
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setHasSubmitted(true);
    
    if (!validateForm()) {
      return;
    }

    // Check honeypot - if filled, it's likely a bot
    if (formData.my_honeypot) {
      return; // Silently ignore bot submissions
    }

    setIsSubmitting(true);

    try {
      const response = await fetchApi<{ status: boolean }>('https://maflotte.ch/api/contact/send', {
        method: 'POST',
        body: {
          name: formData.name,
          societe: formData.societe,
          email: formData.email,
          phone: formData.phone,
          address: formData.address,
          nr_cars: formData.nr_cars,
          message: formData.message,
          my_honeypot: formData.my_honeypot,
        },
      });

      if (response.error) {
        throw new Error(response.error);
      }

      const isSuccess = response.data?.status === true;
      
      setModalContent(getModalContent(isSuccess));
      setShowModal(true);

      if (isSuccess) {
        // Reset form on success
        setFormData({
          name: "",
          societe: "",
          email: "",
          phone: "",
          address: "",
          nr_cars: "",
          message: "",
          my_honeypot: "",
        });
        // Reset validation states
        setTouched({});
        setErrors({});
        setHasSubmitted(false);
      }
    } catch (error) {
      setModalContent(getModalContent(false));
      setShowModal(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="scroll-mt-28 w-full bg-white overflow-hidden scroll-offset"
    >
      <div className="flex flex-col md:flex-row w-full">
        {/* Colonne gauche : Adresse + Carte */}
        <div
          className={`relative w-full md:w-1/2 border-r border-zinc-300 px-8 py-12 flex flex-col items-center md:items-end justify-center text-center md:text-right overflow-hidden min-h-[400px] transition-all duration-700 ease-out ${
            visible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-12"
          }`}
        >
          <div className="relative z-10 bg-white/30 backdrop-blur-sm p-4 rounded-lg border border-white text-left w-fit space-y-6">
            <div>
              <h3 className="text-3xl md:text-5xl font-bold text-slate-700 mb-4">
                {content.left.addressTitle}
              </h3>
              <p className="text-neutral-500 text-base leading-relaxed">
                {content.left.addressLines.map((line, i) => (
                  <span key={i}>
                    {line}
                    <br />
                  </span>
                ))}
              </p>
            </div>
            <div>
              <h3 className="text-3xl md:text-5xl font-bold text-slate-700 mb-2">
                {content.left.phoneTitle}
              </h3>
              <p className="text-neutral-400 text-2xl md:text-4xl font-semibold">
                {content.left.phoneDisplay}
              </p>
            </div>
          </div>

          {/* Carte dynamique */}
          <div className="hidden md:block w-full h-[300px] mt-8 relative">
            <GoogleMap
              lat={content.map.lat}
              lng={content.map.lng}
              title={content.map.title}
              zoom={content.map.zoom ?? 15}
            />
          </div>
        </div>

        {/* Colonne droite : Formulaire */}
        <div
          className={`w-full md:w-1/2 px-8 py-12 flex flex-col items-center justify-center text-left transition-all duration-700 ease-out ${
            visible
              ? "opacity-100 translate-x-0 delay-300"
              : "opacity-0 translate-x-12"
          }`}
        >
          <div className="w-full bg-sky-100 px-6 py-10 rounded-xl shadow max-w-2xl">
            <h2 className="text-3xl md:text-5xl font-bold text-slate-700 text-center mb-8">
              {content.form.title}
            </h2>

            <form
              className="space-y-4 text-stone-500/70 font-medium"
              onSubmit={handleSubmit}
            >
              {/* Honeypot field - hidden from users */}
              <input
                type="text"
                name="my_honeypot"
                value={formData.my_honeypot}
                onChange={(e) => handleInputChange('my_honeypot', e.target.value)}
                style={{ display: 'none' }}
                tabIndex={-1}
                autoComplete="off"
              />

              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1">
                  <input
                    type="text"
                    placeholder={content.form.placeholders.name}
                    value={formData.name}
                    onChange={(e) => handleInputChange('name', e.target.value)}
                    onBlur={() => handleInputBlur('name')}
                    className={`w-full px-4 py-3 border rounded-md bg-white transition-colors ${
                      shouldShowError('name') ? 'border-red-500' : 'border-gray-400 focus:border-slate-500'
                    }`}
                    
                  />
                  {shouldShowError('name') && (
                    <p className="text-red-500 text-sm mt-1">{errors.name}</p>
                  )}
                </div>
                <div className="flex-1">
                  <input
                    type="text"
                    placeholder={content.form.placeholders.company}
                    value={formData.societe}
                    onChange={(e) => handleInputChange('societe', e.target.value)}
                    className="w-full px-4 py-3 border border-gray-400 rounded-md bg-white"
                  />
                </div>
              </div>

              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1">
                  <input
                    type="email"
                    placeholder={content.form.placeholders.email}
                    value={formData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    onBlur={() => handleInputBlur('email')}
                    className={`w-full px-4 py-3 border rounded-md bg-white transition-colors ${
                      shouldShowError('email') ? 'border-red-500' : 'border-gray-400 focus:border-slate-500'
                    }`}
                    
                  />
                  {shouldShowError('email') && (
                    <p className="text-red-500 text-sm mt-1">{errors.email}</p>
                  )}
                </div>
                <div className="flex-1">
                  <input
                    type="tel"
                    placeholder={content.form.placeholders.phone}
                    value={formData.phone}
                    onChange={(e) => handleInputChange('phone', e.target.value)}
                    className="w-full px-4 py-3 border border-gray-400 rounded-md bg-white"
                  />
                </div>
              </div>

              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1">
                  <input
                    type="text"
                    placeholder={content.form.placeholders.address}
                    value={formData.address}
                    onChange={(e) => handleInputChange('address', e.target.value)}
                    className="w-full px-4 py-3 border border-gray-400 rounded-md bg-white"
                  />
                </div>
                <div className="flex-1">
                  <input
                    type="number"
                    placeholder={content.form.placeholders.fleetSize}
                    value={formData.nr_cars}
                    onChange={(e) => handleInputChange('nr_cars', e.target.value)}
                    className="w-full px-4 py-3 border border-gray-400 rounded-md bg-white"
                    min="0"
                  />
                </div>
              </div>

              <div>
                <textarea
                  placeholder={content.form.placeholders.message}
                  value={formData.message}
                  onChange={(e) => handleInputChange('message', e.target.value)}
                  onBlur={() => handleInputBlur('message')}
                  className={`w-full px-4 py-3 h-32 border rounded-md bg-white resize-none transition-colors ${
                    shouldShowError('message') ? 'border-red-500' : 'border-gray-400 focus:border-slate-500'
                  }`}
                  
                />
                {shouldShowError('message') && (
                  <p className="text-red-500 text-sm mt-1">{errors.message}</p>
                )}
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className={`w-full py-4 text-white text-2xl font-medium rounded-lg transition ${
                  isSubmitting
                    ? 'bg-gray-400 cursor-not-allowed'
                    : 'bg-slate-700 hover:bg-slate-800'
                }`}
              >
                {isSubmitting ? content.form.submittingLabel : content.form.submitLabel}
              </button>
            </form>
          </div>
        </div>
      </div>
      <hr className="border-stone-200 border-t-2" />

      {/* Success/Error Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-[rgba(0,0,0,0.5)] flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full p-6">
            <div className="text-center">
              <div className={`mx-auto flex items-center justify-center h-12 w-12 rounded-full mb-4 ${
                modalContent.title.includes('Réussi') || modalContent.title.includes('Successful') || modalContent.title.includes('Erfolgreich')
                  ? 'bg-green-100' 
                  : 'bg-red-100'
              }`}>
                {modalContent.title.includes('Réussi') || modalContent.title.includes('Successful') || modalContent.title.includes('Erfolgreich') ? (
                  <svg className="h-6 w-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                ) : (
                  <svg className="h-6 w-6 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                )}
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                {modalContent.title}
              </h3>
              <p className="text-sm text-gray-500 mb-6">
                {modalContent.message}
              </p>
              <button
                onClick={() => setShowModal(false)}
                className="w-full bg-slate-700 text-white py-2 px-4 rounded-md hover:bg-slate-800 transition"
              >
                OK
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
