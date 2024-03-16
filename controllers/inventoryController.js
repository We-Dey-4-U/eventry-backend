const db = require('../config/db');

// Controller for handling inventory related operations

// Get all inventory items
exports.getAllInventory = (req, res) => {
    db.query('SELECT * FROM inventory', (err, result) => {
        if (err) {
            res.status(500).json({ error: 'Error retrieving inventory' });
        } else {
            res.status(200).json(result);
        }
    });
};





// Add new inventory item
// Add new inventory item
exports.addInventoryItem = (req, res) => {
    const { name, description, quantity, price } = req.body;
    const total_price = quantity * price; // Calculate total price
    const newItem = { name, description, quantity, price,  total_price };
    db.query('INSERT INTO inventory SET ?', newItem, (err) => {
        if (err) {
            res.status(500).json({ error: 'Error adding inventory item' });
        } else {
            res.status(201).json({ message: 'Inventory item added successfully' });
        }
    });
};





// Update inventory item
exports.updateInventoryItem = (req, res) => {
    const { id } = req.params;
    const { name, description, quantity, price } = req.body;
    const total_price = quantity * price; // Recalculate total price
    const updatedItem = { name, description, quantity, price, total_price };
    db.query('UPDATE inventory SET ? WHERE id = ?', [updatedItem, id], (err) => {
        if (err) {
            res.status(500).json({ error: 'Error updating inventory item' });
        } else {
            res.status(200).json({ message: 'Inventory item updated successfully' });
        }
    });
};






// Delete inventory item
exports.deleteInventoryItem = (req, res) => {
    const { id } = req.params;
    db.query('DELETE FROM inventory WHERE id = ?', id, (err) => {
        if (err) {
            res.status(500).json({ error: 'Error deleting inventory item' });
        } else {
            res.status(200).json({ message: 'Inventory item deleted successfully' });
        }
    });
};