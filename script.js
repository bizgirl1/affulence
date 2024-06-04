// Initialize arrays to hold the data
let outsideLeads = [];
let insideLeads = [];
let appointments = [];
let sales = [];
let recruits = [];

// Function to add a lead
function addLead(type) {
    const form = document.getElementById(`${type}-network-form`);
    const name = form.querySelector('input[name="name"]').value;
    const email = form.querySelector('input[name="email"]').value;
    const phone = form.querySelector('input[name="phone"]').value;
    const niche = form.querySelector('select[name="niche"]').value;
    const appointmentSet = form.querySelector('select[name="appointment-set"]').value;

    const lead = { name, email, phone, niche, appointmentSet };

    if (appointmentSet === 'yes') {
        appointments.push(lead);
        updateAppointments();
    } else if (appointmentSet === 'waiting') {
        addToWaitingList(lead);
    } else if (appointmentSet === 'no') {
        addToRejectedList(lead);
    }

    if (type === 'outside') {
        outsideLeads.push(lead);
    } else {
        insideLeads.push(lead);
    }

    form.reset();
}

function addToWaitingList(lead) {
    const waitingList = document.getElementById('waiting-list');
    const li = document.createElement('li');
    li.textContent = `${lead.name} - ${lead.email} - ${lead.phone} - ${lead.niche}`;
    waitingList.appendChild(li);
}

function addToRejectedList(lead) {
    const rejectedList = document.getElementById('rejected-list');
    const li = document.createElement('li');
    li.textContent = `${lead.name} - ${lead.email} - ${lead.phone} - ${lead.niche}`;
    rejectedList.appendChild(li);
}

// Function to update the appointments list
function updateAppointments() {
    const appointmentsList = document.getElementById('appointments-list');
    appointmentsList.innerHTML = '';
    appointments.forEach((appointment, index) => {
        const tr = document.createElement('tr');

        const nameTd = document.createElement('td');
        nameTd.textContent = appointment.name;
        tr.appendChild(nameTd);

        const dateAppointmentSetTd = document.createElement('td');
        const dateAppointmentSetInput = document.createElement('input');
        dateAppointmentSetInput.type = 'date';
        dateAppointmentSetInput.onchange = () => {
            appointment.dateAppointmentSet = dateAppointmentSetInput.value;
        };
        dateAppointmentSetTd.appendChild(dateAppointmentSetInput);
        tr.appendChild(dateAppointmentSetTd);

        const dateSalesCallTd = document.createElement('td');
        const dateSalesCallInput = document.createElement('input');
        dateSalesCallInput.type = 'date';
        dateSalesCallInput.onchange = () => {
            appointment.dateSalesCall = dateSalesCallInput.value;
        };
        dateSalesCallTd.appendChild(dateSalesCallInput);
        tr.appendChild(dateSalesCallTd);

        const attendedSalesCallTd = document.createElement('td');
        const attendedSalesCallSelect = document.createElement('select');
        attendedSalesCallSelect.innerHTML = '<option value="yes">Yes</option><option value="no">No</option>';
        attendedSalesCallSelect.onchange = () => {
            appointment.attendedSalesCall = attendedSalesCallSelect.value;
            if (attendedSalesCallSelect.value === 'yes') {
                sales.push(appointment);
                updateSales();
            }
        };
        attendedSalesCallTd.appendChild(attendedSalesCallSelect);
        tr.appendChild(attendedSalesCallTd);

        appointmentsList.appendChild(tr);
    });
}

// Function to update the sales list
function updateSales() {
    const salesList = document.getElementById('sales-list');
    salesList.innerHTML = '';
    let totalSalesValue = 0;
    sales.forEach((sale, index) => {
        const tr = document.createElement('tr');

        const nameTd = document.createElement('td');
        nameTd.textContent = sale.name;
        tr.appendChild(nameTd);

        const responseTd = document.createElement('td');
        const responseSelect = document.createElement('select');
        responseSelect.innerHTML = '<option value="accepted">Accepted</option><option value="rejected">Rejected</option>';
        responseSelect.onchange = () => {
            sale.response = responseSelect.value;
        };
        responseTd.appendChild(responseSelect);
        tr.appendChild(responseTd);

        const valueTd = document.createElement('td');
        const valueInput = document.createElement('input');
        valueInput.type = 'number';
        valueInput.onchange = () => {
            sale.value = parseFloat(valueInput.value);
            calculateTotalSales();
        };
        valueTd.appendChild(valueInput);
        tr.appendChild(valueTd);

        salesList.appendChild(tr);
    });
}

// Function to calculate and update total sales value
function calculateTotalSales() {
    let totalSalesValue = sales.reduce((total, sale) => {
        return total + (sale.value || 0);
    }, 0);
    document.getElementById('total-sales-value').textContent = totalSalesValue.toFixed(2);
}

// Function to add a recruit
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
    const recruitsCount = parseInt(form.querySelector('input[name="recruits"]').value);
    const percentage = parseFloat(form.querySelector('input[name="percentage"]').value);
    const monthlyAmount = parseFloat(form.querySelector('input[name="monthly-amount"]').value);

    const recruit = { firstName, lastName, phone, email, dateAccepted, tier, inboundOutbound, niche, recruitsCount, percentage, monthlyAmount };
    recruits.push(recruit);
    updateRecruits();
    form.reset();
}

// Function to update the recruits list
function updateRecruits() {
    const recruitsList = document.getElementById('recruits-list');
    recruitsList.innerHTML = '';
    let totalRecruitmentValue = 0;
    recruits.forEach((recruit, index) => {
        const li = document.createElement('li');
        li.textContent = `${recruit.firstName} ${recruit.lastName} - ${recruit.phone} - ${recruit.email} - ${recruit.niche} - ${recruit.recruitsCount} recruits - ${recruit.percentage}% - $${recruit.monthlyAmount}`;
        recruitsList.appendChild(li);
        totalRecruitmentValue += recruit.recruitsCount * recruit.percentage / 100 * recruit.monthlyAmount;
    });
    document.getElementById('total-recruitment-value').textContent = totalRecruitmentValue.toFixed(2);
}
