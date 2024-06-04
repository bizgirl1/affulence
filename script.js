document.addEventListener("DOMContentLoaded", () => {
    const data = [];

    // Function to add a new entry
    function addEntry() {
        const name = document.getElementById("name").value;
        const email = document.getElementById("email").value;
        const phone = document.getElementById("phone").value;

        if (name && email && phone) {
            const entry = [name, email, phone];
            data.push(entry);
            appendTableRow(entry);
            clearFields();
        } else {
            alert("Please fill in all fields.");
        }
    }

    // Function to update the table with new entry
    function appendTableRow(entry) {
        const tableBody = document.getElementById("table-body");
        const row = document.createElement("tr");
        entry.forEach(value => {
            const cell = document.createElement("td");
            cell.textContent = value;
            row.appendChild(cell);
        });
        tableBody.appendChild(row);
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
        if (data.length > 0) {
            const csvContent = convertToCSV(data);
            const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
            const link = document.createElement("a");
            link.setAttribute("href", URL.createObjectURL(blob));
            link.setAttribute("download", "data.csv");
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        } else {
            alert("No data to export.");
        }
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
