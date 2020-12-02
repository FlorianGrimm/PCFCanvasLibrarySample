import { IInputs, IOutputs } from "./generated/ManifestTypes";

type HotReloadState = { foo: number };

export class PCFHotReloadSample implements ComponentFramework.StandardControl<IInputs, IOutputs> {
    static version = 1;
    container: HTMLDivElement;

    foo: number;

    constructor() {
        this.foo = 1;
    }

    /**
     * Used to initialize the control instance. Controls can kick off remote server calls and other initialization actions here.
     * Data-set values are not initialized here, use updateView.
     * @param context The entire property bag available to control via Context Object; It contains values as set up by the customizer mapped to property names defined in the manifest, as well as utility functions.
     * @param notifyOutputChanged A callback method to alert the framework that the control has new outputs ready to be retrieved asynchronously.
     * @param state A piece of data that persists in one session for a single user. Can be set at any point in a controls life cycle by calling 'setControlState' in the Mode interface.
     * @param container If a control is marked control-type='standard', it will receive an empty div element within which it can render its content.
     */
    public init(context: ComponentFramework.Context<IInputs>, notifyOutputChanged: () => void, state: ComponentFramework.Dictionary, container: HTMLDivElement) {
        this.container = container;
        this.updateUI("init");
    }


    /**
     * Called when any value in the property bag has changed. This includes field values, data-sets, global values such as container height and width, offline status, control metadata values such as label, visible, etc.
     * @param context The entire property bag available to control via Context Object; It contains values as set up by the customizer mapped to names defined in the manifest, as well as utility functions
     */
    public updateView(context: ComponentFramework.Context<IInputs>): void {
        this.updateUI("updateView");
    }

    /** 
     * It is called by the framework prior to a control receiving new data. 
     * @returns an object based on nomenclature defined in manifest, expecting object[s] for property marked as “bound” or “output”
     */
    public getOutputs(): IOutputs {
        return {};
    }

    /** 
     * Called when the control is to be removed from the DOM tree. Controls should use this call for cleanup.
     * i.e. cancelling any pending remote calls, removing listeners, etc.
     */
    public destroy(): void {
    }

    /**
     * Called before the control will be destroyed and hotReload-ed.
     */
    getHotReloadState(): HotReloadState {
        return { foo: this.foo };
    }

    /**
     * Used to initialize the control instance. Controls can kick off remote server calls and other initialization actions here.
     * Data-set values are not initialized here, use updateView.
     * @param context The entire property bag available to control via Context Object; It contains values as set up by the customizer mapped to property names defined in the manifest, as well as utility functions.
     * @param notifyOutputChanged A callback method to alert the framework that the control has new outputs ready to be retrieved asynchronously.
     * @param state A piece of data that persists in one session for a single user. Can be set at any point in a controls life cycle by calling 'setControlState' in the Mode interface.
     * @param container If a control is marked control-type='standard', it will receive an empty div element within which it can render its content.
     * @param hotReloadState the state from getHotReloadState
     */
    hotReload(context: ComponentFramework.Context<IInputs>, notifyOutputChanged?: () => void, state?: ComponentFramework.Dictionary, container?: HTMLDivElement, hotReloadState?: HotReloadState): void {
        this.container = container!;
        if (hotReloadState) {
            this.foo = hotReloadState.foo;
        }
        this.updateUI("hotReload");
    }

    updateUI(msg: string) {
        this.foo++;
        this.container.innerText = `Foo:${this.foo}; Msg:${msg}; Version:${PCFHotReloadSample.version};`;
    }
}