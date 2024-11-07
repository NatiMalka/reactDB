function ClientTable({ clients, onDelete }) {
  return (
    <div className="client-table">
      <table>
        <thead>
          <tr>
            <th>Client Name</th>
            <th>Subscription Plan</th>
            <th>Amount</th>
            <th>Notes</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {clients.map((client) => (
            <tr key={client.id}>
              <td>{client.name}</td>
              <td>{client.subscriptionPlan}</td>
              <td>${client.amount}</td>
              <td>{client.notes}</td>
              <td>
                <button 
                  className="delete-btn"
                  onClick={() => onDelete(client.id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ClientTable; 