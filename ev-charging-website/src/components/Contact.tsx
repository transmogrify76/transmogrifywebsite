import { useForm } from 'react-hook-form';

const Contact = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = (data: any) => {
    console.log(data);
  };

  return (
    <section className="py-16 bg-gray-800 text-white">
      <div className="container mx-auto text-center">
        <h2 className="text-4xl font-bold mb-8">Contact Us</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="max-w-md mx-auto">
          <input
            {...register('name', { required: true })}
            placeholder="Your Name"
            className="w-full p-2 mb-4 rounded text-black"
          />
          {errors.name && <span className="text-red-500">Name is required</span>}
          <input
            {...register('email', { required: true, pattern: /^\S+@\S+$/i })}
            placeholder="Your Email"
            className="w-full p-2 mb-4 rounded text-black"
          />
          {errors.email && <span className="text-red-500">Valid email is required</span>}
          <textarea
            {...register('message', { required: true })}
            placeholder="Your Message"
            className="w-full p-2 mb-4 rounded text-black"
          />
          {errors.message && <span className="text-red-500">Message is required</span>}
          <button type="submit" className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-full">
            Send Message
          </button>
        </form>
      </div>
    </section>
  );
};

export default Contact;