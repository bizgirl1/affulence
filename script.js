document.addEventListener("DOMContentLoaded", () => {
    function addLead(network) {
        const name = document.getElementById(`${network}-name`).value;
        const email = document.getElementById(`${network}-email`).value;
        const phone = document.getElementById(`${network}-phone`).value;
        const niche = document.getElementById(`${network}-niche`).value;
        const appointmentSet = document.getElementById(`${network}-appointment-set`).value;

        if (!name || !email || !phone || !niche) {
            alert("Please fill out all fields.");
            return;
        }

        const lead = { name, email, phone, niche, appointmentSet };

        if (appointmentSet === "waiting") {
            addToList("waiting-list", lead);
        } else if (appointmentSet === "no") {
            addToList("rejected-list", lead);
        } else {
            addAppointment(lead);
        }

        clearForm(`${network}-network-form`);
    }

    function addToList(listId, lead) {
        const listItem = document.createElement("li");
        listItem.textContent = `${lead.name} (${lead.email}, ${lead.phone}, ${lead.niche})`;
        document.getElementById(listId).appendChild(listItem);
    }

    function addAppointment(lead) {
        const row = document.createElement("tr");

        const nameCell = document.createElement("td");
        nameCell.textContent = lead.name;

        const dateSetCell = document.createElement("td");
        const dateSetInput = document.createElement("input");
        dateSetInput.type = "date";
        dateSetCell.appendChild(dateSetInput);

        const dateCallCell = document.createElement("td");
        const dateCallInput = document.createElement("input");
        dateCallInput.type = "date";
        dateCallCell.appendChild(dateCallInput);

        const attendedCell = document.createElement("td");
        const attendedSelect = document.createElement("select");
        const optionYes = document.createElement("option");
        optionYes.value = "yes";
        optionYes.textContent = "Yes";
        const optionNo = document.createElement("option");
        optionNo.value = "no";
        optionNo.textContent = "No";
        attendedSelect.appendChild(optionYes);
        attendedSelect.appendChild(optionNo);
        attendedCell.appendChild(attendedSelect);

        attendedSelect.addEventListener("change", () => {
            if (attendedSelect.value === "yes") {
                addSale(lead.name);
            }
        });

        row.appendChild(nameCell);
        row.appendChild(dateSetCell);
        row.appendChild(dateCallCell);
        row.appendChild(attendedCell);

        document.getElementById("appointments-list").appendChild(row);
    }

    function addSale(name) {
        const row = document.createElement("tr");

        const nameCell = document.createElement("td");
        nameCell.textContent = name;

        const responseCell = document.createElement("td");
        const responseSelect = document.createElement("select");
        const optionAccepted = document.createElement("option");
        optionAccepted.value = "accepted";
        optionAccepted.textContent = "Accepted";
        const optionRejected = document.createElement("option");
        optionRejected.value = "rejected";
        optionRejected.textContent = "Rejected";
        responseSelect.appendChild(optionAccepted);
        responseSelect.appendChild(optionRejected);
        responseCell.appendChild(responseSelect);

        const valueCell = document.createElement("td");
        const valueInput = document.createElement("input");
        valueInput.type = "number";
        valueInput.step = "0.01";
        valueInput.addEventListener("input", updateTotalSales);
        valueCell.appendChild(valueInput);

        row.appendChild(nameCell);
        row.appendChild(responseCell);
        row.appendChild(valueCell);

        document.getElementById("sales-list").appendChild(row);
    }

    function updateTotalSales() {
        let total = 0;
        document.querySelectorAll("#sales-list input[type='number']").forEach(input => {
            total += parseFloat(input.value) || 0;
        });
        document.getElementById("total-sales-value").textContent = total.toFixed(2);
    }

    function addRecruit() {
        const firstName = document.getElementById("first-name").value;
        const lastName = document.getElementById("last-name").value;
        const phone = document.getElementById("phone").value;
        const email = document.getElementById("email").value;
        const dateAccepted = document.getElementById("date-accepted").value;
        const tier = parseInt(document.getElementById("tier").value, 10);
        const inboundOutbound = document.getElementById("inbound-outbound").value;
        const niche = document.getElementById("recruitment-niche").value;
        const recruits = parseInt(document.getElementById("recruits").value, 10);
        const percentage = parseFloat(document.getElementById("percentage").value);
        const monthlyAmount = parseFloat(document.getElementById("monthly-amount").value);

        if (!firstName || !lastName || !phone || !email || !dateAccepted || isNaN(tier) || isNaN(recruits) || isNaN(percentage) || isNaN(monthlyAmount)) {
            alert("Please fill out all fields.");
            return;
        }

        const recruit = {
            firstName,
            lastName,
            phone,
            email,
            dateAccepted,
            tier,
            inboundOutbound,
            niche,
            recruits,
            percentage,
            monthlyAmount
        };

        const listItem = document.createElement("li");
        listItem.textContent = `${recruit.firstName} ${recruit.lastName} (${recruit.email}, ${recruit.phone}) - ${recruit.recruits} recruits @ ${recruit.percentage}% - Monthly Amount: $${recruit.monthlyAmount}`;
        document.getElementById("recruits-list").appendChild(listItem);

        updateTotalRecruitment(recruit.monthlyAmount, recruit.percentage, recruit.recruits);

        clearForm("recruitment-form");
    }

    function updateTotalRecruitment(amount, percentage, recruits) {
        const total = parseFloat(document.getElementById("total-recruitment-value").textContent) || 0;
        const earnings = amount * (percentage / 100) * recruits;
        document.getElementById("total-recruitment-value").textContent = (total + earnings).toFixed(2);
    }

    function clearForm(formId) {
        document.getElementById(formId).reset();
    }

    window.addLead = addLead;
    window.addRecruit = addRecruit;

document.addEventListener("DOMContentLoaded", () => {
    document.getElementById('export-btn').addEventListener('click', () => {
        // Example data
        const data = [
            ['Name', 'Email', 'Phone'],
            ['John Doe', 'john@example.com', '123-456-7890'],
            ['Jane Smith', 'jane@example.com', '987-654-3210'],
            ['Alice Johnson', 'alice@example.com', '555-123-4567']
        ];

        // Convert data to CSV format
        const csvContent = convertToCSV(data);

        // Create a blob with CSV content
        const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });

        // Create a temporary link element to trigger the download
        const link = document.createElement("a");
        link.setAttribute("href", URL.createObjectURL(blob));
        link.setAttribute("download", "data.csv");

        // Trigger the download
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
