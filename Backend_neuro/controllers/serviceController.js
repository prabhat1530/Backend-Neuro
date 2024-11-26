const prisma = require('../config/PrismaClient');

// List all services
const listServices = async (req, res) => {
  try {
    const services = await prisma.service.findMany();
    res.status(200).json(services);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch services', details: error.message });
  }
};

// Add a new service (Admin)
const addService = async (req, res) => {
  const { name, description, price } = req.body;

  try {
    const service = await prisma.service.create({
      data: { name, description, price },
    });

    res.status(201).json({ message: 'Service added successfully', service });
  } catch (error) {
    res.status(500).json({ error: 'Failed to add service', details: error.message });
  }
};
// Update a service by ID
const updateService = async (req, res) => {
  const { id } = req.params;
  const { name, description, price } = req.body;

  try {
    const updatedService = await prisma.service.update({
      where: { id: parseInt(id, 10) },
      data: { name, description, price },
    });

    res.status(200).json({ message: 'Service updated successfully', service: updatedService });
  } catch (error) {
    res.status(500).json({ error: 'Failed to update service', details: error.message });
  }
};

// Delete a service by ID
const deleteService = async (req, res) => {
  const { id } = req.params;

  try {
    await prisma.service.delete({
      where: { id: parseInt(id) },
    });

    res.status(200).json({ message: 'Service deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete service', details: error.message });
  }
};






module.exports = { listServices, addService, deleteService, updateService };