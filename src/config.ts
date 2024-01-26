interface Config {
    backend: BackendType;
}

export enum BackendType {
    SERVER,
    LOCAL_STORAGE
}

const config: Config  = {
    backend: BackendType.LOCAL_STORAGE,
};

export default config;