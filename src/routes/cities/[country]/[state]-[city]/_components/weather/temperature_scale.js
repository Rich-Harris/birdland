import * as yootils from 'yootils';

const hue_scale = yootils.linearScale([-10, 45], [180, 360]);

export const get_color = (temperature, opacity = 1) => {
	const hue = hue_scale(temperature);
	return `hsla(${hue}deg, 100%, 75%, ${opacity})`;
}