let counter = 0;
let cacheSource = null;

const subscribeNewData = () => {
    console.log('Subscription Started');
    const eSource = cacheSource ?? new EventSource('http://localhost:3000/events');
    cacheSource = eSource;
    eSource.onopen = (event) => {
        console.log('NEW SOURCE CONNECTED');
    };

    eSource.onmessage = (event) => {
        console.log('NEW MESSAGE RECIEVED', event.data);
        const childElm = document.createElement('div');
        const parentElm = document.getElementById('messages_container');
        childElm.setAttribute('class', 'messageBox');
        parentElm.appendChild(childElm);
        childElm.innerText = JSON.parse(event.data).message;
    };

    eSource.onerror = (event) => {
        console.log('SOMETHING WENT WRONG');
    }
};

const closeDataSubscription = () => {
    if (cacheSource) {
        cacheSource.close();
        cacheSource = null;
        console.log('CONNECTION CLOSED');
    } else {
        console.log('NO OPEN CONNECTION');
    }
}

const fireDynamicMessage = () => {
    fetch(`http://localhost:3000/new-event?message=Message_${counter++}`);
};

const cancelSubscription = () => {
    closeDataSubscription();
};
