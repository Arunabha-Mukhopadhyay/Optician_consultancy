// src/pages/Contact/index.jsx — Consultation booking + enquiry form
import { useForm } from 'react-hook-form';
import { motion } from 'framer-motion';
import { FiMapPin, FiPhone, FiMail, FiSend, FiCheckCircle } from 'react-icons/fi';
import { useState } from 'react';
import api from '../../utils/axios';
import toast from 'react-hot-toast';

const SERVICES = [
  'Supply Chain Management', 'Vendor Development', 'Procurement Strategy',
  'Six Sigma', 'Logistics & Distribution', 'Inventory Management', 'ESG Services',
];

export default function Contact() {
  const [submitted, setSubmitted] = useState(false);
  const [bookingRef, setBookingRef] = useState('');
  const { register, handleSubmit, formState: { errors }, reset } = useForm();

  const onSubmit = async (data) => {
    try {
      const res = await api.post('/consultations', data);
      if (res.data.success) {
        setBookingRef(res.data.bookingRef);
        setSubmitted(true);
        reset();
        toast.success('Consultation booked! Check your email for confirmation.');
      }
    } catch (err) {
      toast.error(err.response?.data?.message || 'Booking failed. Please try again.');
    }
  };

  return (
    <>
      {/* Hero */}
      <section className="bg-hero-gradient pt-32 pb-20">
        <div className="container-custom text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Book a Free Consultation</h1>
            <p className="text-blue-100 text-lg max-w-xl mx-auto">
              Tell us about your supply chain challenges. Our experts will reach out within 24 hours with a tailored assessment plan.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="section bg-gray-50 dark:bg-gray-950">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">

            {/* Contact Info */}
            <div className="space-y-6">
              <div>
                <span className="badge-navy mb-3 inline-block">Get in Touch</span>
                <h2 className="text-2xl font-bold text-navy-700 dark:text-white mb-4">Contact Information</h2>
              </div>
              {[
                { icon: <FiMapPin className="w-5 h-5 text-orange-500" />, label: 'Office', value: 'Baner Road, Pune, Maharashtra 411045' },
                { icon: <FiPhone className="w-5 h-5 text-orange-500" />, label: 'Phone', value: '+91 20 1234 5678' },
                { icon: <FiMail className="w-5 h-5 text-orange-500" />, label: 'Email', value: 'info@optichain.in' },
              ].map((item) => (
                <div key={item.label} className="flex gap-4 items-start">
                  <div className="w-10 h-10 rounded-xl bg-orange-50 flex items-center justify-center flex-shrink-0">{item.icon}</div>
                  <div>
                    <p className="text-xs font-semibold uppercase text-gray-400">{item.label}</p>
                    <p className="text-gray-700 dark:text-gray-300 font-medium">{item.value}</p>
                  </div>
                </div>
              ))}

              {/* Business Hours */}
              <div className="card mt-6">
                <h3 className="font-semibold text-navy-700 dark:text-white mb-3">Business Hours</h3>
                <div className="space-y-1 text-sm text-gray-600 dark:text-gray-400">
                  <div className="flex justify-between"><span>Monday – Friday</span><span className="font-medium">9:00 AM – 6:00 PM</span></div>
                  <div className="flex justify-between"><span>Saturday</span><span className="font-medium">10:00 AM – 2:00 PM</span></div>
                  <div className="flex justify-between"><span>Sunday</span><span className="text-gray-400">Closed</span></div>
                </div>
              </div>

              {/* Map placeholder */}
              <div className="h-48 bg-gray-200 dark:bg-gray-800 rounded-xl flex items-center justify-center">
                <div className="text-center text-gray-400">
                  <FiMapPin className="w-8 h-8 mx-auto mb-2" />
                  <p className="text-sm">Baner Road, Pune</p>
                  <p className="text-xs">Maharashtra, India</p>
                </div>
              </div>
            </div>

            {/* Booking Form */}
            <div className="lg:col-span-2">
              {submitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="card text-center py-16"
                >
                  <FiCheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
                  <h2 className="text-2xl font-bold text-navy-700 dark:text-white mb-2">Consultation Booked!</h2>
                  <p className="text-gray-600 dark:text-gray-400 mb-4">
                    Your booking reference is:
                  </p>
                  <div className="inline-block px-8 py-4 bg-orange-50 border-2 border-orange-500 rounded-xl mb-6">
                    <span className="text-3xl font-bold text-orange-500">#{bookingRef}</span>
                  </div>
                  <p className="text-sm text-gray-500 mb-6">
                    A confirmation email has been sent to you. Our team will reach out within 24 hours.
                  </p>
                  <button onClick={() => setSubmitted(false)} className="btn-secondary">Book Another Consultation</button>
                </motion.div>
              ) : (
                <div className="card">
                  <span className="badge-orange mb-3 inline-block">Consultation Booking</span>
                  <h2 className="text-xl font-bold text-navy-700 dark:text-white mb-6 border-b border-gray-100 dark:border-gray-700 pb-4">
                    Schedule Your Free Consultation
                  </h2>
                  <form onSubmit={handleSubmit(onSubmit)} className="space-y-4" id="consultation-form">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="label">Full Name *</label>
                        <input id="booking-name" {...register('name', { required: 'Required' })} className="input" placeholder="Rajesh Sharma" />
                        {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>}
                      </div>
                      <div>
                        <label className="label">Email *</label>
                        <input id="booking-email" type="email" {...register('email', { required: 'Required' })} className="input" placeholder="rajesh@company.com" />
                        {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
                      </div>
                      <div>
                        <label className="label">Phone *</label>
                        <input id="booking-phone" {...register('phone', { required: 'Required' })} className="input" placeholder="+91 98765 43210" />
                        {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone.message}</p>}
                      </div>
                      <div>
                        <label className="label">Company Name *</label>
                        <input id="booking-company" {...register('company', { required: 'Required' })} className="input" placeholder="Sharma Industries Pvt. Ltd." />
                        {errors.company && <p className="text-red-500 text-xs mt-1">{errors.company.message}</p>}
                      </div>
                      <div>
                        <label className="label">Designation</label>
                        <input id="booking-designation" {...register('designation')} className="input" placeholder="CEO / Director / VP Operations" />
                      </div>
                      <div>
                        <label className="label">Service Interested In *</label>
                        <select id="booking-service" {...register('service', { required: 'Required' })} className="input">
                          <option value="">Select a Service</option>
                          {SERVICES.map(s => <option key={s}>{s}</option>)}
                        </select>
                        {errors.service && <p className="text-red-500 text-xs mt-1">{errors.service.message}</p>}
                      </div>
                      <div>
                        <label className="label">Preferred Date *</label>
                        <input id="booking-date" type="date" {...register('preferredDate', { required: 'Required' })} className="input" min={new Date().toISOString().split('T')[0]} />
                        {errors.preferredDate && <p className="text-red-500 text-xs mt-1">{errors.preferredDate.message}</p>}
                      </div>
                      <div>
                        <label className="label">Preferred Time *</label>
                        <select id="booking-time" {...register('preferredTime', { required: 'Required' })} className="input">
                          <option value="">Select Time Slot</option>
                          {['09:00 AM', '10:00 AM', '11:00 AM', '12:00 PM', '02:00 PM', '03:00 PM', '04:00 PM', '05:00 PM'].map(t => <option key={t}>{t}</option>)}
                        </select>
                        {errors.preferredTime && <p className="text-red-500 text-xs mt-1">{errors.preferredTime.message}</p>}
                      </div>
                    </div>
                    <div>
                      <label className="label">Message / Specific Challenges</label>
                      <textarea id="booking-message" {...register('message')} className="input resize-none" rows={4} placeholder="Tell us about your key operational challenges, pain points, or specific goals..." />
                    </div>
                    <div>
                      <label className="label">How Did You Hear About Us?</label>
                      <select id="booking-source" {...register('howDidYouHear')} className="input">
                        <option value="">Select</option>
                        {['Google Search', 'LinkedIn', 'Referral', 'Industry Event', 'Blog / Article', 'Other'].map(s => <option key={s}>{s}</option>)}
                      </select>
                    </div>
                    <button type="submit" className="btn-primary w-full justify-center" id="booking-submit-btn">
                      <FiSend className="w-5 h-5" /> Book Free Consultation
                    </button>
                    <p className="text-xs text-gray-400 text-center">
                      You will receive a confirmation email with your booking reference number. No commitment required.
                    </p>
                  </form>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
