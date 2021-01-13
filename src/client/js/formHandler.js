//vairables
const polarity = document.getElementById('polarity');
const confidence = document.getElementById('confidence');
const subjectivity = document.getElementById('subjectivity');

//HandleSubmit
export function handleSubmit(event) {
    event.preventDefault()

    let inputUrl = document.getElementById('input').value;
    //Client.checkForName(formText)
    
    //check for correct url
    if (Client.checkUrl(inputUrl) === false) {
        if (polarity.innerHTML || confidence.innerHTML || subjectivity.innerHTML != null) {
            polarity.innerHTML = '';
            confidence.innerHTML = '';
            subjectivity.innerHTML = '';
        }
        alert('Input was not an url');
        return;
    }
    console.log(':::Form Submited:::')
    //fetch function
    fetch('http://localhost:8080/evaluate', {
        method: 'POST',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({url:inputUrl})
    })

    .then(res => {
        return res.json()
    })
    //change the UI
    .then(data => {
        polarity.innerHTML = `${data.polarity}`;
        confidence.innerHTML = `${data.polarity_confidence}`;
        subjectivity.innerHTML = `${data.subjectivity}`;
        console.log('it worked');
        console.log(data)
    })
}