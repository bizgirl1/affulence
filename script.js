// script.js
document.getElementById('mlm-form').addEventListener('submit', function (e) {
    e.preventDefault();

    const interest = document.getElementById('interest').value;
    const investment = document.getElementById('investment').value;
    const experience = document.getElementById('experience').value;

    const mlms = [
        { name: 'Herbalife', category: 'health', investment: 'medium', experience: 'some' },
        { name: 'Avon', category: 'beauty', investment: 'low', experience: 'none' },
        { name: 'Tupperware', category: 'home', investment: 'medium', experience: 'some' },
        { name: 'Amway', category: 'health', investment: 'high', experience: 'expert' },
        { name: 'Scentsy', category: 'home', investment: 'low', experience: 'none' },
        { name: 'Nu Skin', category: 'beauty', investment: 'high', experience: 'expert' },
        { name: 'Tech MLM', category: 'technology', investment: 'medium', experience: 'some' }
    ];

    const recommendedMLMs = mlms.filter(mlm => {
        return mlm.category === interest && mlm.investment === investment && mlm.experience === experience;
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
        li.textContent = 'No suitable MLMs found based on your criteria.';
        mlmList.appendChild(li);
    }

    resultsContainer.style.display = 'block';
});
