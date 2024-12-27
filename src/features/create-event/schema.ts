import * as Yup from 'yup';

export const CreateEventSchema = Yup.object().shape({
  title: Yup.string().required('Title is required'),
  description: Yup.string().required('Description is required'),
  date: Yup.date().required('Date is required'),
  time: Yup.string().required('Time is required'),
  location: Yup.string().required('Location is required'),
  tickets: Yup.array().of(
    Yup.object().shape({
      type: Yup.string().required('Ticket type is required'),
      price: Yup.number().min(0, 'Price must be at least 0').required('Price is required'),
      availableSeat: Yup.number().min(1, 'Available seats must be at least 1').required('Available seats is required'),
    })
  ).min(1, 'At least one ticket type is required'),
  imageUrl: Yup.string().url('Invalid image URL').required('Image URL is required'),
});

