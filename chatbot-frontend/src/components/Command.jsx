import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Command = () => {
  const [commands, setCommands] = useState([]);


    const fetchCommands = async () => {
      try {
        const response = await axios.get('/command');
        setCommands(response.data);
      } catch (error) {
        console.error('Error fetching commands:', error);
      }
    };

    fetchCommands();

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">
        Commandes Récemment Ajoutées
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {commands.length > 0 ? (
          commands.map((command) => (
            <div
              key={command._id}
              className="bg-white border border-gray-200 rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow"
            >
              <h3 className="text-xl font-semibold text-blue-600 mb-2">
                {command.command_type === 'devis' ? 'Devis' : 'Contrat'}
              </h3>
              <p className="text-gray-700 mb-4">
                <strong>Détails:</strong> {command.details}
              </p>
              <p className="text-sm text-gray-500">
                <strong>Ajouté le:</strong>{' '}
                {new Date(command.createdAt).toLocaleString()}
              </p>
            </div>
          ))
        ) : (
          <p className="text-gray-600 text-center col-span-full">
            Aucune commande trouvée.
          </p>
        )}
      </div>
    </div>
  );
};

export default Command;
