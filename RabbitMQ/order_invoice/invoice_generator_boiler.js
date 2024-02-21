import PDFDocument from 'pdfkit';
import fs from 'fs';

// export default 
export async function generateInvoice(order) {
    const doc = new PDFDocument({
        size: 'A4', margin: 50, info: {
            Title: 'Invoice',
            Author: 'Naineel Soyantar',
            Subject: 'Invoice',
        }
    });
    const fileName = order.fileName || `invoice_${order.id}_${Math.random().toString(36).slice(2, 7)}.pdf`;

    //pipe the pdf first to a writeStream
    doc.pipe(fs.createWriteStream(`./invoices/${fileName}`));

    //add content to the pdf
    doc.font('Helvetica-Bold');
    doc.fontSize(20);
    doc.text('Invoice', {
        align: 'center'
    });

    doc.moveDown(); // this will move the cursor down to the next line

    doc.font('Helvetica');
    doc.fontSize(10);

    doc.text(`Order ID: ${order.id}`);
    doc.moveDown(); // this will move the cursor down to the next line

    doc.text(`Order Date: ${order.date} `);
    doc.moveDown(); // this will move the cursor down to the next line

    doc.text(`Order Amount: ${order.amount} `);
    doc.moveDown(); // this will move the cursor down to the next line

    doc.text(`Order Status: ${order.status} `);
    doc.moveDown(); // this will move the cursor down to the next line

    doc.text(`Order Customer: ${order.customer} `);
    doc.moveDown(); // this will move the cursor down to the next line

    doc.text(`Order Address: ${order.address} `);
    doc.moveDown(); // this will move the cursor down to the next line

    doc.text(`Order Phone: ${order.phone} `);
    doc.moveDown(); // this will move the cursor down to the next line

    doc.font('Helvetica-Bold');
    doc.fontSize(15);
    doc.text('Authorized Signature', {
        align: 'right'
    });
    doc.moveDown();
    doc.text('Naineel Soyantar', {
        align: 'right'
    });
    doc.moveDown();
    doc.text('Thank you for your business!', {
        align: 'center'
    });

    //end and close the pdf
    doc.end();
    return fileName;
}

// generateInvoice({
//     id: 1,
//     date: new Date().toLocaleDateString(),
//     amount: 1000,
//     status: 'Pending',
//     customer: 'John Doe',
//     address: '123 Main St',
//     phone: '123-456-7890'
// }).then((fName) => {
//     console.log(`Invoice Generated: ${ fName } `);
// })