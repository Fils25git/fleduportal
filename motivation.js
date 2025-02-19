// Motivation message function
function showMotivationalMessage(correct) {
    const resultDiv = document.getElementById('result');
    if (correct) {
        resultDiv.innerHTML = 'You nailed it! Keep up the great work!';
    } else {
        resultDiv.innerHTML = 'Oops! Try again, you will get it!';
    }
}
