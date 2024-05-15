import {
	v4 as uuidv4
} from 'uuid'

export class Layer {

	units = null
	display = true
	instance = null

	constructor() {
		this.id = uuidv4()
		this.display = true
	}

	static list(...list) {
		const layer = new Layer()
		layer.units = list;
		return layer;
	}

	clone() {
		const newUnits = this.units.map(unit => unit.clone())
		return Layer.list(...newUnits)
	}

	show() {
		this.display = true
	}

	hide() {
		this.display = false
	}

	remove(index) {
		this.units.splice(index, 1)
	}

	sort() {
		this.units.sort((a, b) => a.track.x - b.track.x)
		for (let j = 0; j < this.units.length - 1; j++) {
			const current = this.units[j];
			const next = this.units[j + 1];
			if (current.track.x + current.track.w > next.track.x)
				next.track.x = current.track.x + current.track.w
		}
	}

	get length() {
		return this.units.length
	}

	get simplify() {
		return {
			id: this.id,
			units: this.units.map(item => item.simplify),
			display: this.display,
			length: this.length
		}
	}

	get scenes() {
		return {
			id: this.id,
			units: this.units.map(item => item.scenes),
			display: this.display,
			length: this.length
		}
	}

}