//********** Battery **********
const battery = await Service.import('battery')

const getBatteryIcon = (percent, charging, charged) => {


    if (charged) {
        return '󰂅'
    }

    if (percent < 20) return charging ? '󰢜' : '󰁺';
    if (percent < 40) return charging ? '󰂆' : '󰁻';
    if (percent < 60) return charging ? '󰂈' : '󰁽';
    if (percent < 80) return charging ? '󰂉' : '󰁿';
    if (percent < 100) return charging ? '󰂊' : '󰂁';
    if (percent === 100) return '󰁹';


    return ''
}

const getBatteryString = (percent, charging, charged) => {
    return `${getBatteryIcon(percent, charging, charged)}  ${percent}%`
}


const Battery = () => Widget.Button({
    label: Utils.merge([battery.bind('percent'), battery.bind('charging'), battery.bind('charged')], getBatteryString)
})

export default Battery;
