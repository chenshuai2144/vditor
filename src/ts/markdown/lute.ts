import {CDN_PATH} from "../constants";
import {addScript} from "../util/addScript";

declare const Go: new() => {
    importObject: WebAssembly.WebAssemblyInstantiatedSource
    run(instance: WebAssembly.Instance): void,
};

declare const WebAssembly: {
    instantiateStreaming(
        source: Response | Promise<Response>,
        importObject?: WebAssembly.WebAssemblyInstantiatedSource,
    ): Promise<WebAssembly.WebAssemblyInstantiatedSource>;
    instantiate(bytes: BufferSource, importObject?: any): Promise<WebAssembly.WebAssemblyInstantiatedSource>;
};

export const initLute = async () => {
    if (document.getElementById("vditorLuteJS")) {
        return;
    }

    if (!WebAssembly.instantiateStreaming) { // polyfill
        WebAssembly.instantiateStreaming = async (resp, importObject) => {
            const bytes = await (await resp).arrayBuffer();
            return await WebAssembly.instantiate(bytes, importObject);
        };
    }

    await addScript(`${CDN_PATH}/vditor/dist/js/lute/wasm_exec.js`, "vditorLuteJS");
    const go = new Go();
    const result = await WebAssembly.instantiateStreaming(await fetch(`${CDN_PATH}/vditor/dist/js/lute/lute.wasm`),
        go.importObject);
    go.run(result.instance);
};
