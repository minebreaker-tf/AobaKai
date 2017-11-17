// Static configuration.
// Change values as your environment.

interface Config {
    base: string
}

const config: Config = {
    base: '/${BASE_URL}' // Base url, which is replaced by Gulp.
};

export default config;
