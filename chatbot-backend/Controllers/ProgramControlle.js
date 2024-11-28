const Program = require("../Models/programSchema");

class ProgramController {
  static async createProgram(req, res) {
    try {
        const { title, mainText, imageUrl, userId } = req.body;
        if (!userId) {
          return res.status(400).json({ message: 'User ID is required' });
      }
        const newProgram = new Program({ title, mainText, imageUrl, userId });
        await newProgram.save();
        res.status(201).json(newProgram);
      } catch (error) {
        console.error('Error creating program:', error);
        res.status(500).json({ message: 'Failed to create program.' });
      }
  }

  static async getAllPrograms(req, res) {
    try {
        const programs = await Program.find(); 
        console.log(programs);
        res.status(200).json(programs);
      } catch (error) {
        console.error('Error fetching programs:', error);
        res.status(500).json({ message: 'Failed to fetch programs.' });
      }
  }

  static async getProgramById(req, res) {
    try {
        const { id } = req.params;
        const program = await Program.findById(id);
        if (!program) {
          return res.status(404).json({ message: 'Program not found.' });
        }
        res.status(200).json(program);
      } catch (error) {
        console.error('Error fetching program:', error);
        res.status(500).json({ message: 'Failed to fetch program.' });
      }
  }

  static async updateProgramById(req, res) {
    try {
        const { id } = req.params;
        const { title, mainText, imageUrl, userId } = req.body;
        const updatedProgram = await Program.findByIdAndUpdate(
          id,
          { title, mainText, imageUrl, userId },
          { new: true }
        );
        res.status(200).json(updatedProgram);
      } catch (error) {
        console.error('Error updating program:', error);
        res.status(500).json({ message: 'Failed to update program.' });
      }
    };
  

  static async deleteProgramById(req, res) {
    try {
        const { id } = req.params;
        await Program.findByIdAndDelete(id);
        res.status(200).json({ message: 'Program deleted successfully.' });
      } catch (error) {
        console.error('Error deleting program:', error);
        res.status(500).json({ message: 'Failed to delete program.' });
      }
  }
}

module.exports = ProgramController;
