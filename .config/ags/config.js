const entry = App.configDir + '/main.ts'
const outdir = '/tmp/ags/js'

Utils.monitorFile(
    // directory that contains the scss files
    `${App.configDir}/styles`,

    // reload function
    function() {
        // main scss file
        const scss = `${App.configDir}/styles/style.scss`

        // target css file
        const css = `${App.configDir}/style.css`

        // compile, reset, apply
        Utils.exec(`sassc ${scss} ${css}`)
        App.resetCss()
        App.applyCss(css)
    },
)


try {
    await Utils.execAsync([
        'bun', 'build', entry,
        '--outdir', outdir,
        '--external', 'resource://*',
        '--external', 'gi://*',
    ])
    await import(`file://${outdir}/main.js`)
} catch (error) {
    console.error(error)
}
