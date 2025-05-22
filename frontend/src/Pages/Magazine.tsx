import AddInventoryItem from '@/components/AddInventoryItem';
import ButtonWithPopup from '@/components/ButtonWithPopup';
import { Font } from '@react-pdf/renderer';
import React, { useState } from 'react';


// Register a font (use a built-in font or a custom one)
Font.register({
    family: 'Helvetica', // Use built-in Helvetica font
    fonts: [
        {
            src: 'https://fonts.gstatic.com/s/helvetica/v1/helvetica.woff2', // Optional: Link to a custom font
        },
    ],
});

interface Supplier {
    id: number;
    name: string;
    contact: string;
    location: string;
}

interface MagazineItem {
    id: number;
    name: string;
    description: string;
    price: number;
    category: string;
    supplier: Supplier;
    stockLevel: number;
    imageUrl: string;
}

// Modal Component
const ItemModal: React.FC<{ item: MagazineItem | null; onClose: () => void }> = ({ item, onClose }) => {
    if (!item) return null;

    return (
        <div className="fixed inset-0 bg-blue-300 bg-opacity-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-lg p-6 max-w-2xl w-full">
                <div className="flex justify-between items-start">
                    <h2 className="text-2xl font-bold mb-4">{item.name}</h2>
                    <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
                        <span className="text-2xl">&times;</span>
                    </button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <img src={item.imageUrl} alt={item.name} className="w-full h-64 object-cover rounded" />
                    <div>
                        <p className="text-gray-600 mb-2">{item.description}</p>
                        <p className="text-green-600 font-bold mb-2">${item.price}</p>
                        <div className="mb-2">
                            <span className="font-semibold">Category:</span> {item.category}
                        </div>
                        <div className="mb-2">
                            <span className="font-semibold">Stock Level:</span> {item.stockLevel}
                        </div>
                        <div className="border-t pt-2 mt-2">
                            <h3 className="font-semibold mb-1">Supplier Information:</h3>
                            <p>{item.supplier.name}</p>
                            <p>{item.supplier.contact}</p>
                            <p>{item.supplier.location}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

const Magazine: React.FC = () => {
    const [selectedItem, setSelectedItem] = useState<MagazineItem | null>(null);

    const dummyData: MagazineItem[] = [
        {
            id: 1,
            name: "Sample Magazine",
            description: "A sample magazine description",
            price: 9.99,
            category: "Entertainment",
            supplier: {
                id: 1,
                name: "Sample Supplier",
                contact: "contact@supplier.com",
                location: "Sample Location"
            },
            stockLevel: 100,
            imageUrl: "https://example.com/sample-image.jpg"
        }
    ];

    return (
        <>
            <div className="container mx-auto p-4">
                <div className="flex justify-between items-center mb-6">
                    <h1 className="text-3xl font-bold">Magazine Inventory</h1>
                    <ButtonWithPopup buttonLabel='ADD MAGAZINE ITEM' dialogTitle='MAGAZINE ITEM FORM'>
                        <AddInventoryItem />
                    </ButtonWithPopup>
                </div>
                <div className="overflow-x-auto">
                    <table className="min-w-full bg-white">
                        <thead>
                            <tr className="bg-gray-100">
                                <th className="px-6 py-3 text-left">Name</th>
                                <th className="px-6 py-3 text-left">Category</th>
                                <th className="px-6 py-3 text-left">Price</th>
                                <th className="px-6 py-3 text-left">Stock Level</th>
                                <th className="px-6 py-3 text-left">Supplier</th>
                            </tr>
                        </thead>
                        <tbody>
                            {dummyData.map((item) => (
                                <tr
                                    key={item.id}
                                    className="border-b hover:bg-gray-50 cursor-pointer"
                                    onClick={() => setSelectedItem(item)}
                                >
                                    <td className="px-6 py-4">{item.name}</td>
                                    <td className="px-6 py-4">{item.category}</td>
                                    <td className="px-6 py-4">${item.price}</td>
                                    <td className="px-6 py-4">{item.stockLevel}</td>
                                    <td className="px-6 py-4">{item.supplier.name}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {selectedItem && (
                    <ItemModal
                        item={selectedItem}
                        onClose={() => setSelectedItem(null)}
                    />
                )}
            </div>
        </>

    );
};

export default Magazine;