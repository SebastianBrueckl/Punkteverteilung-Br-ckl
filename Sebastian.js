async function fetchPoints() {
    const response = await fetch('/api/points');
    const data = await response.json();
    document.getElementById('sebastian-points').textContent = data.Sebastian;
}

fetchPoints();
