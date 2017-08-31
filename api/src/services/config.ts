import {IConfig} from '../config.interface';
import * as fs from 'fs';

export class Config {
	private _current: IConfig;
	private static _instance: Config;

	static get instance(): Config {
		if (!Config._instance) {
			Config._instance = new Config();
		}
		return Config._instance;
	}

	static get current(): IConfig {
		return this.instance._current;
	}

	load(): boolean {
		try {
			let configJSON = JSON.parse(fs.readFileSync('./config.json', 'utf8'));
			this._current = configJSON;
			return true;
		} catch (error) {
			console.error(error);
			return false;
		}
	}
}