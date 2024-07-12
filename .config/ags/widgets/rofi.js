//********** Rofi **********
const Rofi = () => Widget.Button({
    class_name: 'rofi',
    label: '󰣇',
    onPrimaryClick: () => Utils.exec('rofi -show drun')
})

export default Rofi;
