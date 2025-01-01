async function fetchPoints() {
    const response = await fetch('/api/points');
    const data = await response.json();
    document.getElementById('valentina-points').textContent = data.Valentina;
}

fetchPoints();
