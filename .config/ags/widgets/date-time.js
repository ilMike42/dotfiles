//********** Date and Time **********
const time = Variable('', {
    poll: [1000, function() {
        const date = new Date();

        const optionsDate = { year: 'numeric', month: '2-digit', day: '2-digit' };
        const optionsTime = { hour: '2-digit', minute: '2-digit', hour12: false };

        // Formatta la data e l'ora
        const formattedDate = `${date.toLocaleDateString('it-IT', optionsDate)} ${date.toLocaleTimeString('it-IT', optionsTime)}`;

        return formattedDate
    }],
})

const DateTime = () => Widget.Label({
    class_name: 'date-label',
    hpack: 'center',
    label: time.bind(),
})

export default DateTime;
