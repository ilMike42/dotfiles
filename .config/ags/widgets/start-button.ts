//********** Start Button **********
const StartButton = () => Widget.Button({
    class_name: 'start-button',
    label: '󰣇',
    onPrimaryClick: () => Utils.exec('walker -m applications')
})

export default StartButton;
