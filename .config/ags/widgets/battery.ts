//********** Battery **********
const battery = await Service.import('battery')
const powerProfiles = await Service.import('powerprofiles');

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


const setPowerProfile = (powerProfile) => {
    Utils.exec(`powerprofilesctl set ${powerProfile}`)
}

const setNextPowerProfile = () => {
    const profiles = powerProfiles.profiles
    const activeProfile = powerProfiles.active_profile

    const activeProfileIndex = profiles.findIndex(profile => profile.Profile === activeProfile)

    const nextProfileIndex = (activeProfileIndex + 1) % profiles.length

    setPowerProfile(profiles[nextProfileIndex].Profile)
}


const Battery = () => Widget.Button({
    class_name: 'battery',
    label: Utils.merge([battery.bind('percent'), battery.bind('charging'), battery.bind('charged')], getBatteryString),
    onPrimaryClick: (_, event) => {
        setNextPowerProfile();
    },
    setup: self => self.hook(powerProfiles, () => {
        self.toggleClassName('power-saver', powerProfiles.active_profile === 'power-saver')
        self.toggleClassName('performance', powerProfiles.active_profile === 'performance')
    })
})

export default Battery;
