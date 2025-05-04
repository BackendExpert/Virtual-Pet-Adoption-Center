const Pet = require("../models/petModel");

// for genarete Certificate
const PDFDocument = require('pdfkit');

// this Controller for all Bonus Features (Optional)

const OPTController = {

    // get result of quiz
    getQuizResult: async (req, res) => {
        try {
            // answers of quiz
            const quizAnswers = req.body;

            const matchedPets = await Pet.find({ personality: { $in: quizAnswers }, adopted: false })

            res.json({ Status: 'Success', Result: matchedPets });
        }
        catch (err) {
            console.log(err)
        }
    },

    // genarate Certificate
    adpotCertificate: async (req, res) => {
        try {
            const petid = req.params.id;
            const { byadopt } = req.body;
        
            if (!byadopt) {
                return res.status(400).json({ error: "Adopter name (byadopt) is required" });
            }
        
            const updatedPet = await Pet.findByIdAndUpdate(
                petid,
                {
                    adopted: true,
                    adoption_date: new Date(),
                    adoptedBy: byadopt
                },
                { new: true }
            );
        
            if (!updatedPet) {
                return res.status(404).json({ error: "Pet not found" });
            }
        
            const doc = new PDFDocument({ size: 'A4', margin: 50 });
            const fileName = `Adoption_Certificate_${byadopt.replace(/\s+/g, '_')}_${Date.now()}.pdf`;
        
            // Set response headers
            res.setHeader('Content-Type', 'application/pdf; charset=utf-8');
            res.setHeader('Content-Disposition', `attachment; filename="${fileName}"`);
        
            // Pipe the PDF to response
            doc.pipe(res);
        
            // Border
            doc.rect(20, 20, doc.page.width - 40, doc.page.height - 40)
                .lineWidth(2)
                .strokeColor('#000000')
                .stroke();
        
            // Title
            doc.fontSize(26)
                .font('Helvetica-Bold')
                .text('Certificate of Pet Adoption', { align: 'center' });
        
            doc.moveDown(2);
        
            // Subtitle
            doc.fontSize(16)
                .font('Helvetica')
                .text('This certifies that', { align: 'center' });
        
            doc.moveDown(1);
        
            // Adopter name
            doc.fontSize(22)
                .font('Helvetica-BoldOblique')
                .text(byadopt, { align: 'center' });
        
            doc.moveDown(1);
        
            // Adoption details
            doc.fontSize(16)
                .font('Helvetica')
                .text(`has adopted ${updatedPet.name} on ${new Date().toLocaleDateString()}.`, {
                    align: 'center'
                });
        
            doc.moveDown(3);
        
            // Thank you message
            doc.fontSize(12)
                .font('Helvetica')
                .text('Thank you for providing a loving home!', { align: 'center' });
        
            doc.moveDown(2);
        
            // Signature lines
            doc.fontSize(10)
                .font('Helvetica')
                .text('Authorized Signature', 100, 680, { align: 'left' });
        
            doc.moveTo(100, 675).lineTo(250, 675).strokeColor('#000000').stroke();
        
            doc.text('Virtual Pet Adoption Center', 0, 680, { align: 'right' });
        
            // End the PDF stream
            doc.end();
        
        } catch (err) {
            console.error(err);
            if (!res.headersSent) {
                res.status(500).json({ error: "Something went wrong" });
            }
        }
    }
};

module.exports = OPTController;