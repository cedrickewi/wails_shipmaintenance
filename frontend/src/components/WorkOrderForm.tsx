import React, { useState } from 'react';
import { db } from 'wailsjs/go/models';

interface WorkOrder {
    id: string;
    shipName: string;
    maintenanceType: string;
    description: string;
    priority: 'Low' | 'Medium' | 'High';
    scheduledDate: string;
    status: 'Pending' | 'In Progress' | 'Completed';
    magazineItems: { item: string; quantity: number }[]; // List of items with quantities
}

interface WorkOrderFormProps {
    issue: db.LogIssueReport
}

const WorkOrderForm = ({ issue }: WorkOrderFormProps) => {
    const [workOrder, setWorkOrder] = useState<WorkOrder>({
        id: '',
        shipName: '',
        maintenanceType: '',
        description: '',
        priority: 'Medium',
        scheduledDate: '',
        status: 'Pending',
        magazineItems: [] // Initialize with an empty array
    });

    const [selectedItem, setSelectedItem] = useState<string>('');
    const [quantity, setQuantity] = useState<number>(1);

    // Dummy data for magazine items
    const magazineItems = [
        'Wrench Set',
        'Oil Can',
        'Spare Bolts',
        'Hydraulic Fluid',
        'Safety Goggles'
    ];

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // TODO: Add API call to save work order
        console.log('Work order submitted:', workOrder);
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        setWorkOrder({
            ...workOrder,
            [e.target.name]: e.target.value
        });
    };

    const handleAddItem = () => {
        if (selectedItem && quantity > 0) {
            setWorkOrder({
                ...workOrder,
                magazineItems: [
                    ...workOrder.magazineItems,
                    { item: selectedItem, quantity }
                ]
            });
            setSelectedItem(''); // Reset selected item
            setQuantity(1); // Reset quantity
        }
    };

    const handleRemoveItem = (index: number) => {
        const updatedItems = workOrder.magazineItems.filter((_, i) => i !== index);
        setWorkOrder({
            ...workOrder,
            magazineItems: updatedItems
        });
    };

    return (
        <form onSubmit={handleSubmit} className="max-w-lg mx-auto p-4">
            <h2 className="text-2xl font-bold mb-4">Ship Maintenance Work Order: <strong>{issue.ship_name}</strong> </h2>
            <div className="mb-4">
                <label className="block mb-2">Maintenance Type:</label>
                <input
                    type="text"
                    name="maintenanceType"
                    value={workOrder.maintenanceType}
                    onChange={handleChange}
                    className="w-full p-2 border rounded"
                    required
                />
            </div>

            <div className="mb-4">
                <label className="block mb-2">Description:</label>
                <textarea
                    name="description"
                    value={workOrder.description}
                    onChange={handleChange}
                    className="w-full p-2 border rounded"
                    rows={4}
                    required
                />
            </div>

            <div className="mb-4">
                <label className="block mb-2">Priority:</label>
                <select
                    name="priority"
                    value={workOrder.priority}
                    onChange={handleChange}
                    className="w-full p-2 border rounded"
                >
                    <option value="Low">Low</option>
                    <option value="Medium">Medium</option>
                    <option value="High">High</option>
                </select>
            </div>

            <div className="mb-4">
                <label className="block mb-2">Scheduled Date:</label>
                <input
                    type="date"
                    name="scheduledDate"
                    value={workOrder.scheduledDate}
                    onChange={handleChange}
                    className="w-full p-2 border rounded"
                    required
                />
            </div>

            <div className="mb-4">
                <label className="block mb-2">Select Magazine Item:</label>
                <select
                    value={selectedItem}
                    onChange={(e) => setSelectedItem(e.target.value)}
                    className="w-full p-2 border rounded"
                >
                    <option value="" disabled>Select an item</option>
                    {magazineItems.map(item => (
                        <option key={item} value={item}>
                            {item}
                        </option>
                    ))}
                </select>
            </div>

            <div className="mb-4">
                <label className="block mb-2">Quantity:</label>
                <input
                    type="number"
                    min="1"
                    value={quantity}
                    onChange={(e) => setQuantity(parseInt(e.target.value, 10))}
                    className="w-full p-2 border rounded"
                />
            </div>

            <button
                type="button"
                onClick={handleAddItem}
                className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 mb-4"
            >
                Add Item
            </button>

            <div className="mb-4">
                <h3 className="text-lg font-bold mb-2">Selected Items:</h3>
                {workOrder.magazineItems.length > 0 ? (
                    <ul className="list-disc pl-5">
                        {workOrder.magazineItems.map((magazineItem, index) => (
                            <li key={index} className="mb-2">
                                {magazineItem.item} - Quantity: {magazineItem.quantity}
                                <button
                                    type="button"
                                    onClick={() => handleRemoveItem(index)}
                                    className="ml-4 text-red-500 hover:underline"
                                >
                                    Remove
                                </button>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p className="text-gray-500">No items added yet.</p>
                )}
            </div>

            <button
                type="submit"
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            >
                Submit Work Order
            </button>
        </form>
    );
};

export default WorkOrderForm;