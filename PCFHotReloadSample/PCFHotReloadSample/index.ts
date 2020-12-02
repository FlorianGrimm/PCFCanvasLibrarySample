import * as control from "./PCFHotReloadSample";

// development enable HotReload
/*  */
import { enableHotReloadForTypes } from 'pcfcanvaslibrary/dist/HotReload';
enableHotReloadForTypes(
	true,
	control.PCFHotReloadSample.name,
	control,
	exports
);
/* */

// Production
/*
Object.defineProperty(exports, "__esModule", { value: true });
for (const key in controls) {
    Object.defineProperty(exports, key, { enumerable: true, value: (controls as any)[key] });    
}
*/