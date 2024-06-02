// script.js
document.getElementById('mlm-form').addEventListener('submit', function (e) {
    e.preventDefault();

    const interest = document.getElementById('interest').value;
    const investment = document.getElementById('investment').value;
    const experience = document.getElementById('experience').value;
    const ticket = document.getElementById('ticket').value;

    const mlms = [
        { name: 'Melaleuca', category: 'home', investment: 'yes', experience: ['none', 'some'], ticket: 'low' },
        { name: 'Stones of Youth ebook', category: 'health', investment: 'no', experience: ['none', 'some'], ticket: 'low' },
        { name: 'Primercia Finance', category: 'home', investment: 'yes', experience: ['none', 'some', 'expert'], ticket: 'high' },
        { name: 'Groove.cm', category: 'technology', investment: 'yes', experience: ['none', 'some', 'expert'], ticket: 'high' },
        { name: 'Travel Agency', category: ['home', 'technology'], investment: 'yes', experience: ['none', 'some', 'expert'], ticket: 'high' },
        { name: 'Fiveer', category: 'technology', investment: 'no', experience: ['none', 'some', 'expert'], ticket: ['low', 'high'] },
        { name: 'FG Funnels', category: 'technology', investment: 'no', experience: 'expert', ticket: 'high' }
    ];

    const recommendedMLMs = mlms.filter(mlm => {
        return (Array.isArray(mlm.category) ? mlm.category.includes(interest) : mlm.category === interest) &&
               mlm.investment === investment &&
               mlm.experience.includes(experience) &&
               (Array.isArray(mlm.ticket) ? mlm.ticket.includes(ticket) : mlm.ticket === ticket);
    });

    const resultsContainer = document.getElementById('results');
    const mlmList = document.getElementById('mlm-list');
    mlmList.innerHTML = '';

    if (recommendedMLMs.length > 0) {
        recommendedMLMs.forEach(mlm => {
            const li = document.createElement('li');
            li.textContent = mlm.name;
            mlmList.appendChild(li);
        });
    } else {
        const li = document.createElement('li');
        li.textContent = 'Melaleuca';
        mlmList.appendChild(li);
    }

    resultsContainer.style.display = 'block';
});
