//********** Power Profiles **********
const powerProfiles = await Service.import('powerprofiles');

const getProfileIcon = (profile) => {
    switch (profile) {
        case 'power-saver':
            return '󰡳'
        case 'balanced':
            return '󰡵'
        case 'performance':
            return '󰡴'
    }

    return ''
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

const PowerProfiles = () => Widget.Button({
    class_name: 'power-profiles',
    label: powerProfiles.bind('active_profile').as(p => getProfileIcon(p)),
    onPrimaryClick: (_, event) => {
        setNextPowerProfile();
    },
    setup: self => self.hook(powerProfiles, () => {
        self.toggleClassName('power-saver', powerProfiles.active_profile === 'power-saver')
        self.toggleClassName('performance', powerProfiles.active_profile === 'performance')
    })
})

export default PowerProfiles;
