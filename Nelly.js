async function givePoints(name, points) {
    await fetch('/api/points', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ name, points })
    });
    alert(`Du hast ${points} Punkte an ${name} vergeben!`);
}
