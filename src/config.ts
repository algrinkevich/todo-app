interface Config {
    backend: BackendType;
}

export enum BackendType {
    SERVER,
    LOCAL_STORAGE
}

const config: Config  = {
    backend: BackendType.SERVER,
};

export default config;