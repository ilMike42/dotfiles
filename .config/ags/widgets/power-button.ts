//********** Power Button **********
const Power = () => Widget.Button({
    label: '⏻',
    class_name: 'power-button',
    onPrimaryClick: () => Utils.exec('rofi -show p -modi p:\'rofi-power-menu\'')
})

export default Power;
