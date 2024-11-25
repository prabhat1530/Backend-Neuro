const prisma = require('../config/PrismaClient');

// Create a new booking
const createBooking = async (req, res) => {
  const { userId, serviceId, bookingDate, paymentStatus, totalPrice } = req.body;

  try {
    const newBooking = await prisma.booking.create({
      data: {
        userId,
        serviceId,
        bookingDate: new Date(bookingDate),
        paymentStatus: paymentStatus || 'pending',
        totalPrice,
      },
      include: {
        user: true,
        service: true,
      },
    });

    res.status(201).json({ message: 'Booking created successfully', booking: newBooking });
  } catch (error) {
    res.status(500).json({ error: 'Failed to create booking', details: error.message });
  }
};

// Get all bookings for a user
const getBookings = async (req, res) => {
  const { userId } = req.params;

  try {
    const bookings = await prisma.booking.findMany({
      where: { userId: parseInt(userId, 10) },
      include: {
        service: true,
        user: true,
      },
    });

    if (!bookings || bookings.length === 0) {
      return res.status(404).json({ message: 'No bookings found for this user' });
    }

    res.status(200).json(bookings);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch bookings', details: error.message });
  }
};


module.exports = {createBooking, getBookings}