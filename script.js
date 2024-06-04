document.addEventListener("DOMContentLoaded", () => {
    function addLead(network) {
        const form = document.getElementById(network === 'outside' ? 'outside-network-form' : 'inside-network-form');
        const name = form.querySelector('input[name="name"]').value;
        const email = form.querySelector('input[name="email"]').value;
        const phone = form.querySelector('input[name="phone"]').value;
        const niche = form.querySelector('select[name="niche"]').value;
        const appointmentSet = form.querySelector('select[name="appointment-set"]').value;

        const lead = { name, email, phone, niche, appointmentSet };

        if (appointmentSet === 'yes') {
            addAppointment(lead);
        } else if (appointmentSet === 'waiting') {
            addWaitingLead(lead);
        } else if (appointmentSet === 'no') {
            addRejectedLead(lead);
        }

        // Reset form
        form.reset();
    }

    function addWaitingLead(lead) {
        const waitingList = document.getElementById('waiting-list');
        const listItem = document.createElement('li');
        listItem.textContent = `${lead.name} (${lead.email}, ${lead.phone}, ${lead.niche})`;
        waitingList.appendChild(listItem);
    }

    function addRejectedLead(lead) {
        const rejectedList = document.getElementById('rejected-list');
        const listItem = document.createElement('li');
        listItem.textContent = `${lead.name} (${lead.email}, ${lead.phone}, ${lead.niche})`;
        rejectedList.appendChild(listItem);
    }

    function addAppointment(lead) {
        const appointmentsList = document.getElementById('appointments-list');
        const row = document.createElement('tr');

        row.innerHTML = `
            <td>${lead.name}</td>
            <td><input type="date" name="date-set"></td>
            <td><input type="date" name="date-call"></td>
            <td>
                <select name="attended" onchange="updateSales(this, '${lead.name}')">
                    <option value="no">No</option>
                    <option value="yes">Yes</option>
                </select>
            </td>
        `;

        appointmentsList.appendChild(row);
    }

    function updateSales(selectElement, leadName) {
        if (selectElement.value === 'yes') {
            addSale(leadName);
        }
    }

    function addSale(leadName) {
        const salesList = document.getElementById('sales-list');
        const row = document.createElement('tr');

        row.innerHTML = `
            <td>${leadName}</td>
            <td>
                <select name="response" onchange="calculateTotal()">
                    <option value="rejected">Rejected</option>
                    <option value="accepted">Accepted</option>
                </select>
            </td>
            <td><input type="number" name="value" onchange="calculateTotal()"></td>
        `;

        salesList.appendChild(row);
    }

    function calculateTotal() {
        let total = 0;
        const salesList = document.getElementById('sales-list');
        const rows = salesList.querySelectorAll('tr');

        rows.forEach(row => {
            const response = row.querySelector('select[name="response"]').value;
            const value = parseFloat(row.querySelector('input[name="value"]').value) || 0;

            if (response === 'accepted') {
                total += value;
            }
        });

        document.getElementById('total-sales-value').innerText = total.toFixed(2);
    }

    function addRecruit() {
        const form = document.getElementById('recruitment-form');
        const firstName = form.querySelector('input[name="first-name"]').value;
        const lastName = form.querySelector('input[name="last-name"]').value;
        const phone = form.querySelector('input[name="phone"]').value;
        const email = form.querySelector('input[name="email"]').value;
        const dateAccepted = form.querySelector('input[name="date-accepted"]').value;
        const tier = form.querySelector('input[name="tier"]').value;
        const inboundOutbound = form.querySelector('select[name="inbound-outbound"]').value;
        const niche = form.querySelector('select[name="niche"]').value;
        const recruits = parseFloat(form.querySelector('input[name="recruits"]').value) || 0;
        const percentage = parseFloat(form.querySelector('input[name="percentage"]').value) || 0;
        const monthlyAmount = parseFloat(form.querySelector('input[name="monthly-amount"]').value) || 0;

        // Calculate total earnings
        const recruitEarnings = (percentage / 100) * monthlyAmount * recruits;

        // Add to total earnings
        let totalRecruitmentValue = parseFloat(document.getElementById('total-recruitment-value').innerText) || 0;
        totalRecruitmentValue += recruitEarnings;
        document.getElementById('total-recruitment-value').innerText = totalRecruitmentValue.toFixed(2);

        // Add to recruitment list
        const recruitsList = document.getElementById('recruits-list');
        const listItem = document.createElement('li');
        listItem.textContent = `${firstName} ${lastName} (${email}, ${phone}, ${dateAccepted}, ${tier}, ${inboundOutbound}, ${niche}, ${recruits}, ${percentage}%, $${monthlyAmount}/month)`;
        recruitsList.appendChild(listItem);

        // Reset form
        form.reset();
    }

    window.addLead = addLead;
    window.updateSales = updateSales;
    window.addRecruit = addRecruit;
});
