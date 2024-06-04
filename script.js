document.addEventListener("DOMContentLoaded", () => {
    const data = [];

    // Function to add a new entry
    function addEntry() {
        const name = document.getElementById("name").value;
        const email = document.getElementById("email").value;
        const phone = document.getElementById("phone").value;

        if (name && email && phone) {
            data.push([name, email, phone]);
            updateTable();
            clearFields();
        } else {
            alert("Please fill in all fields.");
        }
    }

    // Function to update the table
    function updateTable() {
        const tableBody = document.getElementById("table-body");
        tableBody.innerHTML = "";

        for (const entry of data) {
            const row = document.createElement("tr");
            for (const value of entry) {
                const cell = document.createElement("td");
                cell.textContent = value;
                row.appendChild(cell);
            }
            tableBody.appendChild(row);
        }
    }

    // Function to clear input fields
    function clearFields() {
        document.getElementById("name").value = "";
        document.getElementById("email").value = "";
        document.getElementById("phone").value = "";
    }

    // Event listener for the Add Entry button
    document.getElementById("add-entry").addEventListener("click", addEntry);

    // Event listener for the Export to CSV button
    document.getElementById("export-btn").addEventListener("click", () => {
        const csvContent = convertToCSV(data);
        const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
        const link = document.createElement("a");
        link.setAttribute("href", URL.createObjectURL(blob));
        link.setAttribute("download", "data.csv");
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    });

    // Function to convert data array to CSV format
    function convertToCSV(data) {
        const csvRows = [];
        for (const row of data) {
            const csvRow = row.map(value => `"${value}"`).join(",");
            csvRows.push(csvRow);
        }
        return csvRows.join("\n");
    }
});
