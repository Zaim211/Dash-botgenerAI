const ChatSchema = require('../Models/ChatSchema');

class AffectationLeadController {
    static async affectLead(req, res) {
        const { id, commercialId } = req.body;

        try {
            await ChatSchema.updateMany(
                { _id: { $in: id } },
                { commercial: commercialId },
                { new: true }
            );
    
            const updatedLeads = await ChatSchema.find({ _id: { $in: id } }).populate('commercial');
    
            res.status(200).json(updatedLeads);
        } catch (error) {
            console.error('Error assigning coaches to commercial:', error.message);
            res.status(500).json({ message: 'Error assigning coaches to commercial', error });
        }
    }
    static async getLeadsByCommercial(req, res) {
        const { commercialId } = req.params;

    try {
        const assignedLeades = await ChatSchema.find({ commercial: commercialId })
            .populate('commercial');

        res.status(200).json(assignedLeades);
    } catch (error) {
        console.error('Error fetching assigned coaches:', error.message);
        res.status(500).json({ message: 'Error fetching assigned coaches', error });
    }
    }
}

module.exports = AffectationLeadController;